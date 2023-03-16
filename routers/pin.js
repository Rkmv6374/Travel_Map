import express from 'express';
import {pinLocation} from '../models/pin.js';
const router = express.Router();


// create the pinlocation
router.post('/location',async(req, res)=>
{
    
    console.log(req.body);
     
 
    try{
        // const [name,title,desc,rating,lat,long] = req.body;
        const getusername = await pinLocation.find({name:req.body.name});
        if(getusername)
        {
          const update = { $push: { about: { name:req.body.name,title:req.body.title,desc:req.body.desc,rating:req.body.rating,lat:req.body.lat,long:req.body.long } } };
          const options = { upsert: true, returnOriginal: false };
          const result = await pinLocation.findOneAndUpdate(req.body.name, update, options);
          console.log(result);
          res.status(200).json(result);
        }
        else {
        const data = new pinLocation (req.body);
        // data -> name se find
         const save_data = await data.save();
         console.log(save_data);
         res.status(200).json(save_data);}
         

    }catch(err)
    {   
        res.status(500).json(err);
    }
});

//get the pin location
 
router.get('/getLocation',async(req, res)=>
{
    try
    { 
        const all = await pinLocation.find();
        res.status(200).json(all);
         
    }catch(err)
    {
        res.status(500).json(err);
    }
});

 export default router;  