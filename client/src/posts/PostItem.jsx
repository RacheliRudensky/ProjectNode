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

export default function PostItem(props) {
    const postPath = "http://localhost:1233/api/posts";

    const [title, setTitle] = useState(props.post.title);
    const [body, setBody] = useState(props.post.body);
    const [open, setOpen] = React.useState(false);

    const { Delete, Update } = useHTTP()

    const handleUpdate = async () => {
        const postUp = {
            id: props.post._id,
            title: title,
            body: body,
        }
        Update(postPath, postUp);
        setOpen(false);
    };


    return (<>
        <br></br><br></br><br></br>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>

                <Typography variant="h5" component="div">
                    {props.post.title}
                </Typography>

                <Typography variant="h5" component="div">
                    {props.post.body}
                </Typography>

                <Typography variant="body2">
                    <br />
                </Typography>
            </CardContent>

            <CardActions>
                <Button variant="outlined" onClick={async () => {
                    Delete(postPath, props.post)
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
                                id="title"
                                label="enter title"
                                defaultValue={props.post.title}
                                type="string"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="enter body"
                                defaultValue= {props.post.body}
                                type="string"
                                fullWidth
                                variant="standard"
                                onChange={(e) =>setBody(e.target.value)}
                            />
                            

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                setOpen(false);
                            }}>Cancel</Button>
                            <Button disabled={title==""} onClick={handleUpdate}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>

            </CardActions>

        </Card>
    </>
    )
}
