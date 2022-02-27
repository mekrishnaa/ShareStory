import React, {useState,useEffect} from 'react';
import {AppBar, Avatar, Button, Typography, Toolbar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import memories from '../../images/memories.png';
import useStyles from './styles';
import {useHistory,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
const classes = useStyles();
const history = useHistory();
const dispatch=useDispatch();
const location = useLocation();
const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));  // This is the user state where we store the current logged in user. which is currently store in localStorage.
const Logout = () =>{

dispatch({type:'LOGOUT'});      // it will dispatch the Logout method.
history.push('/');              // Now we will be on our home page.
setUser(null);                  // setting current user to null since user logged Out.
};

useEffect(()=>{
    const token = user?.token;  // extracting the token from the user.

    //jwt implementation...
    if(token){
        const decodedToken = decode(token);     // decoding the data of the token.
        if(decodedToken.exp * 1000 < new Date().getTime()) Logout();    // here we are checking the expiry of the token. if token is expired we are logged out.
    }

    setUser(JSON.parse(localStorage.getItem('profile')));   // otherwise we are setting the user to the current user.
},[history,location]);

   return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>                            {/** This is our Navigation Bar  */}
                <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center"> ShareStory </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"  />
            </div>
            <Toolbar className={classes.toolbar}>   {/** This is for log in and logout button */}
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant = "contained" className={classes.logout} color="secondary" onClick={Logout}>Logout</Button>
                    </div>

                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>

        </AppBar>
        );
    }
        



export default Navbar;
