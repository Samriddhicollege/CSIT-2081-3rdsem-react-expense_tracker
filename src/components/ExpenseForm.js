import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../hooks/useExpenses';
import Button from './Button';
import './ExpenseForm.css';

const EMPTY_FORM = { title: '', amount: '', category: 'food', date: new Date().toISOString().split('T')[0], note: '' };

/**
 * ExpenseForm – add or edit an expense
 * Props: onAdd(expense), editData (optional), onUpdate(id, data), onCancelEdit()
 */
function ExpenseForm({ onAdd, editData, onUpdate, onCancelEdit }) {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  /* Populate form when editing */
  useEffect(() => {
    if (editData) setForm({ ...editData });
    else setForm(EMPTY_FORM);
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount.';
    if (!form.date) errs.date = 'Date is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (editData) {
      onUpdate(editData.id, { ...form, amount: Number(form.amount) });
    } else {
      onAdd({ ...form, amount: Number(form.amount) });
      setForm(EMPTY_FORM);
    }
    setErrors({});
  };

  return (
    <div className="expense-form-card">
      <h2 className="form-title">{editData ? '✎ Edit Expense' : '+ Add Expense'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Title */}
          <div className={`field ${errors.title ? 'field--error' : ''}`}>
            <label htmlFor="title">Description</label>
            <input id="title" name="title" type="text" placeholder="Add details..."
              value={form.title} onChange={handleChange} />
            {errors.title && <span className="field-err">{errors.title}</span>}
          </div>

          {/* Amount */}
          <div className={`field ${errors.amount ? 'field--error' : ''}`}>
            <label htmlFor="amount">Amount (NPR)</label>
            <input id="amount" name="amount" type="number" placeholder="0" min="0"
              value={form.amount} onChange={handleChange} />
            {errors.amount && <span className="field-err">{errors.amount}</span>}
          </div>

          {/* Category */}
          <div className="field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className={`field ${errors.date ? 'field--error' : ''}`}>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
            {errors.date && <span className="field-err">{errors.date}</span>}
          </div>

          {/* Note – full width */}
          <div className="field field--full">
            <label htmlFor="note">Note (optional)</label>
            <input id="note" name="note" type="text" placeholder="Any extra detail..."
              value={form.note} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <Button type="submit" size="md">
            {editData ? 'Update Expense' : 'Add Expense'}
          </Button>
          {editData && (
            <Button type="button" variant="ghost" size="md" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
