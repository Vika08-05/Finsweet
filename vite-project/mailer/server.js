import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import process from "process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always load env from this folder, no matter where `node` was started from.
const envPath = path.join(__dirname, ".env");
const dotenvResult = dotenv.config({ path: envPath });

const app = express();
app.use(cors());
app.use(express.json());

const HOST = process.env.MAILER_HOST || "0.0.0.0";
const PORT = Number(process.env.MAILER_PORT || 5001);

if (dotenvResult.error) {
  console.warn(`Mailer env not loaded (missing or invalid): ${envPath}`);
  console.warn(dotenvResult.error);
} else {
  console.log(`Mailer env loaded from ${envPath}`);
}

console.log(`MAIL_TO set=${!!process.env.MAIL_TO}`);

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

function createTransporter() {
  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const auth = user && pass ? { user, pass } : undefined;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
  });
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, subject, message, text } = req.body || {};

    if (!subject) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: subject",
      });
    }

    if (!message && !text) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: message",
      });
    }

    const to = process.env.MAIL_TO;
    if (!to) {
      return res.status(500).json({
        success: false,
        error: "MAIL_TO is not set (recipient inbox)",
      });
    }

    const transporter = createTransporter();

    const from = process.env.MAIL_FROM || process.env.SMTP_USER;
    if (!from) {
      return res.status(500).json({
        success: false,
        error: "MAIL_FROM is not set and SMTP_USER is missing (cannot determine sender)",
      });
    }

    const bodyText =
      text ||
      `New contact request\n\nName: ${name || "-"}\nEmail: ${email || "-"}\n\nMessage:\n${message || "-"}`;

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: bodyText,
      replyTo: email || undefined,
    });

    return res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("send-email error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to send email",
      detail: err?.message || String(err),
    });
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Mailer server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err?.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or change MAILER_PORT in mailer/.env.`);
  } else {
    console.error("Mailer server error:", err);
  }
  process.exit(1);
});
