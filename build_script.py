import subprocess
import sys
import os

print("=== Сборка АРМ Оценщик ===")

print("1. Собираю фронтенд...")
os.chdir("frontend")
subprocess.run(["npm", "run", "build"], check=True, shell=True)
os.chdir("..")
print("Фронтенд готов")

print("2. Собираю .exe файл...")
subprocess.run([sys.executable, "-m", "PyInstaller", 
                "--noconfirm", "--onefile",
                "--name", "ARM_Ocenschik",
                "--add-data", "frontend/dist;frontend/dist",
                "--add-data", "backend;backend",
                "--hidden-import", "uvicorn",
                "--hidden-import", "fastapi",
                "--hidden-import", "starlette",
                "--collect-submodules", "uvicorn",
                "desktop_app.py"], check=True)

print("\nГОТОВО!")
print("Файл находится тут: dist\\ARM_Ocenschik.exe")
print("Можешь копировать его на флешку.")