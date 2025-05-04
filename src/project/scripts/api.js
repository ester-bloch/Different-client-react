import axios from 'axios'
const baseURL = 'http://localhost:3001/'// הכנס כאן את ה-baseURL שלך
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('different_token'); // שליפת הטוקן מ-localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // הוספת הטוקן לכותרת
    }
    return config; // החזרת הקונפיגורציה המעודכנת
}, error => {
    return Promise.reject(error); // טיפול בשגיאות
});

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            alert(" בעיית אימות", "- התקבלה שגיאה 401", error.response)
            return (window.location.href = "/register");
        }
        return Promise.reject(error);
    }
);
// הוספת אינטרספטור לתגובה

// הגדרת baseURL כברירת מחדל
axios.defaults.baseURL = baseURL; // הכנס כאן את ה-baseURL שלך


export const getAllApartments = async () => {
    return axios.get(`apartment/getAll`)
}
export const getAllCites = async () => {
    return axios.get(`city/getAll`)
}
export const getAllCategories = async () => {
    return axios.get(`category/getAll`)
}
export const Login = async ({ email, password }) => {
    return axios.post(`advertiser/login`, { email, password })
}
export const register = async (advertiser) => {
    return axios.post(`advertiser/register`, advertiser)
}
export const updateAdvertiser = async (advertiser) => {
    //http://localhost:3001/advertiser/update/22@gmail.com
    return axios.patch(`advertiser/update/${advertiser.email}`, advertiser)
}
export const updateApartment = async (apart, id) => {
    return axios.patch(`apartment/update/${id}`, apart)
}
export const deleteApartment = async (apart) => {
    return axios.delete(`apartment/${apart._id}`)
}
export const getApartsByAdvertiser = async (AdvertiserId) => {
    console.log(AdvertiserId)
    //http://localhost:3001/advertiser/ById/id
    return axios.get(`apartment/getByAdvertiser/${AdvertiserId}`)
}
export const getWeather = async (city) => {
    return axios.get(`city/getWeather/${city}`)
}
export const getAdvertiserDetails = async (advertiserId) => {

    return axios.get(`advertiser/ById/${advertiserId}`)
}
export const addapart = async (apart,id) => {
    console.log(apart)
    return axios.post(`apartment`, apart)
}