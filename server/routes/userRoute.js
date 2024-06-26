const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


router.post('/', userController.createNewUser)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router
