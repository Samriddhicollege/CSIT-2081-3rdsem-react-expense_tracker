import React from 'react';
import BudgetDisplay from '../components/BudgetDisplay';
import CategoryChart from '../components/CategoryChart';
import { CATEGORIES } from '../hooks/useExpenses';
import { formatCurrency } from '../utils/format';
import './Dashboard.css';

/**
 * Dashboard page – overview: budget ring, quick stats, category chart
 */
function Dashboard({ budget, totalSpent, remaining, overBudget, usedPercent, byCategory, expenses, onBudgetChange }) {
  /* Quick stats: count per category */
  const topCategory = byCategory.length > 0
    ? byCategory.reduce((max, c) => c.total > max.total ? c : max, byCategory[0])
    : null;

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = expenses.filter(e => e.date.startsWith(thisMonth));
  const monthlyTotal = monthlyExpenses.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div className="dashboard">
      {/* Budget overview */}
      <BudgetDisplay
        budget={budget}
        totalSpent={totalSpent}
        remaining={remaining}
        overBudget={overBudget}
        usedPercent={usedPercent}
        onBudgetChange={onBudgetChange}
      />

      {/* Quick stat cards */}
      <div className="quick-stats">
        <div className="qs-card">
         
          <div>
            <span className="qs-label">Total Entries</span>
            <span className="qs-value">{expenses.length}</span>
          </div>
        </div>
        <div className="qs-card">
          
          <div>
            <span className="qs-label">This Month</span>
            <span className="qs-value">{formatCurrency(monthlyTotal)}</span>
          </div>
        </div>
        <div className="qs-card">
          
          <div>
            <span className="qs-label">Top Category</span>
            <span className="qs-value">{topCategory ? topCategory.label : '—'}</span>
          </div>
        </div>
        <div className="qs-card">
       
          <div>
            <span className="qs-label">Categories Used</span>
            <span className="qs-value">{byCategory.length} / {CATEGORIES.length}</span>
          </div>
        </div>
      </div>

    
      <CategoryChart byCategory={byCategory} totalSpent={totalSpent} />
    </div>
  );
}

export default Dashboard;
