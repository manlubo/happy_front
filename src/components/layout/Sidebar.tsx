import { Menu, Search } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="flex gap-8 items-center">
            <Search size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-gray-100 transition rounded-full"/>
            <Menu size={40} className="cursor-pointer p-2 text-gray-600 hover:bg-gray-100 transition rounded-full"/>
        </div>
    );
}