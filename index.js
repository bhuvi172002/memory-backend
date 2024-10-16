import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postrouter from './routs/posts.js';
const app = express();


app.use(bodyParser.json({limit: "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended: true}));
app.use(cors());

app.use('/posts',postrouter);

const CONNECTION_URL = 'mongodb+srv://memorydb:memorydb123@cluster0.uiins42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const PORT  = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
.then(()=>{
    app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)});
}).catch((err)=>{ console.log(err.message) ;})


// mongoose.set('useFindAndModify',false);