const express = require('express');
const Task = require('../models/taskModel');

const addTask = async(req,res) => {
    try{
        const task = await Task.create(req.body);
        return res.status(201).json(task);
    }catch(err){
        console.log(err.message);
        return res.status(500).json(err);
    }
}

const deleteTask = async(req,res) => {
    try{
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
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
        if(!task) return res.status(404).json({message:"No task found"});
        else{
            await Task.findByIdAndUpdate(taskId, req.body);
            const updatedTask = await Task.findById(taskId);
            updatedTask.updatedAt = Date.now();
            return res.status(200).json(updatedTask);
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json(error);
    }
}

exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.getAllTasksOfAUser = getAllTasksOfAUser;
exports.getSpecificCategoryTasks = getSpecificCategoryTasks;
exports.updateTask = updateTask;