@echo off
chcp 65001 > nul
title АРМ-Оценщик — Запуск

echo ============================================
echo   АРМ-Оценщик — Запуск серверов
echo ============================================
echo.

echo [1/2] Запускаю бэкенд (FastAPI) на порту 8000...
start "АРМ-Оценщик БЭКЕНД" cmd /k "cd /d %~dp0 && python backend/main.py"

timeout /t 2 /nobreak > nul

echo [2/2] Запускаю фронтенд (Vite) на порту 5173...
start "АРМ-Оценщик ФРОНТЕНД" cmd /k "cd /d %~dp0\frontend && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo ============================================
echo   Готово! Открываю браузер...
echo ============================================
start http://localhost:5173

exit
