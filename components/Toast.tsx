'use client';

import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  isOpen, 
  onClose,
  duration = 3000 
}: ToastProps) {
  // Auto close after duration
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  // ถ้าไม่เปิด ไม่ต้อง render
  if (!isOpen) return null;

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? Check : X;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} ${textColor} px-4 py-3 rounded-lg shadow-lg flex items-center min-w-[300px]`}>
        <Icon className="w-5 h-5 mr-3" />
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 hover:opacity-70"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
