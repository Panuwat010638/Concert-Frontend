'use client';

import React, { useState, useEffect } from 'react';
import { actionLogApi } from '@/lib/api';

// Type สำหรับ Action Log
interface ActionLog {
  _id: string;
  username: string;
  action: string; // 'reserve' หรือ 'cancel'
  concertName: string;
  seatNumber?: number;
  actionDate: string;
  details?: string;
}

export default function AdminHistory() {
  // State เก็บข้อมูล action logs
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // โหลดข้อมูลเมื่อ component mount
    loadActionLogs();
  }, []);

  // ฟังก์ชันโหลด Action Logs ทั้งหมด
  const loadActionLogs = async () => {
    try {
      setLoading(true);
      
      // เรียก API ดึง action logs
      const response = await actionLogApi.getAll();
      
      if (response.success) {
        // เก็บข้อมูลใน state
        setActionLogs(response.data);
      }
    } catch (error) {
      console.error('Failed to load action logs:', error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชัน Format วันเวลาให้อ่านง่าย
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



  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[20px] text-black font-normal leading-[150%]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6 sm:gap-8 lg:gap-12 px-6 sm:px-8 lg:px-10 py-16">
      {/* Page Title */}
      <div className="flex flex-col">
        <h1 className="text-[32px] lg:text-[48px] font-bold text-[#1692EC] uppercase">
          History
        </h1>
      </div>

      {/* Table แสดง Action Logs */}
      <div className='flex flex-col border border-[#5B5B5B] bg-white rounded-sm font-inter'>
        {actionLogs.length === 0 ? (
          // ถ้าไม่มีข้อมูล
          <div className="p-8 text-center text-gray-500">
            No action history available
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
                  Username
                </th>
                <th className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[20px] text-black font-semibold leading-[150%]">
                  Concert Name
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
                    {log.username}
                  </td>
                  <td className="text-left border-[#5B5B5B] border px-3 py-2.5 text-[16px] text-black font-normal leading-[150%]">
                    {log.concertName}
                  </td>
                  
                  <td className={`text-left border-[#5B5B5B] border px-3 py-2.5 text-[16px] text-black font-normal leading-[150%] `}>
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
