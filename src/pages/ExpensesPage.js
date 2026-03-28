import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import './ExpensesPage.css';

/**
 * Expenses page – form + list side by side
 */
function ExpensesPage({ expenses, onAdd, onDelete, onUpdate, onClearAll }) {
  const [editData, setEditData] = useState(null);

  const handleEdit = (expense) => setEditData(expense);
  const handleCancelEdit = () => setEditData(null);

  const handleUpdate = (id, data) => {
    onUpdate(id, data);
    setEditData(null);
  };

  return (
    <div className="expenses-page">
      <div className="ep-form-col">
        <ExpenseForm
          onAdd={onAdd}
          editData={editData}
          onUpdate={handleUpdate}
          onCancelEdit={handleCancelEdit}
        />
      </div>
      <div className="ep-list-col">
        <ExpenseList
          expenses={expenses}
          onDelete={onDelete}
          onEdit={handleEdit}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  );
}

export default ExpensesPage;
