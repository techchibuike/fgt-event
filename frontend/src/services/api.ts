import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'https://fgt.alphoch.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerContestant = (data: any) => api.post('/contestants/register', data);
export const getHealth = () => api.get('/health');

export default api;
export { api };
