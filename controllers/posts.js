import postmessage from "../modals/postmessage.js";
import mongoose from 'mongoose';

export const getpost =async(req,res)=>{
    try {
        const postmessages = await postmessage.find();

       res.status(200).json(postmessages);
    } catch (error) {
        res.status(404).json({message:error.message});
        
    }
}

export const createpost = async(req,res)=>{
   const post = req.body;

   const newPost = new postmessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}
// post/123 this will be the value of the id
export const updatepost = async(req,res)=>{
        const { id: _id } = req.params;
        const post = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No post with this ID");
        }
        
        const updatedPost = await postmessage.findByIdAndUpdate(_id,{...post,_id} , { new: true });
        res.json(updatedPost);
        
        
    }


export const deletepost = async(req,res)=>{
    const { id } = req.params;
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with this ID");
    }
    
    try {
        await postmessage.findByIdAndDelete(id);
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(400).json({ message: error });
    } 
    }
    

export const likepost = async(req,res)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with this ID");
    }
try {
    
    const post = await postmessage.findById(id);
    const updatedPost = await postmessage.findByIdAndUpdate(id,{likecount:post.likecount+1} , { new: true });
    res.json(updatedPost);
} catch (error) {
    res.status(400).json({ message: error });
}

}