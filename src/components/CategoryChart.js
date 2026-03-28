import React from 'react';
import { formatCurrency } from '../utils/format';
import './CategoryChart.css';

/**
 * CategoryChart – horizontal bar breakdown by category
 * Props: byCategory (array), totalSpent
 */
function CategoryChart({ byCategory, totalSpent }) {
  if (byCategory.length === 0) {
    return (
      <div className="chart-card">
        <h2 className="chart-title">Category Breakdown</h2>
        <p className="chart-empty">Add some expenses to see your spending breakdown.</p>
      </div>
    );
  }

  const sorted = [...byCategory].sort((a, b) => b.total - a.total);

  return (
    <div className="chart-card">
      <h2 className="chart-title">Category Breakdown</h2>
      <div className="chart-rows">
        {sorted.map(cat => {
          const pct = totalSpent > 0 ? (cat.total / totalSpent) * 100 : 0;
          return (
            <div key={cat.id} className="chart-row">
              <div className="cr-label">
                <span className="cr-icon">{cat.icon}</span>
                <span className="cr-name">{cat.label}</span>
              </div>
              <div className="cr-bar-wrap">
                <div
                  className="cr-bar"
                  style={{ width: `${pct}%`, background: cat.color }}
                />
              </div>
              <div className="cr-vals">
                <span className="cr-amount">{formatCurrency(cat.total)}</span>
                <span className="cr-pct">{Math.round(pct)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryChart;
