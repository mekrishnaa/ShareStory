import React, {useState, useEffect } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts';


const Home = () => {
    const[currentId,setCurrentId]  = useState(null);        // this state is used for track the current user.
    const dispatch = useDispatch();                         // this is a dispatcher function which will dispatch our actions.

    useEffect (()=>{
        dispatch(getPosts());       // whenever any changes in states of dependency array happen then dispatch will call the getPosts() mehtod.
    },[currentId,dispatch]);

return (
    <Grow in>
    <Container>
{  /*     <Grid  className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
*/}       
         <Grid  container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />       {/* This is our Posts Component */}
            </Grid>
            <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>   {/* This is our Form Component */}
            </Grid>

        </Grid>
    </Container>
</Grow> 
)
}

export default Home
