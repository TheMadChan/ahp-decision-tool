@echo off
echo ===================================
echo AHP Decision Tool - Setup Script
echo ===================================

REM Store the root directory of the project
set ROOT_DIR=%~dp0

REM First-time setup
if not exist "%ROOT_DIR%\setup_complete.flag" (
    echo First-time setup: Installing dependencies...
    
    echo Installing backend dependencies...
    cd /d "%ROOT_DIR%backend"
    pip install -r requirements.txt
    
    echo Installing frontend dependencies...
    cd /d "%ROOT_DIR%frontend"
    npm install
    
    echo > "%ROOT_DIR%\setup_complete.flag"
    echo Setup completed successfully!
)

echo Now you can run the application with start.bat
echo ===================================
echo.

cd /d "%ROOT_DIR%"
pause