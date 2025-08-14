# 🎓 Quiz Application

A beautiful, modern quiz application with glass morphism UI, comprehensive admin panel, and robust backend.

## ✨ Features

- 🎨 **Beautiful Glass Morphism UI** with white glow effects
- 🔐 **Secure Admin Panel** with detailed analytics
- 📊 **Smart Question Distribution** (MBA/MCA/Anti-Ragging topics)
- ⏱️ **Timer & Progress Tracking**
- 📈 **Comprehensive Result Analysis**
- 💾 **MongoDB Database** with complete data storage
- 🔒 **JWT Authentication** for admin access
- 📤 **CSV Export** functionality

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### One-Command Setup

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
./start.sh
```

**Or using Node.js:**
```bash
node start.js
```

### Alternative Start
```bash
npm run dev
```

## 🌐 Access Points

- **Quiz Application**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login
- **Backend API**: http://localhost:5000

### Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 📱 Application Flow

1. **Students**: Register → Take Quiz → View Results
2. **Admins**: Login → View Dashboard → Analyze Results → Export Data

## 🎯 Question Distribution

### Available Topics (30 Questions per Quiz)
Each topic has 100 questions total, with 30 randomly selected per quiz for maximum anti-cheating:

**MCA (Computer Applications)**
- 100 questions available: 25 Easy, 25 Slightly Difficult, 25 Moderate, 25 Difficult
- Quiz gets: 7 Easy, 8 Slightly Difficult, 7 Moderate, 8 Difficult (30 total)
- Topics: Programming, Data Structures, Algorithms, Database Systems, Operating Systems, Networking, Security

**MBA (Business Administration)**  
- 100 questions available: 25 Easy, 25 Slightly Difficult, 25 Moderate, 25 Difficult
- Quiz gets: 7 Easy, 8 Slightly Difficult, 7 Moderate, 8 Difficult (30 total)
- Topics: Strategic Management, Finance, Marketing, HR, Operations, Leadership, Economics, Business Ethics

**Anti-Ragging Awareness**
- 100 questions available: 25 Easy, 25 Slightly Difficult, 25 Moderate, 25 Difficult
- Quiz gets: 7 Easy, 8 Slightly Difficult, 7 Moderate, 8 Difficult (30 total)
- Topics: Legal Framework, Prevention, Reporting, Student Rights, Psychological Impact, Support Systems

**Total Quiz Time:** 30 minutes (1 minute per question)
**Anti-Cheating:** Each student gets different random questions from the 100 available

## 🔧 Tech Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS
- React Router
- Lucide Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Rate Limiting

## 📊 Admin Features

- **Dashboard**: Real-time statistics and analytics
- **Result Management**: View, search, filter, and delete results
- **Detailed Analysis**: Question-by-question answer comparison
- **Export**: CSV download of all results
- **User Management**: Secure authentication system

## 🛠️ Development

```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend

# Both together
npm run dev
```

## 📝 Environment Setup

The application will automatically create a `.env` file in the backend directory. Update it with your MongoDB URI:

```env
MONGO_URI=mongodb://localhost:27017/quiz-app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-here
```

## 🎉 Success!

Your quiz application is now running with:
- ✅ Beautiful glass morphism UI
- ✅ Complete admin panel
- ✅ Secure backend API
- ✅ Database integration
- ✅ Result tracking & analysis

Happy quizzing! 🚀