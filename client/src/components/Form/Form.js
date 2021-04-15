import React, { useState,useEffect } from 'react';
import {TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import {useDispatch,useSelector} from 'react-redux';

import {createPost, updatePost} from '../../actions/posts';

// Get the Current Id


const Form = ({currentId, setCurrentId})=>{

    const [postData, setpostData] = useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
    });

    const post = useSelector((state)=>currentId ? state.posts.find((p)=> p._id === currentId):null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        if(post) setpostData(post);
    },[post])

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(currentId){
             dispatch(updatePost(currentId,{...postData, name: user?.result?.name}));
            //dispatch(createPost({...postData, name: user?.result?.name}));    
        }
        else{
            //dispatch(updatePost(currentId,{...postData, name: user?.result?.name}));
            dispatch(createPost({...postData, name: user?.result?.name}));    
        }

        clear();

    }
    const clear = ()=>{
        setCurrentId(null);
        setpostData({ title:'', message:'', tags:'', selectedFile:'' });
    }

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create post your memories and like other's posts
                </Typography>
            </Paper>
        )
    }

    return(
       <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setpostData({ ...postData, title:e.target.value})} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>setpostData({ ...postData,message:e.target.value})} />
                <TextField name="tags" variant="outlined" label="Tags (Comma Seperated)" fullWidth value={postData.tags} onChange={(e)=>setpostData({...postData,tags:e.target.value.split(',')})} />
                <div className={classes.fileInput}>
                    <FileBase type="file" mulitple={false} onDone={({base64})=>setpostData({...postData,selectedFile:base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth> Submit </Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth> Clear </Button>
            </form>
        
       </Paper>
    );
}

export default Form;