const Todo = require("../models/Todo")

//Getall
const getAllTodos = async(req,res)=>{
    const todos=await Todo.find().lean()
    // if(!todos?.length){
    //     return res.status(400).json({message:'No todos found'})
    // }
    res.json(todos)
}

// //GetbyId
// const getTodoByID=async(req,res)=>{


// }

//CreatTodo
const createNewTodo=async(req,res)=>{
    const { title, tags, completed } = req.body
    const todo = await Todo.create({ title, tags, completed })
    if (todo){
        return res.status(201).json({message: 'todo is created'})
    }
    else {
        return res.status(400).json({message: 'todo cant be created'})
    }
    
}

//UpdateTodo
const updateTodo=async(req,res)=>{
    const {id, title, tags, completed } = req.body
    if(!id || !title){
        res.status(400).json ({message:"required fields!!"})
    }
    const todo =  await Todo.findById(id).exec()
    if(!todo){
        return res.status(400).json({message:"todo not found"})
    }

    todo.title = title
    todo.tags = tags
    todo.completed = completed
    const updateTodo = await todo.save()
    res.json(`'${updateTodo.title}' updated`)

}

//updateCompleted
const updateCompleteTodo = async(req,res) => {
    console.log("in server updatecomplete");
    const {id} = req.params
    const todo = await Todo.findById(id).exec()
    if(!todo){
        return res.status(400).json({message:"todo not found"})
    }
    todo.completed = !todo.completed
    const updateTodo = await todo.save()
    res.json(`${updateTodo.title} update`)
    
}

//DeleteTodo
const deleteTodo=async(req,res)=>{
    const {id} = req.body
    const todo = await Todo.findById(id).exec()
    if(!todo){
        return res.status(400).json({message:"this todo is not existed!!"})
    }
    const result = await Todo.deleteOne(todo)
    res.json(` todo is deleted `)

}


module.exports={
    getAllTodos,
    createNewTodo,
    updateTodo,
    updateCompleteTodo,
    deleteTodo
}