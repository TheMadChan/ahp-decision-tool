# AHP Decision Support Tool

A web-based application for calculating criteria weights using the Analytic Hierarchy Process (AHP) method.

## Project Structure

- `/backend` - FastAPI backend for weight calculation
- `/frontend` - React frontend for user interface

## Simplified Setup and Running

### Windows Users

1. **Setup (First-time only)**:
   Double-click `setup.bat` or run the following command to install all dependencies
   ```bash
   setup.bat
   ```

2. **Running the Application**:
   Double-click `start.bat` or run the following command to launch the application
   ```bash
   start.bat
   ```
   The backend and frontend will start automatically. Access the tool at http://localhost:3000

### macOS and Linux Users

1. **Setup (First-time only)**: Run the following command to install the dependencies
   ```bash
   # Make scripts executable (if needed)
   chmod +x setup.sh run.sh
   
   # Install dependencies
   ./setup.sh
   ```
2. **Running the Application**: Run the following command to launch the application
    ```bash
   ./run.sh
   ```


## Manual Setup (Alternative)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the server:
```bash
uvicorn main:app --reload
```

The backend server will run on http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Usage

1. Set the number of criteria and provide names for each
2. Fill in the pairwise comparison matrix
3. Click "Calculate Weights" to see the results
4. Review the consistency ratio to ensure reliable results (CR < 0.1 is considered consistent)

## Implementation Details

- The backend uses the eigenvalue method to calculate weights from the pairwise comparison matrix
- Consistency is calculated using Saaty's Random Index (RI) values
- The frontend provides an interface for entering the comparison values and visualizing the results

## Requirements

- Python 3.6 or higher
- Node.js 14 or higher
- npm 6 or higher