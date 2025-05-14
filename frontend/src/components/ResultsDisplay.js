import React from 'react';

function ResultsDisplay({ weights, criteria }) {
  return (
    <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd' }}>
      <h2>Step 3: Results</h2>
      
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((weight, i) => (
            <tr key={i}>
              <td>{criteria[i]}</td>
              <td>{weight.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h3>Visualization</h3>
      {weights.map((weight, i) => (
        <div key={i} style={{ margin: "5px 0" }}>
          <span style={{ display: "inline-block", width: "100px" }}>{criteria[i]}: </span>
          <span style={{ 
            display: "inline-block", 
            width: `${weight * 500}px`, 
            height: "20px", 
            backgroundColor: `hsl(${i * 30}, 70%, 50%)` 
          }}></span>
          <span style={{ marginLeft: "10px" }}>{weight.toFixed(4)}</span>
        </div>
      ))}
    </div>
  );
}

export default ResultsDisplay;