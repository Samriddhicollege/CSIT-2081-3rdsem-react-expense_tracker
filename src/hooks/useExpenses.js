import { useState, useEffect } from 'react';

export const CATEGORIES = [
  { id: 'food',       label: 'Food & Dining',   color: '#e8c97d',  icon: '🍴'  },
  { id: 'transport',  label: 'Transport',        color: '#5eb8a3', icon: '✈︎' },
  { id: 'shopping',   label: 'Shopping',         color: '#a07bd6', icon: '🛒' },
  { id: 'health',     label: 'Health',           color: '#e86060', icon: '✚' },
  { id: 'education',  label: 'Education',        color: '#60b4e8', icon: '🕮' },
  { id: 'bills',      label: 'Bills & Utilities',color: '#e88560', icon: '💳' },
  { id: 'entertainment', label: 'Entertainment', color: '#60e8a8', icon: '🎞' },
  { id: 'other',      label: 'Other',            color: '#8490a8', icon: 'ⓘ' },
];

const STORAGE_KEY = 'spendwise_expenses';
const BUDGET_KEY  = 'spendwise_budget';

function useExpenses() {
  /* ── State ── */
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget]     = useState(50000);
  const [loaded, setLoaded]     = useState(false);

  /* ── Load from localStorage ── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedBudget = localStorage.getItem(BUDGET_KEY);
      if (saved)       setExpenses(JSON.parse(saved));
      if (savedBudget) setBudget(Number(JSON.parse(savedBudget)));
    } catch (e) {
      console.error('Failed to load data', e);
    } finally {
      setLoaded(true);
    }
  }, []);

  /* ── Persist expenses ── */
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses, loaded]);

  /* ── Persist budget ── */
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  }, [budget, loaded]);

  /* ── CRUD ── */
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      date: expense.date || new Date().toISOString().split('T')[0],
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const updateExpense = (id, updated) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const clearAll = () => {
    if (window.confirm('Clear all expenses? This cannot be undone.')) {
      setExpenses([]);
    }
  };

  /* ── Derived ── */
  const totalSpent  = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining   = budget - totalSpent;
  const overBudget  = remaining < 0;
  const usedPercent = Math.min((totalSpent / budget) * 100, 100);

  const byCategory = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses
      .filter(e => e.category === cat.id)
      .reduce((s, e) => s + Number(e.amount), 0),
  })).filter(c => c.total > 0);

  return {
    expenses, budget, setBudget,
    addExpense, deleteExpense, updateExpense, clearAll,
    totalSpent, remaining, overBudget, usedPercent,
    byCategory, loaded,
  };
}

export default useExpenses;
