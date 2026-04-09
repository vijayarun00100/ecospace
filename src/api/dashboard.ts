import api from './config';

export const dashboardAPI = {
  get: () =>
    api.get('/dashboard'),

  getCoins: () =>
    api.get('/dashboard/coins'),

  getCoinHistory: () =>
    api.get('/dashboard/coin-history'),

  getTip: () =>
    api.get('/dashboard/tip'),
};
