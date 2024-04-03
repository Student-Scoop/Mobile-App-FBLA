import axios from 'axios';
import { BACKEND_API_URL } from '../../constants/config';

export const client = axios.create({
    baseURL: (!BACKEND_API_URL.endsWith('/')) ? `${BACKEND_API_URL}/` : `${BACKEND_API_URL}`,
    timeout: 60000,
    validateStatus: () => true,
});