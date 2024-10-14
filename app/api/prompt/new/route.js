import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server"
import Prompt from "@/models/prompt.js";

export const POST= async (request)=>{
    const { userId, prompt, tag } = await request.json();
    if(!prompt||!tag){
        return new NextResponse(JSON.stringify({message:"Add required fields",success:false}))
    }
    if(tag[0]!=="#"){
        return new NextResponse(JSON.stringify({message:"Add Valid Tag Start With #",success:false}))
    }

    try {
        await connectDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new NextResponse(JSON.stringify({message:"Prompt Added Successfully",success:true,newPrompt}))
    } catch (error) {
        return new NextResponse(JSON.stringify({message:error.message,success:false}))
    }
}