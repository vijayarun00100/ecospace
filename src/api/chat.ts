import api from './config';

export const chatAPI = {
  getChats: () =>
    api.get('/chats'),

  create: (receiverId: string) =>
    api.post('/chats', { receiverId }),

  getMessages: (chatId: string) =>
    api.get(`/chats/${chatId}/messages`),

  sendMessage: (chatId: string, content: string, type = 'text') =>
    api.post(`/chats/${chatId}/messages`, { content, type }),

  getCommunities: () =>
    api.get('/chats/communities'),
};
