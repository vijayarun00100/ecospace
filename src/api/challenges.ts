import api from './config';

export const challengesAPI = {
  getAll: (category?: string) =>
    api.get(`/challenges${category ? `?category=${category}` : ''}`),

  getById: (id: string) =>
    api.get(`/challenges/${id}`),

  accept: (id: string) =>
    api.post(`/challenges/${id}/accept`),

  submit: (id: string, formData: FormData) =>
    api.post(`/challenges/${id}/submit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),

  getUserHistory: () =>
    api.get('/challenges/user/history'),
};
