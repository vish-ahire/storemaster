import React, { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import ProductList from './ProductList';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import ProductModal from './ProductModal';
import { useSelector } from 'react-redux';
import { fetchProducts, fetchProductDetails, updateProductDetails, createProduct, deleteProduct } from '../services/api';

export const Products = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableProduct, setEditableProduct] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState({});

  const { data: products, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { data: productDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['productDetails', selectedProduct?.id],
    queryFn: () => fetchProductDetails(selectedProduct?.id),
    enabled: !!selectedProduct,
    onSuccess: (data) => {
      setEditableProduct(data);
    },
  });
  if (productDetails) {
    
  }
  const updateMutation = useMutation({
    mutationFn: updateProductDetails,
    onSuccess: () => {
      setModalIsOpen(false);
      refetch();
    },
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      setModalIsOpen(false);
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      refetch();
    },
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [products, searchTerm]);

  const handleSortChange = (column) => {
    if (!modalIsOpen) {
      const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortColumn(column);
      setSortOrder(newSortOrder);
    }
  };

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];
  
    const compareFunctions = {
      name: (a, b) => a.name.localeCompare(b.name),
      price: (a, b) => a.price - b.price,
      category: (a, b) => a.category.localeCompare(b.category),
    };
    const sortFn = (a, b) => {
      const comparison = compareFunctions[sortColumn](a, b);
      return sortOrder === 'asc' ? comparison : -comparison;
    };
    return filteredProducts.slice().sort(sortFn);
  }, [filteredProducts, sortColumn, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, page, itemsPerPage]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setNewProduct({ name: '', price: '', category: '', status: 'available' });
    setModalIsOpen(true);
    setIsCreating(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(productId);
    }
  };

  const handleSave = () => {
    if (isCreating) {
      createMutation.mutate(newProduct);
    } else {
      updateMutation.mutate({
        productId: selectedProduct.id,
        updatedData: editableProduct,
      });
    }
  };

  useEffect(() => {
    if (modalIsOpen && selectedProduct) {
      setEditableProduct(selectedProduct);
    }
  }, [modalIsOpen, selectedProduct]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching products</div>;

  return (
    <div className={`content p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h3 className="text-2xl font-semibold">Manage Products</h3>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button onClick={handleCreate} className="w-full md:w-1/3 mb-4 md:mb-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">Create New Product</button>
        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <div className="mt-4 md:mt-0 md:ml-4">
          <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={`border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} p-2 rounded-md`}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <ProductList
        products={products}
        paginatedProducts={paginatedProducts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
      />
      <Pagination
        page={page}
        handlePageChange={handlePageChange}
        paginatedProducts={paginatedProducts}
        itemsPerPage={itemsPerPage}
      />
      <ProductModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        editableProduct={editableProduct}
        setEditableProduct={setEditableProduct}
        isLoadingDetails={isLoadingDetails}
        handleSave={handleSave}
        isCreating={isCreating}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />
    </div>
  );
};

export default Products;