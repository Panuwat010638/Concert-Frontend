"use client";

import { useUser } from "@/contexts/UserContext";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  mode: "admin" | "user";
}

export default function Sidebar({ mode }: SidebarProps) {
  const { switchToAdmin, switchToUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // ฟังก์ชันสำหรับ navigate
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // ฟังก์ชันสำหรับ logout
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <aside className="hidden lg:flex flex-col justify-between lg:w-1/4 xl:w-[360px] 2xl:w-1/6 min-h-screen bg-white border-r border-[#E7E7E7]">
      {/* Top */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-start w-full p-6">
          <h1 className="text-[40px] text-[#000000] font-semibold leading-[150%]">
            {mode === "admin" ? "Admin" : "User"}
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col w-full gap-4 p-2">
          {/* Home */}
          <button
            onClick={() =>
              handleNavigation(mode === "admin" ? "/admin" : "/user")
            }
            className={` flex w-full items-center gap-2.5 px-2 py-4 rounded-lg transition-colors duration-500 ${
              pathname === `/${mode}`
                ? "bg-[#EAF5F9]"
                : "cursor-pointer hover:bg-gray-100"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 22V12H15V22"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-[24px] text-[#000000] font-normal leading-[150%]">
              {mode === "admin" ? "Home" : "Concerts"}
            </span>
          </button>

          {/* History */}
          <button
            onClick={() => handleNavigation(`/${mode}/history`)}
            className={`flex w-full items-center gap-2.5 px-2 py-4 rounded-lg  transition-colors duration-500 ${
              pathname === `/${mode}/history`
                ? "bg-[#EAF5F9]"
                : "cursor-pointer hover:bg-gray-100"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12H16L14 15H10L8 12H2"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-[24px] text-[#000000] font-normal leading-[150%]">
              {mode === "admin" ? "History" : "My History"}
            </span>
          </button>

          {/* Switch Mode */}
          <button
            onClick={mode === "admin" ? switchToUser : switchToAdmin}
            className="w-full flex items-center px-2 py-4 gap-2.5 hover:bg-gray-100 transition-colors duration-500 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4V10H7"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M23 20V14H17"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.49 8.99959C19.9828 7.56637 19.1209 6.28499 17.9845 5.27501C16.8482 4.26502 15.4745 3.55935 13.9917 3.22385C12.5089 2.88834 10.9652 2.93393 9.50481 3.35636C8.04437 3.77879 6.71475 4.5643 5.64 5.63959L1 9.99959M23 13.9996L18.36 18.3596C17.2853 19.4349 15.9556 20.2204 14.4952 20.6428C13.0348 21.0652 11.4911 21.1108 10.0083 20.7753C8.52547 20.4398 7.1518 19.7342 6.01547 18.7242C4.87913 17.7142 4.01717 16.4328 3.51 14.9996"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-[24px] text-[#000000] font-normal leading-[150%]">
              Switch to {mode === "admin" ? "user" : "admin"}
            </span>
          </button>
        </nav>
      </div>

      {/* Bottom : Logout Button */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 px-2 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-500 cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 17L21 12L16 7"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span className="text-[24px] text-[#000000] font-normal leading-[150%]">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
