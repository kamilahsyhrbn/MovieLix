import React from "react";
import ScrollToTop from "react-scroll-up";
import { FaArrowUp } from "react-icons/fa6";

export default function BtnScrollTop() {
  return (
    <div className="relative z-[300]">
      <ScrollToTop showUnder={160}>
        <p className="font-bold cursor-pointer bg-[#FF5BAE] text-white text-3xl rounded-full p-3">
          <FaArrowUp />
        </p>
      </ScrollToTop>
    </div>
  );
}
