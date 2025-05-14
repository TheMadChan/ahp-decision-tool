import React from 'react';

function PairwiseComparison({ criteria, matrix, onMatrixValueChange, onCalculate, error }) {
  // Format display value
  const formatValue = (value) => {
    if (value === 1) return "1";
    if (value < 1) {
      const denominator = Math.round(1/value);
      return `1/${denominator}`;
    }
    return value.toFixed(0);
  };

  // Simple dropdown handler
  const handleChange = (row, col, event) => {
    const selectedValue = event.target.value;
    onMatrixValueChange(row, col, parseFloat(selectedValue));
  };

  return (
    <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd' }}>
      <h2>Step 2: Pairwise Comparison</h2>
      <p>Select how important each row criterion is compared to each column criterion</p>
      
      <div style={{ fontSize: '0.9em', marginBottom: '10px' }}>
        <p>
          <strong>1</strong>: Equal importance | 
          <strong>9</strong>: Row extremely more important than column | 
          <strong>1/9</strong>: Column extremely more important than row
        </p>
      </div>
      
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th></th>
            {criteria.map((name, i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <th>{criteria[i]}</th>
              {row.map((value, j) => (
                <td key={j} style={{ textAlign: 'center' }}>
                  {i === j ? (
                    "1"  // Diagonal is always 1
                  ) : i < j ? (
                    // Upper triangle - user selectable dropdown
                    <select 
                      value={value}
                      onChange={(e) => handleChange(i, j, e)}
                      style={{ width: '70px' }}
                    >
                      <option value="0.111">1/9</option>
                      <option value="0.143">1/7</option>
                      <option value="0.2">1/5</option>
                      <option value="0.333">1/3</option>
                      <option value="1">1</option>
                      <option value="3">3</option>
                      <option value="5">5</option>
                      <option value="7">7</option>
                      <option value="9">9</option>
                    </select>
                  ) : (
                    // Lower triangle - reciprocals
                    formatValue(value)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ margin: "15px 0" }}>
        <button 
          onClick={onCalculate}
          style={{ 
            padding: '8px 15px', 
            backgroundColor: '#4CAF50', 
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Calculate Weights
        </button>
      </div>
      
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default PairwiseComparison;