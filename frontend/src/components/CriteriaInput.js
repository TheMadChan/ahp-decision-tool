import React from 'react';

function CriteriaInput({ numCriteria, criteria, onNumCriteriaChange, onCriteriaNameChange }) {
  return (
    <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd' }}>
      <h2>Step 1: Define Criteria</h2>
      <div>
        <label>
          Number of Criteria:
          <input
            type="number"
            min="2"
            max="10"
            value={numCriteria}
            onChange={(e) => onNumCriteriaChange(parseInt(e.target.value))}
            style={{ margin: '0 10px' }}
          />
        </label>
      </div>
      
      <div style={{ marginTop: '15px' }}>
        <h3>Criteria Names</h3>
        {criteria.map((name, i) => (
          <div key={i} style={{ margin: '5px 0' }}>
            <label>
              Criterion {i+1}:
              <input
                type="text"
                value={name}
                onChange={(e) => onCriteriaNameChange(i, e.target.value)}
                style={{ margin: '0 10px' }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CriteriaInput;