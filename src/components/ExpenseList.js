import React, { useState } from 'react';
import { CATEGORIES } from '../hooks/useExpenses';
import ExpenseItem from './ExpenseItem';
import Button from './Button';
import './ExpenseList.css';

/**
 * ExpenseList – filterable, searchable list of expenses
 * Props: expenses, onDelete(id), onEdit(expense), onClearAll()
 */
function ExpenseList({ expenses, onDelete, onEdit, onClearAll }) {
  const [search, setSearch]       = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [sortBy, setSortBy]       = useState('date'); // date | amount

  /* ── Filter + sort ── */
  const filtered = expenses
    .filter(e => filterCat === 'all' || e.category === filterCat)
    .filter(e =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.note && e.note.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) =>
      sortBy === 'amount'
        ? Number(b.amount) - Number(a.amount)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="expense-list-card">
      {/* Header */}
      <div className="el-header">
        <h2 className="el-title">Transactions <span className="el-count">{expenses.length}</span></h2>
        {expenses.length > 0 && (
          <Button variant="danger" size="sm" onClick={onClearAll}>Clear All</Button>
        )}
      </div>

      {/* Controls */}
      <div className="el-controls">
        <input
          className="el-search"
          type="text"
          placeholder="🔍︎  Search expenses…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="el-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
          ))}
        </select>
        <select className="el-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="date">Sort: Newest</option>
          <option value="amount">Sort: Amount</option>
        </select>
      </div>

      {/* List */}
      <div className="el-list">
        {filtered.length === 0 ? (
          <div className="el-empty">
            {expenses.length === 0
              ? <>
                  <span className="el-empty-icon">⛀⛁</span>
                  <p>No expenses yet.</p>
                  <p className="el-empty-sub">Add your first expense above.</p>
                </>
              : <>
                  <span className="el-empty-icon">🔍︎</span>
                  <p>No results found.</p>
                  <p className="el-empty-sub">Try a different search or filter.</p>
                </>
            }
          </div>
        ) : (
          filtered.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;
