# Poll App Fullstack (Dupleit Backend + Polls Frontend)

Ye repo ek simple **Poll/Voting app** ka fullstack setup hai.  
Backend: Node.js + Express + MongoDB  
Frontend: React (Vite) + Axios + TailwindCSS

---

## Project Structure

- `Dupleit backend/backend` = API server (Express + MongoDB)
- `polls-Frontend/frontend` = React UI (Vite)

---

## Features

- Poll create karna (question + options)
- Vote karna (per poll ek baar)
- Active/Expired polls ka view
- Poll expiry time set karna (minutes)

---

## Backend Setup (Dupleit backend)

**Folder:** `Dupleit backend/backend`

1. Install dependencies:
```bash
npm install
```

2. `.env` file banao (same folder me):
```
MONGO_URL=your_mongodb_connection_string
```

3. Server run karo:
```bash
npm run dev
```

**Server Port:** `http://localhost:8000`

### API Routes

- `POST /poll/createpoll`  
  Body: `{ question, options: [..], expiresAt }`

- `GET /poll/getpolls`  
  All polls fetch karta hai

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

2. Run dev server:
```bash
npm run dev
```

**Frontend URL:** `http://localhost:5173`

### Frontend Notes

- Axios base URL: `http://localhost:8000`
- Vote state `localStorage` me store hota hai (`votedPolls`)
- Poll expiry time minutes me set hota hai

---

## How to Run (Quick Start)

1. Backend start karo:
   - `Dupleit backend/backend`
   - `npm install`
   - `.env` me `MONGO_URL` add karo
   - `npm run dev`

2. Frontend start karo:
   - `polls-Frontend/frontend`
   - `npm install`
   - `npm run dev`

3. Browser me open:
   - `http://localhost:5173`

---

## Tech Stack

- **Backend:** Node.js, Express, Mongoose, MongoDB, CORS
- **Frontend:** React, Vite, Axios, TailwindCSS

---

## Author

Project by rohit thakur
