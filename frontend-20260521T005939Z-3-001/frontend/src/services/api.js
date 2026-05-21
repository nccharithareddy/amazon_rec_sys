import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

// Products
export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  searchProducts: (query, category) => api.get('/products/search', { params: { query, category } }),
  getTrendingProducts: () => api.get('/products/trending')
};

// Recommendations
export const recommendationAPI = {
  getRecommendations: () => api.get('/recommendations'),
  trackProductView: (productId) => api.post(`/recommendations/track/${productId}`)
};

// Cart
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart/add', data),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  updateCartItem: (productId, data) => api.patch(`/cart/${productId}`, data)
};

// Orders
export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`)
};

export default api;