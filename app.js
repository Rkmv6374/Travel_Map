import express from 'express';
import mongoose  from 'mongoose';
import dotenv  from 'dotenv';
import bodyparser from 'body-parser';
import pin from './routers/pin.js';
import user from './routers/user.js';

dotenv.config();
const app = express();





mongoose.set('strictQuery',true);

// connecting mongoose
const connection = async()=>
  {  try{

    const con_mongodb = await mongoose.connect(process.env.mongo_,{
        useNewUrlParser:true,useUnifiedTopology:true,
        
    });
    console.log("successfully connected with mongoose");
          
    }catch(err){
        throw (err);
    }
  }

// middleware
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/pin',pin);
app.use('/user',user);

const PORT = process.env.PORT||4040;
app.listen(PORT,(err)=>
{   connection();
    if(err) console.log("error in settling of server !");
    else console.log("server is connected !!!!");
})