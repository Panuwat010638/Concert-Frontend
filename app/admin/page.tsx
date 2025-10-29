// app/admin/page.tsx
// หน้า Admin Dashboard หลัก

"use client";

import React, { useState, useEffect } from "react";
import StatsCard from "@/components/StatsCard";
import ConcertCard from "@/components/ConcertCard";
import DeleteModal from "@/components/DeleteModal";
import Toast from "@/components/Toast";
import { concertApi, reservationApi } from "@/lib/api";

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

export default function AdminDashboard() {
  // State สำหรับ tab (overview หรือ create)
  const [activeTab, setActiveTab] = useState<"overview" | "create">("overview");

  // State สำหรับเก็บข้อมูล
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // State สำหรับ stats
  const [totalSeats, setTotalSeats] = useState(0);
  const [totalReserved, setTotalReserved] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);

  // State สำหรับ form create concert
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalSeats: "",
  });

  // State สำหรับ Delete Modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    concertId: "",
    concertName: "",
  });

  // State สำหรับ Toast
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // โหลดข้อมูลเมื่อ component mount
  useEffect(() => {
    loadData();
  }, []);

  // ฟังก์ชันโหลดข้อมูล
  const loadData = async () => {
    try {
      setLoading(true);

      // โหลดข้อมูลคอนเสิร์ต
      const concertsRes = await concertApi.getAll();
      if (concertsRes.success) {
        setConcerts(concertsRes.data);

        // คำนวณ stats
        const total = concertsRes.data.reduce(
          (sum: number, c: Concert) => sum + c.totalSeats,
          0
        );
        const reserved = concertsRes.data.reduce(
          (sum: number, c: Concert) => sum + c.reservedSeats,
          0
        );
        setTotalSeats(total);
        setTotalReserved(reserved);
      }

      // โหลดข้อมูลการจอง
      const reservationsRes = await reservationApi.getAll();
      if (reservationsRes.success) {
        setReservations(reservationsRes.data);

        // นับจำนวนที่ยกเลิก
        const cancelled = reservationsRes.data.filter(
          (r: Reservation) => r.status === "cancelled"
        ).length;
        setTotalCancelled(cancelled);
      }
    } catch (error) {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสร้างคอนเสิร์ต
  const handleCreateConcert = async () => {
    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.totalSeats) {
        showToast("Please fill all fields", "error");
        return;
      }

      const data = {
        name: formData.name,
        description: formData.description,
        totalSeats: parseInt(formData.totalSeats),
      };

      const response = await concertApi.create(data);

      if (response.success) {
        showToast("Create successfully", "success");
        // Reset form
        setFormData({ name: "", description: "", totalSeats: "" });
        // เปลี่ยนไปหน้า overview
        setActiveTab("overview");
        // โหลดข้อมูลใหม่
        loadData();
      }
    } catch (error) {
      showToast("Failed to create concert", "error");
    }
  };

  // ฟังก์ชันเปิด Delete Modal
  const openDeleteModal = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      concertId: id,
      concertName: name,
    });
  };

  // ฟังก์ชันลบคอนเสิร์ต
  const handleDeleteConcert = async () => {
    try {
      const response = await concertApi.delete(deleteModal.concertId);

      if (response.success) {
        showToast("Delete successfully", "success");
        // ปิด modal
        setDeleteModal({ isOpen: false, concertId: "", concertName: "" });
        // โหลดข้อมูลใหม่
        loadData();
      }
    } catch (error) {
      showToast("Failed to delete concert", "error");
    }
  };

  // ฟังก์ชันแสดง Toast
  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      isOpen: true,
      message,
      type,
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
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-8">
        <StatsCard type="total" value={totalSeats} />
        <StatsCard type="reserved" value={totalReserved} />
        <StatsCard type="cancelled" value={totalCancelled} />
      </div>

      {/* Tabs */}
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-end justify-start w-full">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-[140px] h-12 text-[24px] font-semibold leading-[125%] transition-colors duration-500 ${
              activeTab === "overview"
                ? "text-[#1692EC] border-b-2 border-[#1692EC]"
                : "text-[#5C5C5C] hover:text-gray-900 cursor-pointer"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`w-[140px] h-12 text-[24px] font-semibold leading-[125%] transition-colors duration-500 ${
              activeTab === "create"
                ? "text-[#1692EC] border-b-2 border-[#1692EC]"
                : "text-[#5C5C5C] hover:text-gray-900 cursor-pointer"
            }`}
          >
            Create
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" ? (
            // Overview Tab
            <div className="flex flex-col w-full gap-6 sm:gap-8 lg:gap-12">
              {concerts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No concerts available
                </p>
              ) : (
                concerts.map((concert) => (
                  <ConcertCard
                    key={concert._id}
                    id={concert._id}
                    name={concert.name}
                    description={concert.description}
                    totalSeats={concert.totalSeats}
                    onDelete={openDeleteModal}
                  />
                ))
              )}
            </div>
          ) : (
            // Create Tab
            <div className="flex flex-col w-full p-10 bg-white border-[#C2C2C2] border rounded-lg gap-6">
              <h2 className="text-[40px] text-[#1692EC] font-semibold leading-[125%]">
                Create
              </h2>
              {/* Concert Name & Total of seat*/}
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 pt-6 border-t border-[#C2C2C2]">
                {/* Concert Name */}
                <div className="flex flex-col w-full gap-4">
                  <label className="text-[24px] text-black font-normal leading-[150%]">
                    Concert Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Please input concert name"
                    className="w-full h-12 px-4 py-2 placeholder:text-[16px] placeholder:text-[#C2C2C2] placeholder:leading-[150%] border border-[#5C5C5C] rounded-sm focus:outline-none focus:border-[#1692EC]"
                  />
                </div>

                {/* Total of seat */}
                <div className="flex flex-col w-full gap-4">
                  <label className="text-[24px] text-black font-normal leading-[150%]">
                    Total of seat
                  </label>
                  <div className="flex flex-col w-full relative">
                    <input
                      type="number"
                      value={formData.totalSeats}
                      onChange={(e) =>
                        setFormData({ ...formData, totalSeats: e.target.value })
                      }
                      placeholder="500"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full h-12 px-4 py-2 placeholder:text-[16px] placeholder:text-[#C2C2C2] placeholder:leading-[150%] border border-[#5C5C5C] rounded-sm focus:outline-none focus:border-[#1692EC]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col w-full gap-4">
                <label className="text-[24px] text-black font-normal leading-[150%]">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Please input description"
                  rows={5}
                  className="w-full h-[102px] px-4 py-2 placeholder:text-[16px] placeholder:text-[#C2C2C2] placeholder:leading-[150%] border border-[#5C5C5C] rounded-sm focus:outline-none focus:border-[#1692EC]"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleCreateConcert}
                  className="flex items-center justify-center bg-[#1692EC] w-40 h-[60px] gap-2.5 text-[24px] text-white font-medium leading-[150%] px-8 py-2 rounded-sm hover:bg-blue-600 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17 21V13H7V21"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7 3V8H15"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        concertName={deleteModal.concertName}
        onConfirm={handleDeleteConcert}
        onCancel={() =>
          setDeleteModal({ isOpen: false, concertId: "", concertName: "" })
        }
      />

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
