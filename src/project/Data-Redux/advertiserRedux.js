
import { produce } from 'immer';

const advertiserState = {
    thisAdvertiser: null
}


export const advertiserReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_ADVERTISER':
            state.thisAdvertiser = action.payload;
            console.log(state.thisAdvertiser);
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
    console.log(data)
    return {
        type: 'SET_ADVERTISER',
        payload: data
    }
}
export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}