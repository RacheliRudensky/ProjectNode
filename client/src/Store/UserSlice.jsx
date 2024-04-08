import { createSlice } from '@reduxjs/toolkit'

const initVal = {
    users: []
}

const userSlice = createSlice({
    name: "users",
    initialState: initVal,
    reducers: {
        updateUsersArr: (state, actions) => {
            state.users = actions.payload.getAll
        }
    }
})
export const { updateUsersArr } = userSlice.actions
export default userSlice.reducer