# AHP Decision Support Tool

A web-based application for calculating criteria weights using the Analytic Hierarchy Process (AHP) method.

## Project Structure

- `/backend` - FastAPI backend for weight calculation
- `/frontend` - React frontend for user interface

## Setup Instructions

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

## Implementation Details

- The backend uses the eigenvalue method to calculate weights from the pairwise comparison matrix
- The frontend provides an interface for entering the comparison values and visualizing the results