import React, { useMemo } from 'react';
import { CATEGORIES } from '../hooks/useExpenses';
import { formatCurrency } from '../utils/format';
import './AnalyticsPage.css';

/**
 * AnalyticsPage – monthly trends + category pie-style donut
 */
function AnalyticsPage({ expenses, totalSpent, byCategory }) {

  /* Monthly breakdown for the last 6 months */
  const monthlyData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const key = d.toISOString().slice(0, 7);
      const label = d.toLocaleString('default', { month: 'short', year: '2-digit' });
      const total = expenses
        .filter(e => e.date.startsWith(key))
        .reduce((s, e) => s + Number(e.amount), 0);
      months.push({ key, label, total });
    }
    return months;
  }, [expenses]);

  const maxMonthly = Math.max(...monthlyData.map(m => m.total), 1);

  /* Daily average */
  const daysTracked = useMemo(() => {
    if (expenses.length === 0) return 1;
    const dates = [...new Set(expenses.map(e => e.date))];
    return Math.max(dates.length, 1);
  }, [expenses]);

  const dailyAvg = totalSpent / daysTracked;

  /* Donut chart segments */
  const donutData = useMemo(() => {
    if (totalSpent === 0) return [];
    let cumAngle = -90;
    return byCategory.map(cat => {
      const pct = (cat.total / totalSpent) * 100;
      const angle = (pct / 100) * 360;
      const start = cumAngle;
      cumAngle += angle;
      return { ...cat, pct, startAngle: start, sweepAngle: angle };
    });
  }, [byCategory, totalSpent]);

  const polarToXY = (cx, cy, r, angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const s = polarToXY(cx, cy, r, startAngle);
    const e = polarToXY(cx, cy, r, endAngle);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  return (
    <div className="analytics-page">
      {/* Summary row */}
      <div className="an-summary-row">
        <div className="an-stat-card">
          <span className="an-stat-label">Total Spent</span>
          <span className="an-stat-value">{formatCurrency(totalSpent)}</span>
        </div>
        <div className="an-stat-card">
          <span className="an-stat-label">Daily Average</span>
          <span className="an-stat-value">{formatCurrency(Math.round(dailyAvg))}</span>
        </div>
        <div className="an-stat-card">
          <span className="an-stat-label">Transactions</span>
          <span className="an-stat-value">{expenses.length}</span>
        </div>
        <div className="an-stat-card">
          <span className="an-stat-label">Categories</span>
          <span className="an-stat-value">{byCategory.length}</span>
        </div>
      </div>

      <div className="an-bottom">
        {/* Monthly bar chart */}
        <div className="an-card an-monthly">
          <h3 className="an-card-title">Monthly Spending</h3>
          <div className="monthly-bars">
            {monthlyData.map(m => (
              <div key={m.key} className="mb-col">
                <span className="mb-amount">{m.total > 0 ? formatCurrency(m.total) : ''}</span>
                <div className="mb-bar-wrap">
                  <div
                    className="mb-bar"
                    style={{ height: `${(m.total / maxMonthly) * 100}%` }}
                  />
                </div>
                <span className="mb-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut chart */}
        <div className="an-card an-donut">
          <h3 className="an-card-title">Spending Mix</h3>
          {donutData.length === 0 ? (
            <p className="an-empty">No data yet.</p>
          ) : (
            <>
              <svg viewBox="0 0 200 200" className="donut-svg">
                {donutData.map(seg => (
                  <path
                    key={seg.id}
                    d={describeArc(100, 100, 70, seg.startAngle, seg.startAngle + seg.sweepAngle)}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="28"
                    strokeLinecap="butt"
                  />
                ))}
                <circle cx="100" cy="100" r="56" fill="var(--surface)" />
                <text x="100" y="97" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="DM Serif Display, serif">{byCategory.length}</text>
                <text x="100" y="112" textAnchor="middle" fill="var(--muted)" fontSize="9">categories</text>
              </svg>
              <div className="donut-legend">
                {donutData.map(seg => (
                  <div key={seg.id} className="dl-row">
                    <span className="dl-dot" style={{ background: seg.color }} />
                    <span className="dl-name">{seg.icon} {seg.label}</span>
                    <span className="dl-pct">{Math.round(seg.pct)}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
