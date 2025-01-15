const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    stats: {
        totalTasks : {type : Number, default: 0},
        completedTasks : {type : Number, default: 0},
        pendingTasks : {type : Number, default: 0}
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);