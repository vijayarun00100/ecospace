import api from './config';

export const productsAPI = {
  getAll: (params?: { category?: string; certification?: string; sort?: string; q?: string; page?: number }) =>
    api.get('/products', { params }),

  getById: (id: string) =>
    api.get(`/products/${id}`),

  getCategories: () =>
    api.get('/products/categories'),

  addReview: (productId: string, data: { title: string; text: string; rating: number }) =>
    api.post(`/products/${productId}/review`, data),

  toggleWishlist: (productId: string) =>
    api.post(`/products/${productId}/wishlist`),

  askQuestion: (productId: string, text: string) =>
    api.post(`/products/${productId}/question`, { text }),

  create: (formData: FormData) =>
    api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
