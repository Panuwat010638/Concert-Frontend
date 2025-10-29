'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// กำหนด type สำหรับ mode
type UserMode = 'admin' | 'user';

// กำหนด type สำหรับ Context
interface UserContextType {
  mode: UserMode;
  username: string;
  switchToAdmin: () => void;
  switchToUser: () => void;
  setUsername: (name: string) => void;
}

// สร้าง Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// สร้าง Provider Component
export function UserProvider({ children }: { children: React.ReactNode }) {
  // เก็บสถานะ mode (admin หรือ user)
  const [mode, setMode] = useState<UserMode>('admin');
  // เก็บชื่อ user
  const [username, setUsername] = useState<string>('');

  // โหลดข้อมูลจาก localStorage เมื่อ component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('userMode') as UserMode;
    const savedUsername = localStorage.getItem('username');
    
    if (savedMode) {
      setMode(savedMode);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // ฟังก์ชันสลับเป็น Admin
  const switchToAdmin = () => {
    setMode('admin');
    localStorage.setItem('userMode', 'admin');
    window.location.href = '/admin';
  };

  // ฟังก์ชันสลับเป็น User
  const switchToUser = () => {
    setMode('user');
    localStorage.setItem('userMode', 'user');
    
    // ถ้ายังไม่มี username ให้ใส่ default
    if (!username) {
      const defaultUsername = 'Sara.John';
      setUsername(defaultUsername);
      localStorage.setItem('username', defaultUsername);
    }
    
    window.location.href = '/user';
  };

  // ฟังก์ชันเปลี่ยน username
  const updateUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  return (
    <UserContext.Provider 
      value={{ 
        mode, 
        username, 
        switchToAdmin, 
        switchToUser, 
        setUsername: updateUsername 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook สำหรับใช้ UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
