'use client';

import React, { useState, useEffect } from 'react';
import UserConcertCard from '@/components/UserConcertCard';
import Toast from '@/components/Toast';
import { concertApi, reservationApi } from '@/lib/api';
import { useUser } from '@/contexts/UserContext';


// Type สำหรับ Concert
interface Concert {
  _id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
  status: string;
}

// Type สำหรับ Reservation
interface Reservation {
  _id: string;
  username: string;
  concertId: string;
  concertName: string;
  status: string;
}

export default function UserDashboard() {
  const { username } = useUser();
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State สำหรับ Toast
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  // โหลดข้อมูลเมื่อ component mount
  useEffect(() => {
    loadData();
  }, [username]);

  // ฟังก์ชันโหลดข้อมูล
  const loadData = async () => {
    try {
      setLoading(true);
      
      // โหลดข้อมูลคอนเสิร์ต
      const concertsRes = await concertApi.getAll();
      if (concertsRes.success) {
        setConcerts(concertsRes.data);
      }
      
      // โหลดการจองของ user
      if (username) {
        const reservationsRes = await reservationApi.getByUsername(username);
        if (reservationsRes.success) {
          // กรองเฉพาะที่ยังจองอยู่ (ไม่ใช่ cancelled)
          const activeReservations = reservationsRes.data.filter(
            (r: Reservation) => r.status === 'reserved'
          );
          setReservations(activeReservations);
        }
      }
    } catch (error) {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันจองคอนเสิร์ต
  const handleReserveConcert = async (concertId: string, concertName: string) => {
    try {
      // ตรวจสอบ username
      if (!username) {
        showToast('Please set username first', 'error');
        return;
      }
      
      const data = {
        username: username,
        concertId: concertId
      };
      
      const response = await reservationApi.create(data);
      
      if (response.success) {
        showToast(`Successfully reserved "${concertName}"`, 'success');
        // โหลดข้อมูลใหม่
        loadData();
      }
    } catch (error: any) {
      // แสดง error message จาก backend
      const message = error.response?.data?.message || 'Failed to reserve concert';
      showToast(message, 'error');
    }
  };

  // ฟังก์ชันยกเลิกการจอง
  const handleCancelReservation = async (reservationId: string) => {
    try {
      if (!username) {
        showToast('Please set username first', 'error');
        return;
      }
      
      const response = await reservationApi.cancel(reservationId, username);
      
      if (response.success) {
        showToast('Reservation cancelled successfully', 'success');
        // โหลดข้อมูลใหม่
        loadData();
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to cancel reservation';
      showToast(message, 'error');
    }
  };

  // เช็คว่า concert นี้ user จองแล้วหรือยัง
  const isReserved = (concertId: string) => {
    return reservations.some(r => r.concertId === concertId && r.status === 'reserved');
  };

  // หา reservation ID สำหรับ concert
  const getReservationId = (concertId: string) => {
    const reservation = reservations.find(r => r.concertId === concertId && r.status === 'reserved');
    return reservation?._id;
  };

  // ฟังก์ชันแสดง Toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      isOpen: true,
      message,
      type
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6 sm:gap-8 lg:gap-12 px-6 sm:px-8 lg:px-10 py-16">
      
      {/* Page Title */}
      <div className="flex flex-col">
        <h1 className="text-[32px] lg:text-[48px] font-bold text-[#1692EC] uppercase">
          Concerts
        </h1>
      </div>
   
      {/* Concerts List */}
      <div className='flex flex-col w-full gap-6 sm:gap-8 lg:gap-12'>
        {concerts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No concerts available</p>
        ) : (
          concerts.map(concert => (
            <UserConcertCard
              key={concert._id}
              id={concert._id}
              name={concert.name}
              description={concert.description}
              totalSeats={concert.totalSeats}
              reservedSeats={concert.reservedSeats}
              isReserved={isReserved(concert._id)}
              reservationId={getReservationId(concert._id)}
              onReserve={handleReserveConcert}
              onCancel={handleCancelReservation}
            />
          ))
        )}
      </div>

      {/* Toast */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
}
