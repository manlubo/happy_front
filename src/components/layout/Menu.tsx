import { Icons } from "@/components/common/Icons";

export default function Menu() {
	return (
		<div className="flex gap-4 md:gap-6 lg:gap-8 items-center">
			<Icons.search size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-blue-100/30 transition rounded-full"/>
			<Icons.menu size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-blue-100/30 transition rounded-full"/>
		</div>
	);
}