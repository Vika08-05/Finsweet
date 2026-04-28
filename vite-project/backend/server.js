import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-provider-ini";

const app = express();
app.use(cors());
app.use(express.json());

// Load env vars from this folder's .env even if the server
// is started from a different working directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn(`[backend] No .env found at ${envPath}. DynamoDB calls will fail until you create it.`);
}

const REGION = process.env.AWS_REGION || "us-east-1";
const PROFILE = process.env.AWS_PROFILE;
const credentials = PROFILE ? fromIni({ profile: PROFILE }) : undefined;

const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials,
});
const dynamoDB = DynamoDBDocumentClient.from(ddbClient);

const TABLE = process.env.DDB_TABLE_NAME || 'Finsweet';
console.log(
  `Server starting — region=${REGION}, table=${TABLE}, ` +
    `AWS_ACCESS_KEY_ID set=${!!process.env.AWS_ACCESS_KEY_ID}, ` +
    `AWS_PROFILE=${PROFILE || "(not set)"}`
);

app.get("/api/data", async (req, res) => {
  try {
    const data = await dynamoDB.send(new ScanCommand({
      TableName: TABLE,
    }));

    const items = (data.Items || []).map(item => ({
      www: item.www,
      label: item.label || item.www,
      category: item.category || item.label || "",
      categorySlug: String(item.category || item.label || "").trim().toLowerCase(),
      description: item.description || "",
      raw: item,
    }));

    res.json(items);
  } catch (err) {
    console.error("DynamoDB scan error:", err);

    const detail = err?.message || String(err);
    const isMissingCreds = /Could not load credentials from any providers/i.test(detail);
    // In dev return the underlying error message to help debug (don't do this in prod)
    res.status(500).json({
      error: "Failed to fetch data",
      detail,
      ...(isMissingCreds
        ? {
            hint:
              "Missing AWS credentials. Either: (A) create backend/.env (copy from backend/.env.example) and set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, DDB_TABLE_NAME (and AWS_SESSION_TOKEN if needed), then restart; OR (B) configure an AWS CLI profile in ~/.aws/credentials and set AWS_PROFILE in backend/.env, then restart.",
          }
        : {}),
    });
  }
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:4000");
});