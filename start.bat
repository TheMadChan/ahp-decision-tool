@echo off
echo ===================================
echo AHP Decision Tool - Run Script
echo ===================================

REM Store the root directory of the project
set ROOT_DIR=%~dp0

REM Check if setup has been completed
if not exist "%ROOT_DIR%\setup_complete.flag" (
    echo Setup has not been completed yet.
    echo Please run setup.bat first.
    pause
    exit /b 1
)

REM Start services
echo Starting backend server...
cd /d "%ROOT_DIR%backend"
start "AHP Backend" cmd /k "python -m uvicorn main:app --reload"

echo Waiting for backend to initialize...
timeout /t 3 > nul

echo Starting frontend server...
cd /d "%ROOT_DIR%frontend"
start "AHP Frontend" cmd /k "npm start"

echo.
echo AHP Decision Tool started successfully!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.

cd /d "%ROOT_DIR%"