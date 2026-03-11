import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search" className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create Quiz</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;