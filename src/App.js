import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/ExpensesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import useExpenses from './hooks/useExpenses';
import './App.css';

/**
 * App – root component
 * Architecture: App -> Header + Pages -> Components
 */
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const {
    expenses, budget, setBudget,
    addExpense, deleteExpense, updateExpense, clearAll,
    totalSpent, remaining, overBudget, usedPercent,
    byCategory, loaded,
  } = useExpenses();

  if (!loaded) {
    return (
      <div className="app-loading">
        
        <p>Loading SpendWise…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-main">
        <div className="app-container">
          {activeTab === 'dashboard' && (
            <Dashboard
              budget={budget}
              totalSpent={totalSpent}
              remaining={remaining}
              overBudget={overBudget}
              usedPercent={usedPercent}
              byCategory={byCategory}
              expenses={expenses}
              onBudgetChange={setBudget}
            />
          )}

          {activeTab === 'expenses' && (
            <ExpensesPage
              expenses={expenses}
              onAdd={addExpense}
              onDelete={deleteExpense}
              onUpdate={updateExpense}
              onClearAll={clearAll}
            />
          )}

          {activeTab === 'charts' && (
            <AnalyticsPage
              expenses={expenses}
              totalSpent={totalSpent}
              byCategory={byCategory}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
