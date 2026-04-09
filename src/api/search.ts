import api from './config';

export const searchAPI = {
  search: (q: string, type?: string) =>
    api.get(`/search?q=${encodeURIComponent(q)}${type ? `&type=${type}` : ''}`),
};
