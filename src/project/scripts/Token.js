import { jwtDecode } from 'jwt-decode';

export const checkTokenValidity = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // זמן נוכחי בשניות

    return decoded.exp > currentTime; // בודק אם תאריך התפוגה גדול מהזמן הנוכחי
};
