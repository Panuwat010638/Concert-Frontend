"use client";

interface ConcertCardProps {
  id: string;
  name: string;
  description: string;
  totalSeats: number;

  onDelete: (id: string, name: string) => void;
}

export default function ConcertCard({
  id,
  name,
  description,
  totalSeats,
  onDelete,
}: ConcertCardProps) {
  return (
    <div className="flex flex-col w-full gap-4 sm:gap-6 bg-white rounded-lg border border-[#C2C2C2] p-4 sm:p-6 lg:p-10">
      {/* Concert Name */}
      <h3 className="text-[24px] sm:text-[32px] text-[#1692EC] font-semibold leading-[125%]">
        {name}
      </h3>

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

        {/* Delete Button */}
        <button
          onClick={() => onDelete(id, name)}
          className="flex items-center justify-center bg-[#E84E4E] gap-2.5 text-[24px] text-white font-medium leading-[150%] w-full sm:w-60 lg:w-40 h-[60px] px-6 py-2 rounded-sm hover:bg-red-600 transition-colors "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H5H21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 11V17"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 11V17"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
