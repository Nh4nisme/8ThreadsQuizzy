import React from 'react';

const SearchInput = ({ placeholder = "Search", className = "" }) => {
    const baseClass = "pl-10 pr-4 py-2 outline-none w-full";

    return (
        <div className="relative text-white">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                placeholder={placeholder}
                className={`${baseClass} ${className}`}
            />
        </div>
    );
};

export default SearchInput;
