import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';

const ProductModal = ({
  modalIsOpen,
  setModalIsOpen,
  editableProduct,
  setEditableProduct,
  isLoadingDetails,
  handleSave,
  isCreating,
  newProduct,
  setNewProduct,
}) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [errors, setErrors] = useState({}); 

  const validate = () => {
    const newErrors = {};
    if (isCreating) {
      if (!newProduct.name) newErrors.name = 'Product name is required.';
      if (!newProduct.price || newProduct.price <= 0) newErrors.price = 'Price must be a positive number.';
      if (!newProduct.category) newErrors.category = 'Category is required.';
    } else {
      if (!editableProduct.name) newErrors.name = 'Product name is required.';
      if (!editableProduct.price || editableProduct.price <= 0) newErrors.price = 'Price must be a positive number.';
      if (!editableProduct.category) newErrors.category = 'Category is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };  

  const handleSaveWithValidation = () => {
    if (validate()) {
      handleSave(); 
    }
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel={isCreating ? 'Create New Product' : 'Edit Product'}
      className={`p-6 rounded-lg shadow-lg w-[60%] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h3 className="text-xl font-semibold mb-4">{isCreating ? 'Create New Product' : 'Edit Product'}</h3>
      {isLoadingDetails ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              value={isCreating ? newProduct.name : editableProduct?.name || ''}
              onChange={(e) =>
                isCreating
                  ? setNewProduct({ ...newProduct, name: e.target.value })
                  : setEditableProduct({ ...editableProduct, name: e.target.value })
              }
              className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} p-2 rounded-md w-full`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={isCreating ? newProduct.description : editableProduct?.description || ''}
              onChange={(e) =>
                isCreating
                  ? setNewProduct({ ...newProduct, description: e.target.value })
                  : setEditableProduct({ ...editableProduct, description: e.target.value })
              }
              className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} p-2 rounded-md w-full`}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={isCreating ? newProduct.price : editableProduct?.price || 0} 
              onChange={(e) =>
                isCreating
                  ? setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                  : setEditableProduct({ ...editableProduct, price: parseFloat(e.target.value) || 0 })
              }
              className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} p-2 rounded-md w-full`}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <input
              type="text"
              value={isCreating ? newProduct.category : editableProduct?.category || ''}
              onChange={(e) =>
                isCreating
                  ? setNewProduct({ ...newProduct, category: e.target.value })
                  : setEditableProduct({ ...editableProduct, category: e.target.value })
              }
              className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} p-2 rounded-md w-full`}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              value={isCreating ? newProduct.status : editableProduct?.status || ''}
              onChange={(e) =>
                isCreating
                  ? setNewProduct({ ...newProduct, status: e.target.value })
                  : setEditableProduct({ ...editableProduct, status: e.target.value })
              }
              className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} p-2 rounded-md w-full`}
            >
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>
          <button
            onClick={handleSaveWithValidation}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {isCreating ? 'Create Product' : 'Save'}
          </button>
        </div>
      )}
    </ReactModal>
  );
};

export default ProductModal;