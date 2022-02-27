import React,{useState} from 'react'
import {useDispatch} from 'react-redux'; 
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login'; 
import {useHistory} from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import {signin,signup} from '../../actions/auth';
const Auth = ()=> {
    const initialState = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    };
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword,setShowPassword] = useState(false);
    const[isSignup,setIsSignup] = useState(false);
    const[formData,setFormData] = useState(initialState);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))

        }
    };
    const handleChange = (e)=>{
            setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleShowPassword = ()=> setShowPassword((prevShowPassword)=> !prevShowPassword);
    const switchMode = () =>{ 
        setIsSignup(preIsSignup=> !preIsSignup);
        setShowPassword(false);
    };
    const googleSuccess = async(res) =>{
        const result = res?.profileObj;
        const token  = res?.tokenId;
        try {
            dispatch({type:'AUTH', data:{result,token}});
            history.push('/');
        } catch (error) {
            console.log(error);
        } 
    };
    const googleFailure = async(error) =>{
        console.log(error);
        alert('Google Sign In was unsuccessful. Try Again Later');
    };

    return (
       <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" type="password" label="Repeat Password" handleChange={handleChange}  />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? "Sign Up" : "Sign In"} 
                    </Button>
                    <GoogleLogin 
                        clientId="626121231612-efb22sucsj9b9n72rbog92cf9pn44ei9.apps.googleusercontent.com"
                        render={(renderProps)=> (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disable={renderProps.disabled} startIcon={<Icon />} variant="contained"> Google Sign In </Button>)}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy ="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}> {isSignup ? "Already Have Account? Sign In" : "Don't Have an account? SignUp"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        )
    
}
    
export default Auth;
                                  
                                    
