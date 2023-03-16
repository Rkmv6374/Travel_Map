import  mongoose from  'mongoose';

const pinSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            require:true,
        },
        about:[{title:
        {
            type:String,
            require:true, 
            min:2,
            max:30
        },
         
        desc:
        {
            type:String,
            require:true,
            min:3
        },
        rating:
        {
            type:Number,
            require:true,
            min:0,
            max:5
        },
        lat:
        {
            type:Number,
            require:true
        },
        long:
        {
            type:Number,
            require:true
        }}]


    },{timestamps:true}
);

export  const pinLocation = mongoose.model('pinLocations',pinSchema);
