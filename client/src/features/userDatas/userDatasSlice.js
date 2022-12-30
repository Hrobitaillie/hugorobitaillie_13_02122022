import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isData: false,
    lastName: "<placeholder>",
    firstName: "<placeholder>"
}

export const userDatasSlice = createSlice({
    name: 'userDatas',
    initialState,
    reducers:{
        resetUserInfos: (state) => {
            state.isData = false
            state.lastName = "<placeholder>"
            state.firstName = "<placeholder>"
        },
        setnames: (state, action) => {
            state.isData = true
            state.lastName = action.payload.lastName
            state.firstName = action.payload.firstName
        }
    }
})
export const userState = (state) => state.userDatas 
export const { setnames, resetUserInfos } = userDatasSlice.actions

export default userDatasSlice.reducer