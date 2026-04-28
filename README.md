# Finsweet — Frontend + Backend

This project contains:

- **Frontend**: React + Vite (source code in `./frontend/src/`)
- **Backend**: Node.js + Express API (in `./backend/server.js`), fetching data from **AWS DynamoDB**

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm

## Install

From the `vite-project/` folder:

```bash
npm install
```

## Backend (API)

The backend runs an Express server on **http://localhost:4000**.

### 1) Configure environment variables

An example file is available at `backend/.env.example`.

Create a `.env` file in `backend/`:

```bash
cd backend
cp .env.example .env
```

Fill in your AWS credentials and DynamoDB table name in `backend/.env`.

Required variables:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DDB_TABLE_NAME`

Optional:

- `AWS_SESSION_TOKEN`

### 2) Run the backend

```bash
cd backend
node server.js
```

API endpoint:

- `GET http://localhost:4000/api/data`

## Frontend (Vite)

The frontend dev server runs on **http://localhost:5173**.

In a separate terminal (from `vite-project/`):

```bash
npm run dev
```

Then open:

- http://localhost:5173

## Notes

- Some pages fetch data from `http://localhost:4000/api/data`, so the backend must be running.
- `vite.config.js` also includes a `/api` proxy to `http://localhost:4000`. If you change frontend requests to `/api/...`, the proxy will be used automatically in dev.
- The Contact form posts to `/api/send-email` (proxied by Vite to the mailer server). To enable it, run the **Mailer server** below.

## Mailer server (Contact form)

The mailer server runs on **http://localhost:5001** (default) and exposes:

- `POST http://localhost:5001/api/send-email`

### 1) Configure SMTP env vars

An example file is available at `mailer/.env.example`.

```bash
cd mailer
cp .env.example .env
```

Set your SMTP provider credentials in `mailer/.env`.

To receive contact requests, you MUST set `MAIL_TO` (this is the inbox where requests will arrive).

Required mailer variables:

- `MAIL_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Example `mailer/.env` (Gmail SMTP):

```env
MAILER_PORT=5001

MAIL_TO=gvika739@gmail.com
# MAIL_FROM defaults to SMTP_USER
# MAIL_FROM=gvika739@gmail.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=gvika739@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
```

Note: For Gmail you typically need 2FA enabled and an App Password for `SMTP_PASS`.

### 2) Run the mailer server

```bash
cd mailer
node server.js
```

If you change `mailer/.env`, restart the mailer server so it reloads env vars.

## Build (optional)

```bash
npm run build
npm run preview
```
