const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

mongoose.connect( process.env.DB_CONFIG , { useNewUrlParser : true , useUnifiedTopology : true})
        .then(res => {
            console.log('Connected to db');
        } , err => {
            console.log(err);
        });

        
app.use(express.json());
app.use('/auth' , authRouter);


app.listen(3000 , () => {
    console.log('server running on port 3000');
});