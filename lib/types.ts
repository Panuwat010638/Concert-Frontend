

export interface Concert {
  _id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
  status: 'active' | 'cancelled' | 'soldout';
  createdAt?: string;
  updatedAt?: string;
}

export interface Reservation {
  _id: string;
  username: string;
  concertId: string;
  concertName: string;
  status: 'reserved' | 'cancelled';
  reservedAt: string;
  cancelledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActionLog {
  _id: string;
  username: string;
  action: string;
  concertId: string;
  concertName: string;
  reservationId?: string;
  actionDate: string;
  details?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export interface CreateConcertDto {
  name: string;
  description: string;
  totalSeats: number;
}

// Note: ลบ UpdateConcertDto ออกแล้วเพราะโจทย์ไม่ต้องการให้มีการแก้ไขคอนเสิร์ต

export interface CreateReservationDto {
  username: string;
  concertId: string;
}
