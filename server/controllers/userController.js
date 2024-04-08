const User = require("../models/User")

//GetAll
const getAllUsers = async (req, res) => {
    const users = await User.find().lean()
    res.json(users)
}

//GetbyId
const getUserById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "no users found" })
    }
    const users = await User.findById(id).exec()
    res.json(users)
}

//CreateNewUser
const createNewUser = async (req, res) => {
    const { name, username, email, address, phone } = req.body
    if (!name) {
        return res.status(400).json({ message: "name is require" })
    }
    const user = await User.create({ name, username, email, address, phone })

    if (user) {
        return res.status(201).json({ massage: "new user created" })
    }
    return res.status(400).json({ message: "invalid users" })
    

}

//updateUser
const updateUser = async (req, res) => {
    console.log("update in server")
    debugger;
    const { id, name, username, address, email, phone } = req.body
    if (!id || !name) {
        // return res.status(400).json({message:"fields required"})
        return res.json({ message: "user not found" })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.json({ message: "user not found" })
        // return res.status(400).json({message:"users not found"})
    }
    debugger;
    console.log("in update user server before data");
    user.name = name
    user.username = username
    user.email = email
    user.address = address
    user.phone = phone
    console.log(user);
    const updatedUser = await user.save()
    res.json(`${updatedUser.name} update`)
}

//DeleteOne
const deleteUser = async (req, res) => {
    const { id } = req.body
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }

    const result = await User.deleteOne(user)
    res.json(`user is deleted`)
   
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
}

