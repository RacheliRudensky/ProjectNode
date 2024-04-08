import * as React from 'react';

import { useEffect, useState } from "react"
import TaskItem from "./TaskItem"
import { useSelector } from 'react-redux'
import useHTTP from "../HTTPrequest"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoAddOutline } from "react-icons/io5";
import Switch from '@mui/material/Switch';


const TaskList = () => {

    const todoPath = "http://localhost:1233/api/todos";
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [completed, setCompleted] = useState(false)
    const [open, setOpen] = useState(false);
    const { Get, Post } = useHTTP()

    // Get()
    const tasks = useSelector(state => state.taskSlice.tasks)
    useEffect(() => {
        Get(todoPath)
    }, [])


    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd =  (e) => {
        debugger;
        const task = {
            title: title,
            tags: tags,
            completed: completed
        }
        e.preventDefault()
        Post(todoPath, task);
        setTitle("")
        setTags("")
        setCompleted(false)
        setOpen(false);
    }


    return <>
        <div className="tasks-list">
            {tasks.map((task, index) => {
                return <TaskItem task={task} />
            })}
        </div>
        <React.Fragment>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                <IoAddOutline />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
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
                        label="Enter tags"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTags(e.target.value)}

                    />
                    <h5>Status</h5>
                     <Switch
                        onChange={(e) => setCompleted(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button  disabled={title==""} onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    </>


}
export default TaskList