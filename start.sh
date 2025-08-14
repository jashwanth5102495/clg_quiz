#!/bin/bash

echo "🚀 Starting Quiz Application..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if backend node_modules exists
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Creating backend .env file..."
    cd backend
    cp .env.example .env
    cd ..
    echo "✅ Created .env file. Please update it with your MongoDB URI if needed."
fi

# Seed database
echo "🌱 Seeding database..."
cd backend
npm run seed 2>/dev/null || echo "ℹ️  Database might already be seeded or MongoDB not running."
cd ..

echo ""
echo "🎉 Setup complete! Starting development servers..."
echo ""
echo "📱 Frontend will be available at: http://localhost:5173"
echo "🔧 Backend will be available at: http://localhost:5000"
echo "🔐 Admin panel: http://localhost:5173/admin/login"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
npm run dev