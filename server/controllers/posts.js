import  mongoose  from 'mongoose';
import postMessage from '../models/postMessage.js';


// method to get posts
export const getPosts = async(req,res,next)=>{
   try {
       const postMessages = await postMessage.find();   // getting all the postMessages from database
       res.status(200).json(postMessages);
   } catch (error) {
       res.status(404).json({message:error.message});
   }

};

// method for create a post 
export const createPost = async(req,res,next)=>{
    const post = req.body;
    const newPost = new postMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
   try {
    
        await newPost.save();
        res.status(201).json(newPost);
       
   } catch (error) {
       res.status(409).json({message:error.message});
   }
};

// method for updatePost
export const updatePost = async(req,res)=>{
    const { id:_id }  = req.params; 
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id ');
    const updatePost = await postMessage.findByIdAndUpdate(_id, {...post,_id}, {new:true} );
    res.json(updatePost);
};

// method for deletePost
export const deletePost = async(req,res)=>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id ');
    await postMessage.findByIdAndRemove(id);
    res.json({message:'Post Deleted Successfully'});

};


// method for likePost
export const likePost = async(req,res)=>{
    const{id:_id}=req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'});  // checking for authorized user


    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id ');  // checking for valid userId

    const post = await postMessage.findById(_id);   // Getting the user from database;

    const index =post.likes.findIndex((id)=> id===String(req.userId));  // getting the index of the post which user is going to like

    if(index === -1) {
        // want to like the post
        post.likes.push(req.userId);
    }
    else{
        //undo the liked post
        post.likes = post.likes.filter((id)=>id !== String(req.userId));
    }

    //const updatedPost =  await postMessage.findByIdAndUpdate(_id,{likeCount: post.likeCount +1}, {new : true});
    const updatedPost =  await postMessage.findByIdAndUpdate(_id,post, {new : true});  

    res.json(updatedPost);  // update the changes after like in the database

}