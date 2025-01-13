const mongoose = require('mongoose');
const userSchema = require('./userModel');

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    createdAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    },
    category: {
        type : String,
        default: 'All'
    },
    deadline : {
        type: Date,
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    }
})

module.exports = mongoose.model('Task', taskSchema);