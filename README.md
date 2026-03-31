# Poll App Fullstack (Polls Backend + Polls Frontend)

This repo contains a simple **Poll/Voting app** fullstack setup.  
Backend: Node.js + Express + MongoDB  
Frontend: React (Vite) + Axios + TailwindCSS

---

## Project Structure

- `polls-backend/backend` = API server (Express + MongoDB)
- `polls-Frontend/frontend` = React UI (Vite)

---

## Features

- Create polls (question + options)
- Vote once per poll
- View active/expired polls
- Set poll expiry time (minutes)

---

## Backend Setup (polls-backend)

**Folder:** `polls-backend/backend`

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (in the same folder):
```
MONGO_URL=your_mongodb_connection_string
```

3. Run the server:
```bash
npm run dev
```

**Server Port:** `http://localhost:8000`

### API Routes

- `POST /poll/createpoll`  
  Body: `{ question, options: [..], expiresAt }`

- `GET /poll/getpolls`  
  Fetch all polls

- `POST /poll/votepoll/:id`  
  Body: `{ optionIndex }`

- `POST /poll/getActivepolls`  
  Active (non-expired) polls

- `POST /poll/getExpiredPolls`  
  Expired polls

---

## Frontend Setup (polls-Frontend)

**Folder:** `polls-Frontend/frontend`

1. Install dependencies:
```bash
npm install
```

2. Run the dev server:
```bash
npm run dev
```

**Frontend URL:** `http://localhost:5173`

### Frontend Notes

- Axios base URL: `http://localhost:8000`
- Vote state is stored in `localStorage` (`votedPolls`)
- Poll expiry time is set in minutes

---

## How to Run (Quick Start)

1. Start backend:
   - `polls-backend/backend`
   - `npm install`
   - Add `MONGO_URL` in `.env`
   - `npm run dev`

2. Start frontend:
   - `polls-Frontend/frontend`
   - `npm install`
   - `npm run dev`

3. Open in browser:
   - `http://localhost:5173`

---

## Tech Stack

- **Backend:** Node.js, Express, Mongoose, MongoDB, CORS
- **Frontend:** React, Vite, Axios, TailwindCSS

---

## Author

Project by rohit thakur
