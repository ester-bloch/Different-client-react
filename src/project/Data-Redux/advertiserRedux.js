
import { produce } from 'immer';

const advertiserState = {
    thisAdvertiser: null
}


export const advertiserReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_ADVERTISER':
            state.thisAdvertiser = action.payload;
            console.log(state.thisAdvertiser)
            break;
        case 'SET_APARTMENTS_OF_THIS_ADVERTISER':
            state.aparts = action.payload;
            break;
        case 'SET_APARTMENT':
            state.thisApartment = action.payload;
            break;
        case 'SET_TOKEN':
            state.token = action.payload;
            break;
        case 'SET_ADVERTISER_FROM_REGISTER':
            state.AdvertiserFromRegister = action.payload;
            break;
        default:
            break;
    }
    return state;
}, advertiserState);

export const setAdvertiserFromRegister = (advertiser) => {
    return {
        type: 'SET_ADVERTISER_FROM_REGISTER',
        payload: advertiser
    }
}

export const setAdvertiser = (data) => {
    return {
        type: 'SET_ADVERTISER',
        payload: data
    }
}
export const setApartment = (data) => {
    return {
        type: 'SET_APARTMENT',
        payload: data
    }
}
export const setApartmentOfThisAdvertiser = (data) => {
    return {
        type: 'SET_APARTMENTS_OF_THIS_ADVERTISER',
        payload: data
    }
}
export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}