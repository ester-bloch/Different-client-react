import { jwtDecode } from 'jwt-decode';

export const checkTokenValidity = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime; 
};
