import api from './config';

export const postsAPI = {
  getFeed: (page = 1, limit = 10) =>
    api.get(`/posts?page=${page}&limit=${limit}`),

  create: (formData: FormData) =>
    api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),

  like: (postId: string) =>
    api.post(`/posts/${postId}/like`),

  dislike: (postId: string) =>
    api.post(`/posts/${postId}/dislike`),

  comment: (postId: string, text: string) =>
    api.post(`/posts/${postId}/comment`, { text }),

  share: (postId: string) =>
    api.post(`/posts/${postId}/share`),

  bookmark: (postId: string) =>
    api.post(`/posts/${postId}/bookmark`),

  search: (q: string) =>
    api.get(`/posts/search?q=${encodeURIComponent(q)}`),
};
