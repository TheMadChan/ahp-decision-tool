import React, { useState } from 'react';
import CriteriaInput from './components/CriteriaInput.js';
import PairwiseComparison from './components/PairwiseComparison';
import ResultsDisplay from './components/ResultsDisplay';
import axios from 'axios';

function App() {
  const [numCriteria, setNumCriteria] = useState(3);
  const [criteria, setCriteria] = useState(['Criteria 1', 'Criteria 2', 'Criteria 3']);
  const [matrix, setMatrix] = useState(initializeMatrix(3));
  const [weights, setWeights] = useState(null);
  const [error, setError] = useState(null);

  // Initialize matrix with 1's on diagonal
  function initializeMatrix(n) {
    return Array.from({ length: n }, (_, i) => 
      Array.from({ length: n }, (_, j) => i === j ? 1 : 1)
    );
  }

  const handleNumCriteriaChange = (n) => {
    setNumCriteria(n);
    const newCriteria = Array.from({ length: n }, (_, i) => `Criteria ${i+1}`);
    setCriteria(newCriteria);
    setMatrix(initializeMatrix(n));
    setWeights(null);
    setError(null);
  };

  const handleCriteriaNameChange = (index, value) => {
    const newCriteria = [...criteria];
    newCriteria[index] = value;
    setCriteria(newCriteria);
  };

  const handleMatrixValueChange = (row, col, value) => {
    const val = parseFloat(value) || 1;
    const newMatrix = [...matrix];
    newMatrix[row][col] = val;
    newMatrix[col][row] = 1 / val; // Update reciprocal
    setMatrix(newMatrix);
  };

  const calculateWeights = async () => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:8000/calculate_weights/', matrix);
      setWeights(response.data.weights);
    } catch (err) {
      console.error('Error calculating weights:', err);
      setError(err.response?.data?.error || 'Failed to calculate weights');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>AHP Decision Tool</h1>
      
      <CriteriaInput 
        numCriteria={numCriteria}
        criteria={criteria}
        onNumCriteriaChange={handleNumCriteriaChange}
        onCriteriaNameChange={handleCriteriaNameChange}
      />
      
      <PairwiseComparison
        criteria={criteria}
        matrix={matrix}
        onMatrixValueChange={handleMatrixValueChange}
        onCalculate={calculateWeights}
        error={error}
      />
      
      {weights && (
        <ResultsDisplay 
          weights={weights}
          criteria={criteria}
        />
      )}
    </div>
  );
}

export default App;
