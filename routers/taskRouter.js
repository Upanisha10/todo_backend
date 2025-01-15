const express = require('express');
const taskController = require('../controllers/taskController');
const taskRouter = express.Router();

taskRouter.post('/addTask', taskController.addTask);
taskRouter.delete('/deleteTask/:id', taskController.deleteTask);
taskRouter.get('/getAllTasks/:id', taskController.getAllTasksOfAUser);
taskRouter.post('/getSpecificCategoryTasks', taskController.getSpecificCategoryTasks);
taskRouter.put('/updateTask', taskController.updateTask);
taskRouter.get('/getStatsOfUser', taskController.getStatsOfUser);

module.exports = taskRouter;
