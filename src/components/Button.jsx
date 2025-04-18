
import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-md font-medium focus:outline-none transition-all duration-300 transform hover:scale-105";
  
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-md",
    secondary: "bg-orange-500 hover:bg-orange-600 text-white shadow-md",
    outline: "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50",
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
  }`;

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
