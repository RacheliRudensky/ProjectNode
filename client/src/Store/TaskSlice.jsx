import { createSlice } from '@reduxjs/toolkit'

const initVal = {
    tasks: []
}

const taskSlice = createSlice({
    name: "tasks",
    initialState: initVal,
    reducers: {
        updateTasksArr: (state, actions) => {
            state.tasks = actions.payload.getAll
        }
    }
})
export const { updateTasksArr } = taskSlice.actions
export default taskSlice.reducer