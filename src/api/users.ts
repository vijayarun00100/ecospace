import api from './config';

export const usersAPI = {
  getMe: () =>
    api.get('/users/me'),

  getById: (id: string) =>
    api.get(`/users/${id}`),

  updateProfile: (formData: FormData) =>
    api.put('/users/me', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),

  follow: (userId: string) =>
    api.post(`/users/${userId}/follow`),

  getUserPosts: (userId: string) =>
    api.get(`/users/${userId}/posts`),

  getUserArticles: (userId: string) =>
    api.get(`/users/${userId}/articles`),

  getUserProducts: (userId: string) =>
    api.get(`/users/${userId}/products`),

  search: (query: string) =>
    api.get(`/search?q=${encodeURIComponent(query)}&type=users`),

  getBookmarks: () =>
    api.get('/users/me/bookmarks'),
};
