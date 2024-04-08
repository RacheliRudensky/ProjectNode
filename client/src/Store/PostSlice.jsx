import { createSlice } from '@reduxjs/toolkit'

const initVal = {
    posts: []
}

const postSlice = createSlice({
    name: "posts",
    initialState: initVal,
    reducers: {
        updatePostsArr: (state, actions) => {
            state.posts = actions.payload.getAll
        }
    }
})
export const { updatePostsArr } = postSlice.actions
export default postSlice.reducer