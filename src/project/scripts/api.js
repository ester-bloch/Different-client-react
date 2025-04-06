import axios from 'axios'
import { useNavigate } from 'react-router';
const baseURL = 'http://localhost:3001/'// הכנס כאן את ה-baseURL שלך

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // שליפת הטוקן מ-localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // הוספת הטוקן לכותרת
    }
    return config; // החזרת הקונפיגורציה המעודכנת
}, error => {
    return Promise.reject(error); // טיפול בשגיאות
});

// הוספת אינטרספטור לתגובה
axios.interceptors.response.use(response => {
    return response; // החזרת התגובה אם אין שגיאה
}, error => {
    if (error.response && error.response.status === 401) {
        // navigate('/register', { replace: true }); // נווט לנתיב הראשי
        console.log('Unauthorized - handle 401 error here'); // החלף את זה בקוד שלך
    }
    return Promise.reject(error); // החזרת השגיאה
});
// הגדרת baseURL כברירת מחדל
axios.defaults.baseURL = baseURL; // הכנס כאן את ה-baseURL שלך


export const getAllApartments = () => {
    return axios.get(`apartment/getAll`)
}
export const Login = ({ email, password }) => {
    return axios.post(`advertiser/login`, { email, password })
}
export const register = (advertiser) => {
    return axios.post(`/advertiser/register`, advertiser)
}