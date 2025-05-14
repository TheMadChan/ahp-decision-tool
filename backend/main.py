from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

# Enable CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/calculate_weights/")
async def calculate_weights(matrix: list[list[float]]):
    try:
        A = np.array(matrix)
        n = len(A)

        # calculating weights using eigenvector method
        eigenvalues, eigenvectors = np.linalg.eig(A)
        max_index = np.argmax(eigenvalues)
        weights = np.real(eigenvectors[:, max_index])
        weights = weights / weights.sum()  # Normalize 
        
        # calculating consistency index (CI)
        lambda_max = eigenvalues[max_index].real
        ci = (lambda_max - n)/(n - 1) if n > 1 else 0

        # random index values (Saaty) (RI)
        ri_values = {1: 0, 2: 0, 3: 0.58, 4: 0.9, 5: 1.12, 
                    6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49}
        
        # calculating consistency ratio (CR)
        ri = ri_values.get(n, 1.5)  # Default to 1.5 for n > 10
        cr = ci / ri if ri > 0 else 0
        
        # Convert numpy types to Python native types for JSON serialization
        return {
            "weights": weights.tolist(),
            "consistency": {
                "lambda_max": float(lambda_max.real),  # Convert to Python float
                "ci": float(ci),  # Convert to Python float
                "cr": float(cr),  # Convert to Python float
                "is_consistent": bool(cr < 0.1)  # Convert to Python bool
            }
        }
    except Exception as e:
        return {"error": str(e)}
