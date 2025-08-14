@echo off
echo Starting Quiz Application Servers...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && node server.js"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev:frontend"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173 (or next available port)
echo.
echo Quiz Configuration:
echo - 30 questions per quiz (from 100 available per topic)
echo - 30 minutes time limit
echo - Maximum anti-cheating through randomization
echo - Topics: MBA, MCA, Anti-Ragging
echo.
echo Press any key to exit...
pause > nul