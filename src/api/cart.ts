import api from './config';

export const cartAPI = {
  get: () =>
    api.get('/cart'),

  add: (productId: string, quantity = 1, color = '', size = '') =>
    api.post('/cart/add', { productId, quantity, color, size }),

  update: (itemId: string, quantity: number) =>
    api.put('/cart/update', { itemId, quantity }),

  remove: (itemId: string) =>
    api.delete(`/cart/remove/${itemId}`),

  checkout: (paymentMethod?: string, shippingAddress?: string) =>
    api.post('/cart/checkout', { paymentMethod, shippingAddress }),
};

export const ordersAPI = {
  getAll: () =>
    api.get('/orders'),

  getById: (id: string) =>
    api.get(`/orders/${id}`),
};
