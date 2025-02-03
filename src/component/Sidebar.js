
import React, { useState, useEffect } from 'react';
import { ChevronLeft, LogOut, ShoppingBag, ShoppingCart, Truck } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/authSlice';
const Sidebar = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const [collapsed, setCollapsed] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    return (
        <div
            className={`h-screen transition-width duration-300 ${isDarkMode ? 'bg-[#243652] text-white' : 'bg-white text-gray-800'
                } ${collapsed ? 'w-20' : 'w-60'} shadow-lg`}
        >
            <div className="relative flex items-center">
                <h2
                    className={`text-lg font-semibold transition-opacity duration-300 p-4 ${collapsed && 'hidden'} ${isDarkMode ? 'text-white' : 'text-gray-800'
                        } whitespace-nowrap`}
                >
                    Admin Dashboard
                </h2>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`top-2 right-4 hover:bg-slate-600 rounded-full p-4 transition-transform duration-300`}
                >
                    <ChevronLeft
                        color={isDarkMode ? 'white' : 'gray'}
                        size={30}
                        className={`transition-transform duration-300 ${collapsed && 'rotate-180'}`}
                    />
                </button>
            </div>
            <div className="flex flex-col gap-4 justify-start p-4">
                <Link
                    to="/dashboard"
                    className={`flex items-center gap-2 ${isDarkMode ? 'text-white hover:bg-[#374151]' : 'text-gray-800 hover:bg-[#f3f4f6]'
                        } px-2 py-2 rounded-md transition duration-300`}>
                    <ShoppingBag size={24} />
                    <span className={`${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                </Link>
                <Link
                    to="/products"
                    className={`flex items-center gap-2 ${isDarkMode ? 'text-white hover:bg-[#374151]' : 'text-gray-800 hover:bg-[#f3f4f6]'
                        } px-2 py-2 rounded-md transition duration-300`}>
                    <ShoppingCart size={24} />
                    <span className={`${collapsed ? 'hidden' : 'block'}`}>Manage Products</span>
                </Link>
                <Link
                    to="/orders"
                    className={`flex items-center gap-2 ${isDarkMode ? 'text-white hover:bg-[#374151]' : 'text-gray-900 hover:bg-[#f3f4f6]'
                        } px-2 py-2 rounded-md transition duration-300`}>
                    <Truck size={24} />
                    <span className={`${collapsed ? 'hidden' : 'block'}`}>Manage Orders</span>
                </Link>
            </div>
            <div
                onClick={handleLogout}
                className={`flex items-center p-7 ${isDarkMode ? 'text-white hover:bg-[#374151]' : 'text-gray-800 hover:bg-[#f3f4f6]'
                    }  rounded-md transition duration-300`}>
                <LogOut size={24} />
                <span className={`${collapsed ? 'hidden' : 'block'}`}>Logout</span>

            </div>
        </div>
    );
};

export default Sidebar;