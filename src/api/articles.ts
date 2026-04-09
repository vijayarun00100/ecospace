import api from './config';

export const articlesAPI = {
  getAll: (page = 1, limit = 10, category?: string) =>
    api.get(`/articles?page=${page}&limit=${limit}${category ? `&category=${category}` : ''}`),

  getTop: () =>
    api.get('/articles/top'),

  getById: (id: string) =>
    api.get(`/articles/${id}`),

  create: (formData: FormData) =>
    api.post('/articles', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),

  search: (q: string) =>
    api.get(`/articles/search?q=${encodeURIComponent(q)}`),

  like: (id: string) =>
    api.post(`/articles/${id}/like`),

  dislike: (id: string) =>
    api.post(`/articles/${id}/dislike`),

  bookmark: (id: string) =>
    api.post(`/articles/${id}/bookmark`),

  share: (id: string) =>
    api.post(`/articles/${id}/share`),
};

export const newsAPI = {
  getAll: () =>
    api.get('/news'),

  create: (formData: FormData) =>
    api.post('/news', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
