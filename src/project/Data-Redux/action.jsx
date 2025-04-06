import { json } from "react-router"

export const LoginThisUser = (user) => {
    return { type: 'LOGIN', payload: user }
}

export const addUser = (user) => {
    return { type: 'ADD_USER', payload: user }
}
export const setCarsFromServer = (data) => {
    return { type: 'SET_CARS', payload: data }
}
export const setCurrentCar = (car) => {
    return { type: 'SET_CURRENT_CAR', payload: car }
}