import {Grid, List, Modal} from "@mui/material";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import BottomNav from "./BottomNav";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import CloseIcon from '@mui/icons-material/Close';
import {deepPurple} from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";

export default function Main() {

    // const {username, setUsername} = useContext(UserContext);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/posts/all')
            .then(function (response) {
                setPosts(response.data);
                // console.table(response.data);
                // console.table(posts);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Grid display="flex" justifyContent="center" alignItems="center" sx={{flexDirection: 'column'}} key={PostCard}>
                {posts.map( post => (
                    <PostCard post={post} />
                ))}
            </Grid>
            <BottomNav />
        </>
    );
}
function PostCard({post}) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/posts/${post.id}/comments`)
            .then(function (response) {
                setComments(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('comment')
        });
    };

    return (
        <Card sx={{flexGrow:1, maxWidth: 500, m:1 }}>
            <CardHeader
                avatar={
                    <Avatar alt={post.author} src={post.profilepic} sx={{ width: 42, height: 42 }} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.author}
                subheader={post.date}
            />
            <CardMedia
                component="img"
                image={post.picture}
                onClick={handleOpen}
                // alt="Paella dish"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="favourite">
                    <TurnedInNotIcon />
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography variant="body2" color="text.secondary" onClick={handleOpen}>{post.description}</Typography>
            </CardContent>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <Grid container>
                        <Grid xs={6} md={8}>
                            <CardMedia
                                component="img"
                                image={post.picture}
                                // alt="Paella dish"
                            />
                        </Grid>
                        <Grid xs={6} md={4}>
                            <CardContent>
                                <CardContent display="flex">
                                    <IconButton onClick={handleClose} sx={{ justifyContent: 'flex-end' }}>
                                        <CloseIcon />
                                    </IconButton>
                                </CardContent>
                                <CardContent sx={{height: '80%'}}>
                                    <Grid display="flex" justifyContent="center" alignItems="center" sx={{flexDirection: 'column'}} key={Comment}>
                                        {comments.map( comment => (
                                            <li><Comment comment={comment}/></li>
                                        ))}
                                    </Grid>
                                        <Box
                                            component="form"
                                            onSubmit={handleSubmit}
                                            noValidate
                                            display="flex" sx={{flexDirection: 'row', mt:1, alignItems: 'baseline'}}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="comment"
                                                label="comment"
                                                name="comment"
                                                autoComplete="..."
                                                autoFocus
                                            />
                                            <IconButton onSubmit={handleSubmit} noValidate  sx={{alignItems: 'center'}}>
                                                <SendIcon />
                                            </IconButton>
                                        </Box>
                                </CardContent>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>
        </Card>
    );
}

function Comment({comment}) {

    return (
        <Card>
            <CardContent>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                <Typography variant='h5' component='div'>
                    Author name
                </Typography>
                <Typography sx={{mb: .5}} color='text.secondary'>
                    comment.description
                </Typography>
            </CardContent>
        </Card>
    )
}