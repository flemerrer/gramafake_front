import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import {AccountCircle} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";
import {useContext, useState} from "react";
import axios from "axios";

export default function BottomNav() {

    // const {user} = useContext(UserContext);
    const {username, setUsername} = useState('pascal');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // const navigate = useNavigate();

    const [post, setPost] = useState({
        picture: '',
        description: ''
    });

    function handleChange(event) {
        console.log(`${event.target.name} = ${event.target.value}`);
        setPost(prevPost => ({
            ...prevPost, [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:8080/api/posts/create?username=pascal', post)
            .then(response => response.status)
            .then(handleClose);
    }

    return (
        <Box sx={{pb: 7}}>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation>
                    <BottomNavigationAction icon={<HomeIcon/>}/>
                    <BottomNavigationAction icon={<SearchIcon/>}/>
                    <BottomNavigationAction icon={<AddCircleIcon/>} onClick={handleOpen}/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="picture"
                                label="image link"
                                type="text"
                                id="picture"
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                required
                                name="description"
                                label="description"
                                type="text"
                                id="description"
                                // onChange={setPost(Object.assign())}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Post online
                            </Button>
                        </Box>
                    </Modal>
                    <BottomNavigationAction icon={<FavoriteIcon/>}/>
                    <BottomNavigationAction icon={<AccountCircle/>}/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
