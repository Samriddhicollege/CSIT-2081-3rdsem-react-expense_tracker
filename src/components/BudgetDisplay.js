import React, { useState } from 'react';
import { formatCurrency } from '../utils/format';
import Button from './Button';
import './BudgetDisplay.css';

/**
 * BudgetDisplay – shows total budget, spent, remaining + progress ring
 * Props: budget, totalSpent, remaining, overBudget, usedPercent, onBudgetChange
 */
function BudgetDisplay({ budget, totalSpent, remaining, overBudget, usedPercent, onBudgetChange }) {
  const [editing, setEditing]   = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [error, setError]       = useState('');

  const handleEdit = () => {
    setInputVal(budget);
    setError('');
    setEditing(true);
  };

  const handleSave = () => {
    const val = Number(inputVal);
    if (!inputVal || isNaN(val) || val <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }
    onBudgetChange(val);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setEditing(false);
  };

  /* SVG ring */
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = circ - (circ * usedPercent) / 100;
  const ringColor = overBudget ? 'var(--danger)' : usedPercent > 80 ? '#e88560' : 'var(--accent)';

  return (
    <div className="budget-card">
      {/* Ring */}
      <div className="budget-ring-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={r} fill="none" stroke="var(--surface2)" strokeWidth="12" />
          <circle
            cx="70" cy="70" r={r}
            fill="none"
            stroke={ringColor}
            strokeWidth="12"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '70px 70px', transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="budget-ring-label">
          <span className="budget-ring-pct" style={{ color: ringColor }}>{Math.round(usedPercent)}%</span>
          <span className="budget-ring-sub">used</span>
        </div>
      </div>

      {/* Numbers */}
      <div className="budget-stats">
        <div className="budget-stat">
          <span className="bs-label">Total Budget</span>
          {editing ? (
            <div className="budget-edit-row">
              <input
                className="budget-input"
                type="number"
                value={inputVal}
                onChange={e => { setInputVal(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                autoFocus
                min="1"
              />
              <Button size="sm" onClick={handleSave}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>✕</Button>
            </div>
          ) : (
            <div className="bs-value-row">
              <span className="bs-value">{formatCurrency(budget)}</span>
              <button className="edit-budget-btn" onClick={handleEdit} title="Edit budget">✎</button>
            </div>
          )}
          {error && <p className="bs-error">{error}</p>}
        </div>

        <div className="budget-divider" />

        <div className="budget-stat">
          <span className="bs-label">Spent</span>
          <span className="bs-value bs-spent">{formatCurrency(totalSpent)}</span>
        </div>

        <div className="budget-divider" />

        <div className="budget-stat">
          <span className="bs-label">{overBudget ? '⚠ Over budget' : 'Remaining'}</span>
          <span className={`bs-value ${overBudget ? 'bs-danger' : 'bs-safe'}`}>
            {overBudget ? `−${formatCurrency(Math.abs(remaining))}` : formatCurrency(remaining)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BudgetDisplay;
