import React, { useEffect } from "react";

const Toast = ({ id, reason, message, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const isError = reason === "Error";
  const bgColor = isError ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`flex items-center ${bgColor} text-white text-sm font-bold px-4 py-3 rounded-md shadow-md w-64`}
      role="alert"
    >
      {isError ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <span className="flex-grow">
        {reason}: {message}
      </span>
    </div>
  );
};

export default Toast;
