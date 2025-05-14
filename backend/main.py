from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

# Enable CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/calculate_weights/")
async def calculate_weights(matrix: list[list[float]]):
    try:
        A = np.array(matrix)
        eigenvalues, eigenvectors = np.linalg.eig(A)
        max_index = np.argmax(eigenvalues)
        weights = np.real(eigenvectors[:, max_index])
        weights = weights / weights.sum()  # Normalize weights
        return {"weights": weights.tolist()}
    except Exception as e:
        return {"error": str(e)}
