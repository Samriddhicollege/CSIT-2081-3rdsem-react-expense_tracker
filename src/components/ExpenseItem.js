import React from 'react';
import { CATEGORIES } from '../hooks/useExpenses';
import { formatCurrency, formatDateRelative } from '../utils/format';
import Button from './Button';
import './ExpenseItem.css';

/**
 * ExpenseItem – renders a single expense row
 * Props: expense, onDelete(id), onEdit(expense)
 */
function ExpenseItem({ expense, onDelete, onEdit }) {
  const cat = CATEGORIES.find(c => c.id === expense.category) || CATEGORIES[7];

  return (
    <div className="expense-item" style={{ '--cat-color': cat.color }}>
      <div className="ei-icon">{cat.icon}</div>

      <div className="ei-body">
        <div className="ei-top">
          <span className="ei-title">{expense.title}</span>
          <span className="ei-amount">{formatCurrency(expense.amount)}</span>
        </div>
        <div className="ei-meta">
          <span className="ei-cat" style={{ color: cat.color }}>{cat.label}</span>
          <span className="ei-sep">·</span>
          <span className="ei-date">{formatDateRelative(expense.date)}</span>
          {expense.note && (
            <>
              <span className="ei-sep">·</span>
              <span className="ei-note">{expense.note}</span>
            </>
          )}
        </div>
      </div>

      <div className="ei-actions">
        <Button variant="ghost" size="sm" onClick={() => onEdit(expense)} title="Edit">✎</Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(expense.id)} title="Delete">✕</Button>
      </div>
    </div>
  );
}

export default ExpenseItem;
