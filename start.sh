#!/bin/bash
echo "==================================="
echo "AHP Decision Tool - Run Script"
echo "==================================="

# Store the root directory of the project
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Check if setup has been completed
if [ ! -f "$ROOT_DIR/setup_complete.flag" ]; then
    echo "Setup has not been completed yet."
    echo "Please run ./setup.sh first."
    read -p "Press Enter to continue..."
    exit 1
fi

# Start backend server
echo "Starting backend server..."
cd "$ROOT_DIR/backend"
source venv/bin/activate
python -m uvicorn main:app --reload &
BACKEND_PID=$!

# Wait for backend to initialize
echo "Waiting for backend to initialize..."
sleep 3

# Start frontend server
echo "Starting frontend server..."
cd "$ROOT_DIR/frontend"
npm start &
FRONTEND_PID=$!

echo
echo "AHP Decision Tool started successfully!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo

# Make both processes terminate when this script is terminated
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait