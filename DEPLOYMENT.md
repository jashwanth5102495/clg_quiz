# Quiz Application Deployment Guide

## Overview
This is a full-stack quiz application with React frontend and Node.js/Express backend.

## Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB

## Environment Setup

### Development
1. Install dependencies: `npm run setup`
2. Start MongoDB locally
3. Seed database: `npm run seed`
4. Start development servers: `npm run dev`

### Production Deployment

#### Frontend (Static Hosting - Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your static hosting service
3. Set environment variable: `VITE_API_URL=https://your-backend-domain.com/api`

#### Backend (Node.js Hosting - Railway/Render/Heroku)
1. Deploy the `backend` folder to your Node.js hosting service
2. Set environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `NODE_ENV=production`
   - `PORT`: Will be set by hosting service
   - `ADMIN_USERNAME`: Admin login username
   - `ADMIN_PASSWORD`: Admin login password
   - `JWT_SECRET`: Secure JWT secret key

#### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get the connection string
3. Update `MONGO_URI` in production environment

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-domain.com/api
```

### Backend (.env.production)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-super-secure-jwt-secret
PORT=5000
NODE_ENV=production
```

## Deployment Steps

1. **Build the project**: `npm run deploy:build`
2. **Deploy backend** to your Node.js hosting service
3. **Deploy frontend** to your static hosting service
4. **Set up MongoDB Atlas** and update connection string
5. **Seed the database** by running the seed script on your backend server

## Features
- Student quiz taking with timer
- Admin dashboard with results management
- Multiple quiz topics (MBA, MCA, Anti-Ragging)
- Responsive design with dark/light mode
- Secure admin authentication
- Real-time quiz submission and scoring

## API Endpoints
- `GET /api/questions?topic={topic}` - Get quiz questions
- `POST /api/submit` - Submit quiz answers
- `GET /api/results/student/{rollNumber}` - Get student results
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/results` - Admin results management

## Security Features
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- JWT authentication for admin routes