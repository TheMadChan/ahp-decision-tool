#!/bin/bash
echo "==================================="
echo "AHP Decision Tool - Setup Script"
echo "==================================="

# Store the root directory of the project
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# First-time setup
if [ ! -f "$ROOT_DIR/setup_complete.flag" ]; then
    echo "First-time setup: Installing dependencies..."
    
    echo "Installing backend dependencies..."
    cd "$ROOT_DIR/backend"
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv || python -m venv venv
    fi
    
    # Activate virtual environment and install dependencies
    source venv/bin/activate
    pip install -r requirements.txt
    deactivate
    
    echo "Installing frontend dependencies..."
    cd "$ROOT_DIR/frontend"
    npm install
    
    # Create flag file
    touch "$ROOT_DIR/setup_complete.flag"
    echo "Setup completed successfully!"
fi

echo "Now you can run the application with ./start.sh"
echo "==================================="
echo

cd "$ROOT_DIR"
read -p "Press Enter to continue..."