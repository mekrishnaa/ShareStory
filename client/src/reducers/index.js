import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

export default combineReducers({    // it will combine our reducer functions.
    // posts:posts,
    posts,auth,
});