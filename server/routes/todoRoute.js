const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todoController")


router.get('/', todoController.getAllTodos)
router.post('/', todoController.createNewTodo)
// router.get('/:id', todoController.getTodoById)
router.put('/', todoController.updateTodo)
router.put('/:id', todoController.updateCompleteTodo)
router.delete('/', todoController.deleteTodo)

module.exports = router
