import React from 'react';
import './Header.css';


function Header({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'dashboard', label: ' Dashboard' },
    { id: 'expenses',  label: ' Expenses' },
    { id: 'charts',    label: ' Analytics' },
  ];

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="brand-icon"></span>
          <div>
            <span className="brand-name">SpendWise</span>
            <span className="brand-tagline">Expense Tracker</span>
          </div>
        </div>

        <nav className="header-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'nav-tab--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
