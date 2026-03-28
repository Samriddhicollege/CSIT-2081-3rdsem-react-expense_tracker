import React from 'react';
import './Button.css';

/**
 * Reusable Button component
 * Props: variant (primary|danger|ghost), size (sm|md|lg), onClick, disabled, children, type
 */
function Button({ children, variant = 'primary', size = 'md', onClick, disabled, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
