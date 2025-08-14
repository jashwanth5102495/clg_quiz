@echo off
echo 🚀 Starting Quiz Application...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
)

REM Check if backend node_modules exists
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    npm install
    cd ..
)

REM Check if backend .env exists
if not exist "backend\.env" (
    echo ⚠️  Creating backend .env file...
    cd backend
    copy .env.example .env
    cd ..
    echo ✅ Created .env file. Please update it with your MongoDB URI if needed.
)

REM Seed database
echo 🌱 Seeding database...
cd backend
npm run seed 2>nul
cd ..

echo.
echo 🎉 Setup complete! Starting development servers...
echo.
echo 📱 Frontend will be available at: http://localhost:5173
echo 🔧 Backend will be available at: http://localhost:5000
echo 🔐 Admin panel: http://localhost:5173/admin/login
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers
npm run dev