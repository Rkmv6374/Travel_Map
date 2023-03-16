import  mongoose from  'mongoose';

export const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            min:3,
            max:20,
            required:true,
            
        },
        email:
        { 
            type:String,
            max:50,
            required:true,
            unique:true,
            // default:'xyz@gmail.com',
        },
        password:
        {
            type:String,
            min:5,max:20,
            required:true 
        }
    },{timestamps:true}
);
// userSchema.index({ email: 1 }, { unique: false }); 

export const identity = mongoose.model('identities',userSchema);

