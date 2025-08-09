# Blustock IPO Backend API

## Tech Stack

- Node.js + Express.js
- PostgreSQL (Knex.js ORM)
- JWT Authentication
- Multer for file uploads

## Features

- Admin authentication & role-based access
- CRUD for Companies & IPOs
- Document upload/download (PDF)
- Admin stats & logs
- Error handling middleware

## Setup

1. Copy `.env.example` to `.env` and fill in your values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm run dev
   ```

## Folder Structure

- `/controllers` — Route logic
- `/routes` — Express route definitions
- `/models` — Database models (Knex.js)
- `/middleware` — Auth, error handling, etc.
- `/uploads` — PDF storage
- `server.js` — Entry point

## API Endpoints

See Postman collection for all routes.

## Testing

- Use Postman collection for manual API testing.

---
