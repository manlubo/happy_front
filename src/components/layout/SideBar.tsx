"use client"

import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "@/stores/uiSlice";
import { Icons } from "../common/Icons";
import SideBarUserBlock from "../ui/SideBarUserBlock";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SideBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.ui.sideBar);
  const pathname = usePathname();

  useEffect(() => {
    dispatch(closeSideBar());
  }, [pathname, dispatch]);

  return (
    <div className="fixed inset-0 z-1000 pointer-events-none">
      <div
        className={`
          absolute inset-0 bg-black/50 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}
        `}
        onClick={() => dispatch(closeSideBar())}
      />
      
      <div
        className={`
          absolute top-0 right-0 h-full w-[75%] md:w-80 bg-white
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0 " : "translate-x-full"} shadow-[-12px_0_16px_rgba(0,0,0,0.1)]
          pointer-events-auto p-4
        `}
      >
        <button className={`absolute left-[-64px] bg-white p-3 bottom-4 sm:bottom-auto sm:top-4 border border-gray-200 rounded-full cursor-pointer ${isOpen ? "" : "hidden"}`} onClick={() => dispatch(closeSideBar())}>
          <Icons.rightArrow size={24} className="text-gray-600"/>
        </button>
        
        <div>
          <SideBarUserBlock/>
        </div>
      </div>
    </div>
  );
}