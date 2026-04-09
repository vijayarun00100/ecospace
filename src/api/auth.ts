import api from './config';

export const authAPI = {
  signup: (data: { email: string; password?: string; name?: string }) =>
    api.post('/auth/signup', data),

  sendOtp: (email: string) =>
    api.post('/auth/send-otp', { email }),

  verifyOtp: (email: string, otp: string) =>
    api.post('/auth/verify-otp', { email, otp }),

  googleSignIn: (data: { idToken?: string; email: string; name?: string; photo?: string; googleId: string }) =>
    api.post('/auth/google', data),

  saveDetails: (data: { name?: string; phone?: string; bio?: string; interests?: string[] }) =>
    api.put('/auth/details', data),

  getMe: () =>
    api.get('/auth/me'),
};
