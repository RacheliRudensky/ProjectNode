
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
import Switch from '@mui/material/Switch';


export default function TaskItem(props) {

    const todoPath = "http://localhost:1233/api/todos";
    const [title, setTitle] = useState(props.task.title);
    const [tags, setTags] = useState(props.task.tags);
    const [checked, setChecked] = React.useState(props.task.completed);
    const [Innerchecked, setInnerChecked] = React.useState(props.task.completed);
    const [open, setOpen] = React.useState(false);

    const { Delete, Update, UpdateComplete } = useHTTP()

    const handleUpdate = async () => {
        const taskUp = {
            id: props.task._id,
            title: title,
            tags: tags,
            completed: Innerchecked
        }
        setChecked(Innerchecked)
        Update(todoPath, taskUp);
        setOpen(false);
    };

    const handleChange = () => {
        setChecked(!checked)
        UpdateComplete(todoPath, props.task)
    };

    const handleChangeUpdate = () => {
        setChecked(!checked)
        UpdateComplete(todoPath, props.task)
    };
    return (<>
        <br></br><br></br><br></br>
        <Card sx={{ maxWidth: 275 }}>
            <CardContent>

                <Typography variant="h5" component="div">
                    {props.task.title}
                </Typography>

                <Typography variant="h5" component="div">
                    {props.task.tags}
                </Typography>

                <Typography variant="h5" component="div">
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Typography>

                <Typography variant="body2">
                    <br />
                </Typography>
            </CardContent>

            <CardActions>
                <Button variant="outlined" onClick={async () => {
                    Delete(todoPath, props.task)
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
                                type="string"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="enter tags"
                                type="string"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setTags(e.target.value)}
                            /><Switch
                                checked={Innerchecked}
                                onChange={(e) => setInnerChecked(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
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
