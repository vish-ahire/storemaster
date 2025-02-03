import React from 'react';
import { Edit, Trash2 } from 'react-feather';
import { useSelector } from 'react-redux';

const ProductList = ({ products, paginatedProducts, handleEdit, handleDelete, sortColumn, sortOrder, handleSortChange }) => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const handleDeleteClick = (id) => handleDelete(id);
    return (
        <table className={`min-w-full border rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                <tr>
                    <th
                        onClick={() => handleSortChange('name')}
                        className="py-2 px-4 cursor-pointer text-left"
                    >
                        Product Name
                        {sortColumn === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th
                        onClick={() => handleSortChange('price')}
                        className="py-2 px-4 cursor-pointer text-left"
                    >
                        Price
                        {sortColumn === 'price' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th onClick={() => handleSortChange('category')}
                        className="py-2 px-4 cursor-pointer text-left"
                    >
                        Category {sortColumn === 'category' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {paginatedProducts.map((product) => (
                    <tr key={product.id} className={`hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-600' : ''}`}>
                        <td className="py-2 px-4 border-b">{product.name}</td>
                        <td className="py-2 px-4 border-b">${product?.price.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b">{product.category}</td>
                        <td className="py-2 px-4 border-b">{product.status}</td>
                        <td className="py-2 px-4 border-b flex gap-2">
                            <button
                                onClick={() => handleEdit(product)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(product.id)} 
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={20} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
