import React from 'react';

function ResultsDisplay({ weights, criteria, consistency }) {
  return (
    <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd' }}>
      <h2>Step 3: Results</h2>

      {consistency && (
        <div style={{ 
          padding: '10px', 
          margin: '10px 0', 
          backgroundColor: consistency.is_consistent ? '#d4edda' : '#f8d7da',
          borderRadius: '4px'
        }}>
          <h4>Consistency Check:</h4>
          <p>Consistency Ratio: {consistency.cr.toFixed(4)}</p>
          {consistency.is_consistent ? 
            <p>✓ The comparison matrix is consistent (CR &lt; 0.1)</p> : 
            <p>⚠️ Warning: The comparison matrix is inconsistent (CR &gt; 0.1). You may want to revise your judgments.</p>
          }
        </div>
      )}
      
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