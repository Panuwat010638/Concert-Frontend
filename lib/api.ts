import axios from 'axios';

// กำหนด URL ของ Backend จาก environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// สร้าง axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== Concert APIs ==========
export const concertApi = {
  // ดึงคอนเสิร์ตทั้งหมด
  getAll: async () => {
    const response = await api.get('/concerts');
    return response.data;
  },

  // ดึงคอนเสิร์ตตาม ID
  getById: async (id: string) => {
    const response = await api.get(`/concerts/${id}`);
    return response.data;
  },

  // สร้างคอนเสิร์ตใหม่ (Admin)
  create: async (data: { name: string; description: string; totalSeats: number }) => {
    const response = await api.post('/concerts', data);
    return response.data;
  },

  // Note: ลบ update method ออกแล้วเพราะโจทย์ไม่ต้องการให้มีการแก้ไขคอนเสิร์ต

  // ลบคอนเสิร์ต (Admin)
  delete: async (id: string) => {
    const response = await api.delete(`/concerts/${id}`);
    return response.data;
  },
};

// ========== Reservation APIs ==========
export const reservationApi = {
  // จองตั๋ว (User)
  create: async (data: { username: string; concertId: string }) => {
    const response = await api.post('/reservations', data);
    return response.data;
  },

  // ดึงการจองทั้งหมด (Admin)
  getAll: async () => {
    const response = await api.get('/reservations');
    return response.data;
  },

  // ดึงการจองของ user (User)
  getByUsername: async (username: string) => {
    const response = await api.get(`/reservations/user/${username}`);
    return response.data;
  },

  // ดึงการจองของคอนเสิร์ต (Admin)
  getByConcert: async (concertId: string) => {
    const response = await api.get(`/reservations/concert/${concertId}`);
    return response.data;
  },

  // ยกเลิกการจอง (User)
  cancel: async (id: string, username: string) => {
    const response = await api.patch(`/reservations/${id}/cancel?username=${username}`);
    return response.data;
  },
};

// ========== Action Logs APIs ==========
export const actionLogApi = {
  // ดึง logs ทั้งหมด (Admin)
  getAll: async () => {
    const response = await api.get('/action-logs');
    return response.data;
  },

  // ดึง logs ของ user
  getByUsername: async (username: string) => {
    const response = await api.get(`/action-logs/user/${username}`);
    return response.data;
  },

  // ดึง logs ของคอนเสิร์ต
  getByConcert: async (concertId: string) => {
    const response = await api.get(`/action-logs/concert/${concertId}`);
    return response.data;
  },

  // ดึง logs ตามช่วงเวลา
  getByDateRange: async (startDate: string, endDate: string) => {
    const response = await api.get(`/action-logs/date-range?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },
};
