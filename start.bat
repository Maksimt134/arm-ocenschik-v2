@echo off
echo Starting ARM-Ocenschik servers...

REM Start backend
start "Backend :8000" cmd /k "python backend\main.py"

REM Wait a bit
timeout /t 2 /nobreak > nul

REM Start frontend on explicit IPv4 host
start "Frontend :5173" cmd /k "cd frontend && npm run dev -- --host 127.0.0.1"

REM Wait for servers to start
timeout /t 4 /nobreak > nul

REM Open browser with explicit IPv4
start http://127.0.0.1:5173

echo Done! Browser opened at http://127.0.0.1:5173
