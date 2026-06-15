@echo off
chcp 65001 >nul
echo.
echo Запускаю сборку АРМ «Оценщик»...
echo Пожалуйста, подожди 2-4 минуты...
echo.

python build_script.py

pause