'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { actionLogApi } from '@/lib/api';
import { ActionLog } from '@/lib/types';
import Link from 'next/link';

export default function UserHistoryPage() {
  const { username } = useUser();
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      loadUserHistory();
    }
  }, [username]);

  const loadUserHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await actionLogApi.getByUsername(username);
      
      if (response.success) {
        // Sort by date (newest first)
        const sortedLogs = response.data.sort((a: ActionLog, b: ActionLog) => 
          new Date(b.actionDate).getTime() - new Date(a.actionDate).getTime()
        );
        setActionLogs(sortedLogs);
      }
    } catch (err) {
      setError('Failed to load reservation history');
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชัน Format วันเวลาให้อ่านง่าย (เหมือน Admin)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // format เป็น DD/MM/YYYY HH:MM:SS
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(',', '');
  };

  // ฟังก์ชันแปลง action เป็นข้อความที่อ่านง่าย
  const getActionDisplay = (action: string) => {
    if (action === 'reserve') {
      return 'Reserve';
    } else if (action === 'cancel') {
      return 'Cancel';
    }
    return action;
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[20px] text-black font-normal leading-[150%]">Loading reservation history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-xl font-normal leading-[150%] text-[#E84E4E]">{error}</div>
        <Link href="/user" className="text-[#0070A4] hover:underline">
          Back to concerts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6 sm:gap-8 lg:gap-12 px-6 sm:px-8 lg:px-10 py-16">
    

      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] lg:text-[48px] font-bold text-[#1692EC] uppercase">
          My Reservation History
        </h1>
        <p className="text-[16px] text-black font-normal leading-[150%]">Username: {username}</p>
      </div>

      {/* Table แสดง Action Logs (เหมือน Admin) */}
      <div className='flex flex-col border border-[#5B5B5B] bg-white rounded-sm font-inter'>
        {actionLogs.length === 0 ? (
          // ถ้าไม่มีข้อมูล
          <div className="p-8 text-center text-gray-500">
            <p className="text-[20px] text-black font-normal leading-[150%]">No reservation history yet</p>
            <p className="text-[16px] text-black font-normal leading-[150%]">Your concert reservations will appear here</p>
            
          </div>
        ) : (
          // ถ้ามีข้อมูล แสดงเป็นตาราง
          <table className="w-full border-collapse border border-[#5B5B5B]">
            <thead>
              <tr>
                <th className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[20px] text-black font-semibold leading-[150%]">
                  Date Time
                </th>
                <th className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[20px] text-black font-semibold leading-[150%]">
                  Concert Name
                </th>
                <th className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[20px] text-black font-semibold leading-[150%]">
                  Details
                </th>
                <th className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[20px] text-black font-semibold leading-[150%]">
                  Action
                </th>
                
              </tr>
            </thead>
            <tbody>
              {/* วนลูปแสดงข้อมูลแต่ละแถว */}
              {actionLogs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-50">
                  <td className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[16px] text-black font-normal leading-[150%]">
                    {formatDate(log.actionDate)}
                  </td>
                  <td className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[16px] text-black font-normal leading-[150%]">
                    {log.concertName}
                  </td>
                  <td className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[16px] text-gray-600 font-normal leading-[150%]">
                    {log.details || '-'}
                  </td>
                  <td className={`text-left border-[#5B5B5B] border px-3 py-2.5 text-[16px] font-semibold leading-[150%] `}>
                    {getActionDisplay(log.action)}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
