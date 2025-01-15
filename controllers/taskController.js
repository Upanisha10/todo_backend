const express = require('express');
const Task = require('../models/taskModel');

const addTask = async(req,res) => {
    try{
        const task = await Task.create(req.body);
        const userId = task.userId;
        const user = await User.findById(userId);
        user.stats.totalTasks += 1;
        return res.status(201).json(task);
    }catch(err){
        console.log(err.message);
        return res.status(500).json(err);
    }
}

const deleteTask = async(req,res) => {
    try{
        const {taskId, userId} = req.body;
        const task = await Task.findById(taskId);
        const user = await User.findById(userId);

        if(task.status === "completed"){

            user.stats.completedTasks -= 1;
            user.stats.totalTasks -= 1;
        
        }
        else if(task.status === "pending"){
            user.stats.pendingTasks -= 1;
            user.stats.totalTasks -= 1;
        }
        await user.save();

        await Task.deleteOne({_id: taskId});
        return res.status(200).json({message:"Task deleted successfully"});
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const getAllTasksOfAUser = async(req,res) => {
    try{
        const userId = req.params.id;
        const tasks = await Task.find({userId:userId});
        if(!tasks || tasks.length === 0) return res.status(404).json({message:"No tasks found"});
        else return res.status(200).json(tasks);
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

const getSpecificCategoryTasks = async(req,res) => {
    try{
        const {userId, category} = req.body;
        const tasks = await Task.find({category : category, userId: userId});
        if(!tasks || tasks.length === 0) return res.status(404).json({message:"No tasks found for this category"});
        else return res.status(200).json(tasks);
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

const updateTask = async(req,res) => {
    try{
        const userId = req.body.userId;
        const taskId = req.body.taskId;
        const task = await Task.find({userId:userId, _id:taskId});
        const user = await User.findById(userId);
        if(!task) return res.status(404).json({message:"No task found"});
        else{

            if(req.body.hasOwnProperty("status") && req.body.status !== task.status){

                if(req.body.status === "completed" && task.status === "pending"){
                    
                    user.stats.completedTasks += 1;
                    user.stats.pendingTasks -= 1;
                    task.status = "completed";

                }
                else if(req.body.status === "pending" && task.status === "completed"){

                    user.stats.completedTasks -= 1;
                    user.stats.pendingTasks += 1;
                    task.status = "pending";
                }
            }
            const updatedTask = await Task.updateOne({_id : taskId}, req.body);
            updatedTask.updatedAt = Date.now();
            return res.status(200).json(updatedTask);
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json(error);
    }
}

const getStatsOfUser = async(req,res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        return res.status(200).json(user.stats);
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.getAllTasksOfAUser = getAllTasksOfAUser;
exports.getSpecificCategoryTasks = getSpecificCategoryTasks;
exports.updateTask = updateTask;
exports.getStatsOfUser = getStatsOfUser;
