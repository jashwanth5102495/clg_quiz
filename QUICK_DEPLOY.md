# Quick Deployment Guide for Quiz Application

## 🚀 Your project is now on GitHub!
Repository: https://github.com/jashwanth5102495/clg_quiz

## Deployment Options

### Option 1: Railway (Recommended for Backend)
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub account
3. Deploy the `backend` folder
4. Set environment variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
   NODE_ENV=production
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   JWT_SECRET=your-super-secure-jwt-secret
   ```
5. Your backend will be available at: `https://your-app.railway.app`

### Option 2: Vercel (Recommended for Frontend)
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
5. Deploy!

### Option 3: Render (Full-Stack)
1. Go to [Render.com](https://render.com)
2. Create a Web Service for backend
3. Create a Static Site for frontend
4. Set up MongoDB Atlas for database

### Option 4: Docker Deployment
```bash
# Clone the repository
git clone https://github.com/jashwanth5102495/clg_quiz.git
cd clg_quiz

# Run with Docker Compose
docker-compose up -d
```

## Database Setup (MongoDB Atlas)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get connection string
4. Update `MONGO_URI` in your deployment environment
5. Run the seed script to populate questions

## Environment Variables Needed

### Backend
- `MONGO_URI`: Your MongoDB connection string
- `NODE_ENV`: production
- `ADMIN_USERNAME`: Admin login username
- `ADMIN_PASSWORD`: Admin login password
- `JWT_SECRET`: Secure JWT secret key

### Frontend
- `VITE_API_URL`: Your backend API URL

## Post-Deployment Steps
1. Seed the database with questions
2. Test the admin login
3. Test quiz submission
4. Verify all features work

## Features Included
✅ Student quiz interface with 30-minute timer
✅ Admin dashboard with results management
✅ Multiple quiz topics (MBA, MCA, Anti-Ragging)
✅ Responsive design with dark/light mode
✅ Secure authentication
✅ Production-ready build
✅ Docker support
✅ Comprehensive error handling

## Support
If you need help with deployment, check the DEPLOYMENT.md file for detailed instructions.