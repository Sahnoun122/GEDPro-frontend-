"use client"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
}

export default function button({ children , ...props }: ButtonProps) {
  return (
    <div>
      <button
        {...props}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {children}
      </button>
    </div>
  );
}