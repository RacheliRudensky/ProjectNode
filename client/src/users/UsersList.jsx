import { useEffect, useState } from "react"
import UserItem from "./UserItem"
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

const UserList = () => {

    const userPath = "http://localhost:1233/api/users"
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [open, setOpen] = useState(false);
    const { Get, Post } = useHTTP()

    // Get UseEffect()
    const users = useSelector(state => state.userSlice.users)
    useEffect(() => {
        Get(userPath)
    }, [])

    // if (users.length === 0) return <>
    //     <div className="users-list">
    //     </div></>


    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async (e) => {
        const user = {
            name: name,
            username: username,
            phone: phone,
            email: email,
            address: address
        }
        e.preventDefault()
        Post(userPath, user);
        setName("")
        setUsername("")
        setEmail("")
        setAddress("")
        setOpen(false);
    }

    return <>
        <div className="users-list">
            {users.map((user, index) => {
                return <UserItem user={user} />
            })}
        </div>
        <React.Fragment>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                <IoAddOutline />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter name"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Enter username"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setUsername(e.target.value)}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Enter email"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Enter phone"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Enter address"
                        type="string"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setAddress(e.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={name === ""} onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    </>
}
export default UserList