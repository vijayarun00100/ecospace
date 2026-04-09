import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Connecting physical device via USB ADB Reverse Tunnel
const BASE_URL = Platform.select({
  android: 'https://ddec-2401-4900-4df7-989b-cc4e-3869-fe03-df9b.ngrok-free.app',
  ios: 'https://ddec-2401-4900-4df7-989b-cc4e-3869-fe03-df9b.ngrok-free.app',
  default: 'https://ddec-2401-4900-4df7-989b-cc4e-3869-fe03-df9b.ngrok-free.app',
});

const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const getUploadUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
};

export default api;
export { BASE_URL };
