import express from "express";
import cors from "cors";
import 'dotenv/config';

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const app = express();
app.use(cors());
app.use(express.json());

const REGION = process.env.AWS_REGION || "us-east-1";
const ddbClient = new DynamoDBClient({ region: REGION });
const dynamoDB = DynamoDBDocumentClient.from(ddbClient);

const TABLE = process.env.DDB_TABLE_NAME || 'Finsweet';
console.log(`Server starting — region=${REGION}, table=${TABLE}, AWS_ACCESS_KEY_ID set=${!!process.env.AWS_ACCESS_KEY_ID}`);

app.get("/api/data", async (req, res) => {
  try {
    const data = await dynamoDB.send(new ScanCommand({
      TableName: TABLE,
    }));

    const items = (data.Items || []).map(item => ({
      www: item.www,
      label: item.label || item.www,
      description: item.description || "",
      raw: item,
    }));

    res.json(items);
  } catch (err) {
    console.error("DynamoDB scan error:", err);
    // In dev return the underlying error message to help debug (don't do this in prod)
    res.status(500).json({ error: "Failed to fetch data", detail: err.message || String(err) });
  }
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:4000");
});