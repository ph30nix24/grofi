import { SearchIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function SearchBox() {
    return (
        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-3 bg-white shadow-sm max-w-md">
            <SearchIcon className="w-5 h-5 text-primary shrink-0" />
            <input
                type="text"
                placeholder="Search for cards, loans and more..."
                className="flex-1 text-sm text-gray-600 placeholder-gray-400 outline-none font-poppins bg-transparent"
            />
            <button className="w-8 h-8 bg-primary hover:bg-gold rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 duration-300">
                <ArrowRight className="w-4 h-4 text-white" />
            </button>
        </div>
    )
}