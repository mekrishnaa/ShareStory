import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';


const app = express();
dotenv.config();    // it will used to get data from our .env files. 


app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());    // it enables us to move data from backed end to front end and vise-verse.

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build/'));
}

app.use('/posts',postRoutes);
app.use('/user',userRoutes);
// const CONNECTION_URL = 'mongodb+srv://<db_name>:<db_password>@cluster0.hhow7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})    // establishing connection from database.
.then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)))
.catch(err=> console.log(err));

mongoose.set('useFindAndModify',false);  // it is used to get rid off unnecessary warning.



