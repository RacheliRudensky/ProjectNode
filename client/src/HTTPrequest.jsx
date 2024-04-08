import Axios from "axios"
import { useDispatch } from 'react-redux'
import { updateTasksArr } from "./Store/TaskSlice"
import { updatePostsArr } from "./Store/PostSlice"
import { updateUsersArr } from "./Store/UserSlice"


export default function useHTTP() {
    const dispatch = useDispatch()

    const Get = async (path) => {

        const { data } = await Axios.get(path)
        if (path.endsWith('posts'))
            dispatch(updatePostsArr({ getAll: data }))
        if (path.endsWith('todos'))
            dispatch(updateTasksArr({ getAll: data }))
        if (path.endsWith('users'))
            dispatch(updateUsersArr({ getAll: data }))
    }

    const Post = async (path, obj) => {
        const { data } = await Axios.post(path, obj)
        Get(path)
    }
    const Delete = async (path, obj) => {
        const { data } = await Axios.delete(path, {
            data: { id: obj._id }
        })
        Get(path)
    }
    const Update = async (path, obj) => {
        console.log("in update HTTp");
        const { data } = await Axios.put(path, obj)
        console.log("after update");
        Get(path)
    }
    const UpdateComplete = async (path, obj) => {
        const pathId = path.concat("/")
        const pathId1 = pathId.concat(obj._id)
        const { data } = await Axios.put(pathId1)
        Get(path)
    }
    return { Get, Post, Delete, Update, UpdateComplete }
}

