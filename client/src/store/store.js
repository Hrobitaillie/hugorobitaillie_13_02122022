import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userDatasReducer from "../features/userDatas/userDatasSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userDatas: userDatasReducer
    }
})