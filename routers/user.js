import express from 'express';
import {identity} from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// create user
router.post('/register',async(req, res)=>
{
    const data = req.body;
    try{
         if(!req.body.password || !req.body.name || !req.body.email) res.status(500).json({"message":"fill the data properly"});
         else
         {const salt = await bcrypt.genSalt(10);
         const hashpasword = await bcrypt.hash(req.body.password,salt);
         const user1 = new identity({
                   name:req.body.name,
                   email:req.body.email,
                   password:hashpasword
         })
         const save_data = await user1.save();
         res.status(200).json(save_data);}

    }catch(err)
    {   console.log(err);
        res.status(500).json(err);
    }
});

// get all the user
router.post('/login',async(req, res)=>
{
    //   if(!req.body.name || ! req.body.password) res.status(500).json({"message":"fill the data properly"});
    try{
         const user_data = await identity.findOne({name:req.body.name});
         
         if(!user_data) { return res.status(400).json("Wrong username or password");} 
         const matched = await bcrypt.compare(req.body.password,user_data.password);
         if(!matched) return res.status(400).json("Wrong username or password");
         res.status(200).json({ _id: user_data._id, username: user_data.username });
         

    }catch(err)
    {
        res.status(500).json(err);
    }
});


export default router;


