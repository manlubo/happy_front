'use client'

import { Icons } from "@/components/common/Icons";
import { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { openSideBar } from "@/stores/uiSlice";

export default function Menu() {
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div className="flex gap-4 md:gap-6 lg:gap-8 items-center">
			<Icons.search size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-blue-100/30 transition rounded-full"/>
			<button onClick={() => dispatch(openSideBar())}>
				<Icons.menu size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-blue-100/30 transition rounded-full"/>
			</button>
		</div>
	);
}