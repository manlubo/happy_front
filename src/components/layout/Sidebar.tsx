import { Menu, Search } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="flex gap-4 md:gap-6 lg:gap-8 items-center">
            <Search size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-blue-100/30 transition rounded-full"/>
            <Menu size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-blue-100/30 transition rounded-full"/>
        </div>
    );
}