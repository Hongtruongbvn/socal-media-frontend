import React from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean; // ✅ Thêm prop isLoading
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false, // ✅ Mặc định là false
  className,
  disabled,
  ...props
}) => {
  // ✅ Thêm class btn-loading khi đang loading
  const buttonClass = `btn btn-${variant} btn-${size} ${isLoading ? 'btn-loading' : ''} ${className || ''}`.trim();

  return (
    <button 
      className={buttonClass} 
      disabled={disabled || isLoading} // ✅ Disable khi đang loading
      {...props}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner"></span>
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;