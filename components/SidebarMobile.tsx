"use client";

import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  mode: "admin" | "user";
}

export default function SidebarMobile({ mode }: SidebarProps) {
  const { switchToAdmin, switchToUser } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="flex lg:hidden flex-col w-full min-h-screen  fixed">
      {/* Mobile */}
      <div className="flex justify-between items-center w-full gap-6 bg-white h-20 relative z-120 px-4 shadow-sm">
        <svg
          className="w-[154px] h-6"
          width="464"
          height="73"
          viewBox="0 0 464 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_1326_20879"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="464"
            height="73"
          >
            <path d="M464 0H0V73H464V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1326_20879)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M60 70.5117H69V41.5117H60V70.5117Z"
              fill="#4A4A4A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M60 34.5117H69V1.51172H60V34.5117Z"
              fill="#4A4A4A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40 70.5117H49V26.5117H40V70.5117Z"
              fill="#4A4A4A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40 19.5117H49V1.51172H40V19.5117Z"
              fill="#46D7CE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 70.5117H29V53.5117H20V70.5117Z"
              fill="#46D7CE"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 46.5117H29V1.51172H20V46.5117Z"
              fill="#4A4A4A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 70.5117H9V1.51172H0V70.5117Z"
              fill="#4A4A4A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M135.399 35.6392V0.204102H142.239V69.4592H135.399V63.9492C133.119 66.8942 128.844 70.5992 121.909 70.5992C111.934 70.5992 102.719 63.5691 102.719 49.6992C102.719 36.1142 111.839 29.0842 121.909 29.0842C129.509 29.0842 133.594 33.2642 135.399 35.6392ZM122.669 35.1642C115.924 35.1642 109.749 40.1041 109.749 49.6992C109.749 58.1542 114.499 64.5192 122.669 64.5192C131.029 64.5192 135.779 57.5842 135.779 49.7942C135.779 39.6291 128.749 35.1642 122.669 35.1642ZM188.069 35.6392V30.0342H194.909V69.4592H188.069V63.9492C185.789 66.8942 181.514 70.5992 174.579 70.5992C164.604 70.5992 155.389 63.5691 155.389 49.6992C155.389 36.1142 164.509 29.0842 174.579 29.0842C182.179 29.0842 186.264 33.2642 188.069 35.6392ZM175.339 35.1642C168.594 35.1642 162.419 40.1041 162.419 49.6992C162.419 58.1542 167.169 64.5192 175.339 64.5192C183.699 64.5192 188.449 57.5842 188.449 49.7942C188.449 39.6291 181.419 35.1642 175.339 35.1642ZM224.399 36.3041H217.559V69.4592H210.719V36.3041H206.539V30.0342H210.719V15.7842H217.559V30.0342H224.399V36.3041ZM263.768 35.6392V30.0342H270.609V69.4592H263.768V63.9492C261.488 66.8942 257.214 70.5992 250.279 70.5992C240.303 70.5992 231.089 63.5691 231.089 49.6992C231.089 36.1142 240.208 29.0842 250.279 29.0842C257.879 29.0842 261.964 33.2642 263.768 35.6392ZM251.038 35.1642C244.294 35.1642 238.118 40.1041 238.118 49.6992C238.118 58.1542 242.868 64.5192 251.038 64.5192C259.398 64.5192 264.148 57.5842 264.148 49.7942C264.148 39.6291 257.118 35.1642 251.038 35.1642ZM280.529 30.0342H288.128L299.814 56.8242L312.163 26.9942L324.419 56.8242L336.199 30.0342H343.798L324.229 72.2142L312.068 42.7642L299.908 72.2142L280.529 30.0342ZM372.148 70.5992C360.178 70.5992 351.249 61.8592 351.249 49.8892C351.249 37.9192 360.083 29.0842 372.148 29.0842C384.214 29.0842 393.048 37.9192 393.048 49.8892C393.048 61.8592 384.118 70.5992 372.148 70.5992ZM372.148 35.1642C364.928 35.1642 358.279 40.2942 358.279 49.8892C358.279 59.5792 365.118 64.5192 372.148 64.5192C379.273 64.5192 386.018 59.4842 386.018 49.8892C386.018 40.1992 379.368 35.1642 372.148 35.1642ZM400.499 30.0342H408.099L419.784 56.8242L432.134 26.9942L444.388 56.8242L456.168 30.0342H463.768L444.198 72.2142L432.039 42.7642L419.879 72.2142L400.499 30.0342Z"
              fill="#4A4A4A"
            />
          </g>
        </svg>

        <button
          id="Button Mobile Menu"
          aria-label="Button Mobile Menu"
          title="Button Mobile Menu"
          type="button"
          className={`flex items-center justify-center p-1 bg-white rounded-full`}
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          <div className="flex flex-col justify-center w-6 h-6 items-center gap-y-1">
            <svg
              className={`min-w-5 min-h-0.5 rounded transition-all duration-500 ${
                mobileMenuOpen == true
                  ? "translate-y-[4px] rotate-45 "
                  : "translate-y-0 rotate-0 "
              }`}
              width="20"
              height="2"
              viewBox="0 0 20 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path className={`  stroke-black`} d="M0 1H32" strokeWidth="2" />
            </svg>
            <svg
              className={`min-w-5 min-h-0.5 rounded  transition-all duration-500 ${
                mobileMenuOpen == true
                  ? "-translate-y-[2px] -rotate-45 "
                  : "translate-y-0 rotate-0 "
              }`}
              width="20"
              height="2"
              viewBox="0 0 20 2"
              fill="none"
              xmlns="http://www.w3.org/ 2000/svg"
            >
              <path className={`  stroke-black`} d="M0 1H32" strokeWidth="2" />
            </svg>
          </div>
        </button>
      </div>
      <aside
        className={`flex flex-col justify-between w-full sm:w-1/2 min-h-screen bg-white  border-r border-[#E7E7E7]
      focus:outline-0 fixed left-0 top-0 z-105 transition-all duration-500 transform
      ${mobileMenuOpen == true ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Top */}
        <div className="flex flex-col w-full pt-20">
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
    </div>
  );
}
