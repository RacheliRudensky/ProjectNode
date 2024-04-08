import { useEffect, useState } from "react"
import PostItem from "./PostItem"
import { useSelector } from 'react-redux'
import useHTTP from "../HTTPrequest"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoAddOutline } from "react-icons/io5";


const PostList = () => {

    const postPath = "http://localhost:1233/api/posts";
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [open, setOpen] = useState(false);
    const { Get, Post } = useHTTP()

    // Get UseEffect()
    const posts = useSelector(state => state.postSlice.posts)
    useEffect(() => {
        Get(postPath)
    }, [])

    // if (posts.length === 0) return <>
    //     <div className="posts-list">
    //     </div></>


    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async (e) => {
        const post = {
            title: title,
            body: body,
        }
        e.preventDefault()
        Post(postPath, post);
        setTitle("")
        setBody("")
        setOpen(false);
    }

    return <>
        <div className="posts-list">
            {posts.map((post, index) => {
                return <PostItem post={post} />
            })}
        </div>
        <React.Fragment>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                <IoAddOutline />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Enter title"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter body"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setBody(e.target.value)}

                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={title==""} onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    </>
}
export default PostList