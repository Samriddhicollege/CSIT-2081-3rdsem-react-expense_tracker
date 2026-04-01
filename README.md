# SpendWise - Expense Tracker

> A personal finance web application built with React that helps users track daily expenses, manage a monthly budget, and visualize spending patterns through interactive charts.

---

## Student Information

- **Name:** Aawart K C
- **Roll Number:** 2 Sec-A
- **Course / Program:** CSIT
- **Semester / Year:** 3rd Semester / 2081

---

## Instructor Information

- **Instructor Name:** Dipak Shrestha
- **College Name:** Samriddhi College

---

## Project Overview

> SpendWise is a personal finance web application developed using React. It allows users to add, edit, and delete expenses with categories, set a monthly budget, and track remaining balance. Users can search and filter transactions, view a budget progress ring, and analyze spending through a monthly bar chart and a category donut chart. All data is stored in the browser using LocalStorage so it persists across sessions without any backend or database.

---

## Objectives

- Build a responsive React application with proper component architecture
- Implement full CRUD operations for expense management
- Use LocalStorage to persist data without a backend
- Apply clean UI/UX design with a dark theme and smooth animations
- Practice all core React concepts including useState, useEffect, props, and custom hooks

---

## Technologies Used

### Frontend

- React
- JavaScript
- HTML5
- CSS3 (Custom variables, Grid, Flexbox, Animations)

### Storage

- Browser LocalStorage

### Tools

- Create React App
- Git and GitHub
- Vercel (Deployment)

---

## Key Features

- Add, Edit, and Delete expenses with full validation
- 9 expense categories including Food, Transport, Shopping, Health, Bills, Education, Entertainment, Chill, and Other
- Monthly budget display with SVG progress ring showing percentage used
- Search expenses by name or note
- Filter by category and sort by date or amount
- LocalStorage persistence — data survives browser refresh and close
- Analytics page with monthly spending bar chart and category donut chart
- Custom React hook (useExpenses.js) for centralized state and logic
- Conditional rendering for empty states, over-budget warnings, and loading screen
- Fully responsive layout for desktop and mobile

---

## Screens / Modules

- Dashboard — Budget ring, quick stats, and category breakdown
- Expenses Page — Add/Edit form and full transaction list
- Analytics Page — Monthly bar chart and spending-mix donut chart

---

## React Concepts Used

- Component Architecture (App, Pages, Components, Hooks, Utils)
- useState — manages expenses, budget, form, editData, search, filter, errors
- useEffect — loads and saves data to LocalStorage, populates edit form
- Props — data and functions passed from parent to child components
- Event Handling — onClick, onChange, onSubmit, onKeyDown
- Conditional Rendering — empty states, over-budget warning, edit vs add mode
- List Rendering — expenses.map() with unique key={expense.id}
- Custom Hook — useExpenses.js encapsulates all state and logic

---

## Project Structure

```
expense-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button.js / Button.css
│   │   ├── Header.js / Header.css
│   │   ├── BudgetDisplay.js / BudgetDisplay.css
│   │   ├── ExpenseForm.js / ExpenseForm.css
│   │   ├── ExpenseList.js / ExpenseList.css
│   │   ├── ExpenseItem.js / ExpenseItem.css
│   │   └── CategoryChart.js / CategoryChart.css
│   ├── pages/
│   │   ├── Dashboard.js / Dashboard.css
│   │   ├── ExpensesPage.js / ExpensesPage.css
│   │   └── AnalyticsPage.js / AnalyticsPage.css
│   ├── hooks/
│   │   └── useExpenses.js
│   ├── utils/
│   │   └── format.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

---

## Installation and Setup

```bash
# Clone the repository
git clone https://github.com/Samriddhicollege/CSIT-2081-3rdsem-react-expense_tracker.git

# Go to project folder
cd CSIT-2081-3rdsem-react-expense_tracker

# Install dependencies
npm install

# Run the app
npm start
```

The app will open at `http://localhost:3000`

---

## GitHub and Live Demo

- **GitHub Repository:** https://github.com/Samriddhicollege/CSIT-2081-3rdsem-react-expense_tracker
- **Live URL:** https://csit-2081-3rdsem-react-expense-trac.vercel.app

---

## Testing

- Tested UI responsiveness on desktop, tablet, and mobile screen sizes
- Verified form validation for empty fields and invalid amounts
- Checked LocalStorage save and load on browser refresh
- Tested search, filter, and sort functionality with multiple entries
- Checked edge cases such as empty expense list and over-budget state

---

## Challenges Faced

- Managing multiple states together without causing unexpected re-renders
- LocalStorage was saving empty data before loading — fixed using a loaded boolean flag in useEffect
- Making one form handle both Add and Edit mode using editData state
- Building the SVG budget ring and donut chart without any third-party chart library
- Making the two-column layout responsive on smaller screen sizes
- Displaying per-field validation errors smoothly without affecting form layout

---

## Future Enhancements

- Add user authentication so multiple users can have separate data
- Connect to a backend with Node.js and MongoDB for cloud storage
- Convert to a mobile app using React Native
- Add budget alerts when spending approaches the monthly limit
- Allow users to export monthly reports as PDF or Excel
- Add multi-currency support with live exchange rate conversion

---

## Acknowledgement

> I would like to thank my instructor Dipak Shrestha for the guidance and support throughout this project.

---

## Declaration

> I hereby declare that this project is my original work and has been completed as part of my academic submission for the 3rd Semester CSIT program at Samriddhi College.
