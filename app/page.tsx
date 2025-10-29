'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // เช็ค mode จาก localStorage
    const savedMode = localStorage.getItem('userMode');
    
    if (savedMode === 'user') {
      router.push('/user');
    } else {
      // Default ไป admin
      router.push('/admin');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl text-gray-600">Loading...</div>
    </div>
  );
}
