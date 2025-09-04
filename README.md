# HikConnect Dashboard - Puppeteer + Cron + Socket.IO (POC)
This project is a proof-of-concept Node.js dashboard that scrapes HiConnect Web Portal using Puppeteer, updates device status via a cron job, and broadcasts realtime updates to clients using Socket.IO.

## Important notes
- This POC uses a headless browser to login & scrape data from HiConnect Web. This is fragile and may break if Hikvision changes their site.
- For production / stable integration, prefer official Hikvision developer APIs.
- You must provide valid HiConnect credentials via environment variables: HICONNECT_USER and HICONNECT_PASS.

## Quick start
1. Extract ZIP and `cd` into project folder.
2. Copy `.env.example` to `.env` and edit DB and HiConnect credentials.
3. Install dependencies: `npm install`
4. Import `devices.sql` into MySQL (`hikconnect_db`).
5. Run: `npm run dev`
6. Open: http://localhost:3000

## .env variables
- DB_HOST, DB_USER, DB_PASS, DB_NAME
- HICONNECT_USER, HICONNECT_PASS
- PORT (optional)
