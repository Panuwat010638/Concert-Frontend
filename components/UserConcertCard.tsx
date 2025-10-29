'use client';

interface UserConcertCardProps {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
  isReserved: boolean;
  onReserve: (id: string, name: string) => void;
  onCancel: (reservationId: string) => void;
  reservationId?: string;
}

export default function UserConcertCard({
  id,
  name,
  description,
  totalSeats,
  reservedSeats,
  isReserved,
  onReserve,
  onCancel,
  reservationId
}: UserConcertCardProps) {
  const isSoldOut = reservedSeats >= totalSeats;

  return (
    <div className="flex flex-col w-full gap-4 sm:gap-6 bg-white rounded-lg border border-[#C2C2C2] p-4 sm:p-6 lg:p-10">
      {/* Concert Name */}
      <h3 className="text-[24px] sm:text-[32px] text-[#1692EC] font-semibold leading-[125%]">{name}</h3>
      
      {/* Description */}
      <div className="flex w-full pt-4 sm:pt-6 border-t border-[#C2C2C2]">
        <p className="text-[18px] sm:text-[24px] text-black font-normal leading-[150%]">
          {description}
        </p>
      </div>
      
      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:mt-2">
        {/* Seats Info */}
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6663 28V25.3333C26.6663 23.9188 26.1044 22.5623 25.1042 21.5621C24.104 20.5619 22.7475 20 21.333 20H10.6663C9.25185 20 7.8953 20.5619 6.8951 21.5621C5.89491 22.5623 5.33301 23.9188 5.33301 25.3333V28"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.0003 14.6667C18.9458 14.6667 21.3337 12.2789 21.3337 9.33333C21.3337 6.38781 18.9458 4 16.0003 4C13.0548 4 10.667 6.38781 10.667 9.33333C10.667 12.2789 13.0548 14.6667 16.0003 14.6667Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span className="text-[24px] text-black font-normal leading-[150%]">
            {totalSeats}
          </span>
        </div>
        
        {/* Action Button */}
        {isReserved ? (
          <button
            onClick={() => reservationId && onCancel(reservationId)}
            className="flex items-center justify-center bg-[#E84E4E] gap-2.5 text-[24px]  text-white font-medium leading-[150%] w-full sm:w-60 lg:w-40 h-[60px] px-6 py-2 rounded-sm hover:brightness-95 cursor-pointer transition-all duration-500 "
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => onReserve(id, name)}
            disabled={isSoldOut}
            className={`flex items-center justify-center gap-2.5 text-[24px]  text-white font-medium leading-[150%] w-full sm:w-60 lg:w-40 h-[60px] px-6 py-2 rounded-sm transition-all duration-500  ${
              isSoldOut
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#1692EC] text-white hover:brightness-95 cursor-pointer '
            }`}
          >
            Reserve
          </button>
        )}
      </div>
    </div>
  );
}
