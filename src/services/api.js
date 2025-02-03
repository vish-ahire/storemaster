import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://default-api-url.com",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const fetchProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

const fetchProductDetails = async (productId) => {
  const { data } = await api.get(`/products/${productId}`);
  return data;
};

const updateProductDetails = async ({ productId, updatedData }) => {
  const { data } = await api.put(`/products/${productId}`, updatedData);
  return data;
};

const createProduct = async (newProduct) => {
  const { data } = await api.post('/products', newProduct);
  return data;
};

const deleteProduct = async (productId) => {
  await api.delete(`/products/${productId}`);
};

export { fetchProducts, fetchProductDetails, updateProductDetails, createProduct, deleteProduct };
