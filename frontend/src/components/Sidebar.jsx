import React from 'react';

const Sidebar = () => {
    return (
        <div className="h-screen w-70 bg-gray-800 text-white left-0 overflow-y-auto">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Sidebar</h1>
                <nav>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Home</a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">About</a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Services</a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Contact</a>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
