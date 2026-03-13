import React from 'react';
import SearchInput from './SearchInput'; // Adjust the import path as necessary

const Navbar = () => {
    return (
        <nav className="bg-[#101010] shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <SearchInput className="border border-transparent bg-[#23232b] rounded-[10px] h-10 py-1 focus:outline-none focus:ring-2 focus:border-[#a78bfa] pr-3" />
            </div>
            <div>
                <button
                    className="border border-[#FFFFFF]/20 text-white px-4 py-2 rounded-[10px] flex items-center space-x-2 hover:bg-[#7C3AED] h-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    <span>Create Quiz</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;