import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const LoginForm = () => {
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(process.env.REACT_APP_LOGIN_URL, data)
                .then((res) => sessionStorage.setItem('token', res.data?.data?.accessToken))
            navigate('/dashboard');
        } catch (error) {
            setLoginError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className={`shadow-md rounded-lg p-8 w-96 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h2 className={`text-2xl font-bold text-center mb-6 text-gray${isDarkMode ? '-100' : '-800'}`}>
                    Login
                </h2>
                {loginError && <p className="text-red-500 text-sm text-center mb-4">{loginError}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    {/* Email Input */}
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address'
                            }
                        })}
                        placeholder="Email"
                        aria-label="Email"
                        className={`border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                    {/* Password Input */}
                    <input
                        {...register('password', { required: 'Password is required' })}
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        className={`border ${isDarkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                    {/* Submit Button */}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className={`bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition duration-200 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};