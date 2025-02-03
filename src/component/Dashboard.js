import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useSelector } from 'react-redux';

const fetchInventoryData = async () => {
    const { data } = await api.get('/inventory'); 
    return data;
};

const Dashboard = () => {
    const { data: inventoryData, error, isLoading } = useQuery({
        queryKey: ['inventory'],
        queryFn: fetchInventoryData,
    });

    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    if (isLoading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">An error occurred: {error.message}</div>;

    return (
        <div className={`p-6 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800'}`}>
            <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div
                    className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 border-2 border-transparent' : 'bg-white border-2 border-gray-300'} 
                    ${isDarkMode ? 'hover:shadow-2xl hover:border-indigo-600' : 'hover:shadow-2xl hover:border-blue-500'} 
                    transition-all duration-300`}>
                    <h2 className="text-xl font-semibold">Total Size: {inventoryData?.totalSize} units</h2>
                </div>

                <div
                    className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 border-2 border-transparent' : 'bg-white border-2 border-gray-300'} 
                    ${isDarkMode ? 'hover:shadow-2xl hover:border-indigo-600' : 'hover:shadow-2xl hover:border-blue-500'} 
                    transition-all duration-300`}>
                    <h2 className="text-xl font-semibold">Total Orders: {inventoryData?.totalOrders}</h2>
                </div>
            </div>
            <h2 className="text-lg font-bold mb-2">Category-wise Count:</h2>
            <table className={`min-w-full border rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                    <tr>
                        <th className="py-2 px-4 text-left border-b">Category</th>
                        <th className="py-2 px-4 text-left border-b">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {Object?.entries(inventoryData?.categories).map(([category, count]) => (
                        <tr key={category} className={`hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-600' : ''}`}>
                            <td className="py-2 px-4 border-b">{category}</td>
                            <td className="py-2 px-4 border-b">{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { Dashboard };
