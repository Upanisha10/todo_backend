const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);

const port = 3000;
const mongoDBUrl = "mongodb+srv://dupanisha:fLGGL5Mb37ZqtxuO@cluster0.vbfvk.mongodb.net/";

mongoose.connect(mongoDBUrl).then(() => {
    console.log("Connected to MongoDB");
    try{
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    }catch(err) {
        console.log("Error starting server", err);
    }
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})