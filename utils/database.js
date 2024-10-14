import mongoose from 'mongoose'
let isConnected=false;


export const connectDB=async()=>{

    if(isConnected){
        console.log("MONGODB Already Connected");
        return;
        
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
           dbName:"chatty",
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
    })
    isConnected=true;
    console.log("MONGODB CONNECTED");
    

}
catch(e){
    console.error(`Error connecting to MongoDB: ${e.message}`);
    process.exit(1);
}

}