"use client"
import React, { HtmlHTMLAttributes } from "react"

interface InputProps  extends React.InputHTMLAttributes<HTMLInputElement>{
    label : string
};

export default function input({label , ...props} : InputProps){
    return (
      <div className="flex flex-col gap-1">
        <label>{label}</label>
        <input {...props} className="border p-2 rounded" />
      </div>
    );
}