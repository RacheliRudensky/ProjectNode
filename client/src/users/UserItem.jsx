import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import useHTTP from "../HTTPrequest"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function UserItem(props) {

    const userPath = "http://localhost:1233/api/users";
    const [name, setName] = useState(props.user.name)
    const [username, setUsername] = useState(props.user.username)
    const [phone, setPhone] = useState(props.user.phone)
    const [email, setEmail] = useState(props.user.email)
    const [address, setAddress] = useState(props.user.address)


    const [open, setOpen] = React.useState(false);

    const { Delete, Update } = useHTTP()

    const handleUpdate = async () => {
        console.log("update in handleUpdate")
        const userUp = {
            id: props.user._id,
            name: name,
            username: username,
            address:address,
            phone: phone,
            email: email,
        }
        Update(userPath, userUp);
        setOpen(false);
        // setName("")
        // setUsername("")
        // setPhone("")
        // setEmail("")
        // setAddress("")

    };


    return (<>
        <br></br><br></br><br></br>
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>

                <Typography variant="h5" component="div">
                    {name}
                </Typography>

                <Typography variant="h5" component="div">
                    {username}
                </Typography>

                <Typography variant="h5" component="div">
                    {phone}
                </Typography>

                <Typography variant="h5" component="div">
                    {email}
                </Typography>

                <Typography variant="h5" component="div">
                    {props.user.address}
                </Typography>

                <Typography variant="body2">
                    <br />
                </Typography>
            </CardContent>

            <CardActions>
                <Button variant="outlined" onClick={async () => {
                    Delete(userPath, props.user)
                }} className="delete-btn">
                    <MdDelete />
                </Button>


                <React.Fragment>
                    <Button variant="outlined" onClick={() => { setOpen(true) }} className="update-btn">
                        <FaPencilAlt />
                    </Button>
                    <Dialog open={open} onClose={() => {
                        setOpen(false);
                    }}>
                        <DialogTitle>Update</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Enter name"
                                type="string"
                                defaultValue={props.user.name}
                                fullWidth
                                variant="standard"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="Enter username"
                                type="string"
                                defaultValue={props.user.username}
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
                                defaultValue={props.user.email}
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
                                defaultValue={props.user.phone}
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
                                defaultValue={props.user.address}
                                fullWidth
                                variant="standard"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                setOpen(false);
                            }}>Cancel</Button>
                            <Button  onClick={handleUpdate}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </CardActions>
        </Card>
    </>
    )
}
