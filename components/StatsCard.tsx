"use client";

import React from "react";
import { Users} from "lucide-react";

interface StatsCardProps {
  type: "total" | "reserved" | "cancelled";
  value: number;
}

export default function StatsCard({ type, value }: StatsCardProps) {
  // กำหนดสี และ icon ตาม type
  const getCardStyle = () => {
    switch (type) {
      case "total":
        return {
          bgColor: "bg-[#0070A4]",
          icon: (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.3337 35V31.6667C33.3337 29.8986 32.6313 28.2029 31.381 26.9526C30.1308 25.7024 28.4351 25 26.667 25H13.3337C11.5655 25 9.86986 25.7024 8.61961 26.9526C7.36937 28.2029 6.66699 29.8986 6.66699 31.6667V35"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.9997 18.3333C23.6816 18.3333 26.6663 15.3486 26.6663 11.6667C26.6663 7.98477 23.6816 5 19.9997 5C16.3178 5 13.333 7.98477 13.333 11.6667C13.333 15.3486 16.3178 18.3333 19.9997 18.3333Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          label: "Total of seats",
        };
      case "reserved":
        return {
          bgColor: "bg-[#00A58B]",
          icon: (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.9997 24.9993C26.443 24.9993 31.6663 19.776 31.6663 13.3327C31.6663 6.88936 26.443 1.66602 19.9997 1.66602C13.5564 1.66602 8.33301 6.88936 8.33301 13.3327C8.33301 19.776 13.5564 24.9993 19.9997 24.9993Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.6837 23.1495L11.667 38.3328L20.0003 33.3328L28.3337 38.3328L26.317 23.1328"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          label: "Reserve",
        };
      case "cancelled":
        return {
          bgColor: "bg-[#E84E4E]",
          icon: (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25 15L15 25"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 15L25 25"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          label: "Cancel",
        };
      default:
        return {
          bgColor: "bg-gray-500",
          icon: <Users className="w-8 h-8 text-white" />,
          label: "",
        };
    }
  };

  const { bgColor, icon, label } = getCardStyle();

  return (
    <div
      className={`${bgColor} flex flex-col justify-center items-center gap-2.5  rounded-lg p-6 text-white`}
    >
      {icon}
      <p className="text-[18px] sm:text-[24px] text-white font-normal leading-[150%] text-center">
        {label}
      </p>
      <p className="text-[36px] sm:text-[48px] lg:text-[60px] text-white font-normal leading-[150%] text-center">
        {value}
      </p>
    </div>
  );
}
