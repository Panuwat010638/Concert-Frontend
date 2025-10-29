"use client";

interface DeleteModalProps {
  isOpen: boolean;
  concertName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  isOpen,
  concertName,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  // ถ้าไม่เปิด modal ไม่ต้อง render
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 bg-opacity-50 z-40"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="flex flex-col justify-center items-center gap-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[#E9E9E9] bg-white rounded-lg  z-50 p-6 w-96">
        {/* Icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
            fill="#E63946"
          />
          <path
            d="M26.5444 24L32.4724 18.072C32.7903 17.7308 32.9634 17.2795 32.9552 16.8132C32.947 16.3468 32.7581 15.9019 32.4283 15.5721C32.0985 15.2423 31.6535 15.0534 31.1872 15.0452C30.7209 15.037 30.2696 15.2101 29.9284 15.528L24.0004 21.456L18.0724 15.528C17.7311 15.2101 17.2798 15.037 16.8135 15.0452C16.3472 15.0534 15.9023 15.2423 15.5725 15.5721C15.2427 15.9019 15.0538 16.3468 15.0455 16.8132C15.0373 17.2795 15.2104 17.7308 15.5284 18.072L21.4564 24L15.5284 29.928C15.1913 30.2655 15.002 30.723 15.002 31.2C15.002 31.677 15.1913 32.1345 15.5284 32.472C15.8659 32.8091 16.3234 32.9984 16.8004 32.9984C17.2774 32.9984 17.7349 32.8091 18.0724 32.472L24.0004 26.544L29.9284 32.472C30.2659 32.8091 30.7234 32.9984 31.2004 32.9984C31.6774 32.9984 32.1349 32.8091 32.4724 32.472C32.8094 32.1345 32.9988 31.677 32.9988 31.2C32.9988 30.723 32.8094 30.2655 32.4724 29.928L26.5444 24Z"
            fill="white"
          />
        </svg>

        {/* Message */}
        <div className="flex justify-center items-center w-full">
          <p className="text-[20px] text-black font-bold leading-[150%] text-center">
            Are you sure to delete?
            <br />"{concertName}"
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 w-full gap-4">
          <button
            onClick={onCancel}
            className="flex justify-center items-center w-full h-12 px-4 py-2 border border-[#C4C4C4] text-[16px] text-[#262626] font-medium leading-[150px] rounded-sm hover:brightness-75 transition-all duration-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex justify-center items-center w-full h-12 px-4 py-2 bg-[#E63946] text-[16px] text-white font-medium leading-[150px] rounded-sm hover:brightness-75 transition-all duration-500 cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </>
  );
}
