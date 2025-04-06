import { combineReducers, createStore } from "redux";
import { BlogRedux, PostRedux } from "./BlogRedux";
import { advertiserReducer } from "./advertiserRedux";

const rootReducer = combineReducers({
    blog: BlogRedux,
    post: PostRedux,
    advertise:advertiserReducer
})

export const myStore = createStore(rootReducer)
