const Post = require("../models/Post")

//Getall
const getAllPosts = async(req,res)=>{
    const posts = await Post.find().lean()

    res.json(posts)
}

//GetbyId
const getPostByID=async(req,res)=>{
}

//CreatPost
const createNewPost = async(req,res)=>{
    const { title, body } = req.body
    const post = await Post.create({ title, body })
    if (post){
        return res.status(201).json({message: 'post is created'})
    }
    else {
        return res.status(400).json({message: 'post cant be created'})
    }
    
}

//UpdatePost
const updatePost = async(req,res) => {
    const {id, title, body } = req.body
    if(!id || !title){
        res.status(400).json ({message:"required fields!!"})
    }
    const post = await Post.findById(id).exec()
    console.log(post);
    if(!post){
        
        return res.status(400).json({message:"post not found"})
    }

    post.title = title
    post.body = body

    const updatePost = await post.save()
    res.json(`'${updatePost.title}' updated`)

}

//DeletePost
const deletePost = async(req,res) => {
    const {id} = req.body
    const post = await Post.findById(id).exec()
    if(!post){
        return res.status(400).json({message:"this post is not existed!!"})
    }
    const result = await Post.deleteOne(post)
    res.json(` post is deleted `)
}

module.exports={
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost
}