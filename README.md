# Traveloop 🌍

Traveloop is a modern full-stack travel planning platform built for organizing trips, itineraries, budgets, activities, packing checklists, and community-shared journeys.

It provides a clean and scalable architecture using React, Node.js, Express, Prisma, and PostgreSQL.

---

# ✨ Features

## 🔐 Authentication & User Management

- User signup/login
- JWT authentication
- Protected routes
- Profile editing
- Profile image upload using Cloudinary
- Role-based admin support

---

## ✈️ Trip Management

- Create trips
- Edit trip details
- Public/private trip visibility
- Trip cover images
- Trip details page
- Recent trips dashboard

---

## 🗺️ Itinerary Builder

- Add stops/cities
- Day-wise itinerary organization
- Add activities to stops
- Timeline-style trip planning
- Country & city management

---

## 💰 Budget & Expense Tracking

- Trip expense management
- Category-wise expense breakdown
- Remaining budget calculation
- Over-budget alerts
- Real-time dashboard analytics

---

## 📝 Notes System

- Trip-specific notes
- Save reminders & travel details
- Persistent backend storage

---

## 🎒 Packing Checklist

- Add checklist items
- Mark items completed
- Delete checklist items
- Trip-specific checklist management

---

## 🌎 Community Features

- Public trip sharing
- Community feed
- Copy public itineraries
- Like public trips

---

## 📊 Admin Dashboard

- Platform analytics
- User activity overview
- Trip statistics
- Expense insights

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- Zustand
- Lucide React
- Recharts

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Cloudinary
- Multer
- Zod Validation

---

# 📂 Project Structure

```bash
traveloop/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layout/
│   │   ├── lib/
│   │   ├── store/
│   │   └── routes/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── utils/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/traveloop"

JWT_SECRET="your_jwt_secret"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <repository_url>
cd traveloop
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Prisma Migration

```bash
npx prisma migrate dev
npx prisma generate
```

### Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📡 API Routes

## Authentication

```bash
POST   /api/auth/signup
POST   /api/auth/login
```

---

## Trips

```bash
GET    /api/trips
POST   /api/trips
GET    /api/trips/:tripId
PATCH  /api/trips/:tripId
DELETE /api/trips/:tripId
```

---

## Stops & Activities

```bash
GET    /api/stops/:tripId
POST   /api/stops/:tripId

POST   /api/activities/:stopId
```

---

## Notes

```bash
GET    /api/notes/:tripId
POST   /api/notes/:tripId
```

---

## Checklist

```bash
GET     /api/checklist/:tripId
POST    /api/checklist/:tripId
PATCH   /api/checklist/:itemId
DELETE  /api/checklist/:itemId
```

---

## Expenses & Analytics

```bash
GET    /api/expenses/:tripId
POST   /api/expenses/:tripId

GET    /api/analytics/trip/:tripId
GET    /api/analytics/dashboard
```

---

## Community

```bash
GET    /api/community
GET    /api/community/trip/:tripId
POST   /api/community/copy/:tripId
POST   /api/community/like/:tripId
PATCH  /api/community/visibility/:tripId
```

---

# 🧠 Architecture Highlights

- RESTful API design
- Modular controller architecture
- Prisma relational schema
- Protected middleware-based authentication
- Trip-centric data flow
- Shared reusable UI components
- Responsive modern UI
- Scalable backend structure

---

# 🔮 Future Improvements

- AI itinerary generation
- Real-time notifications
- Drag & drop itinerary builder
- Maps integration
- Trip collaboration
- Offline/PWA support
- Email notifications
- Booking integrations
- Advanced analytics

---
