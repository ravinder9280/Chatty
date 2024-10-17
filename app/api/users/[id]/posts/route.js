import Prompt from "@/models/prompt.js";
import { connectDB } from "@/utils/database.js";
import { NextResponse } from "next/server";



//get prompts
export const GET = async (request, { params }) => {
    try {
        await connectDB()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 

//update prompts
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return  new NextResponse(JSON.stringify({success:false,message:"Prompt not found"}));
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return  new NextResponse(JSON.stringify({success:true,message:"Prompt Updated Successfully"}));
    } catch (error) {
        return   new NextResponse(JSON.stringify({success:false,message:error.message}));
    }
};
export const DELETE = async (request, { params }) => {
    try {
        await connectDB();

        // Find the prompt by ID and remove it
        const prompt=await Prompt.findByIdAndDelete(params.id);
        if(!prompt){
            return  new NextResponse(JSON.stringify({success:false,message:"Prompt not found"}));  // Return a 404 if prompt not found.  // If you want to return a different status code, replace this line.  // For example, if you want to return a 500 status code, you can do so with `return new NextResponse(JSON.stringify({success:false,message:error.message}), { status: 500 });`  // In this case, the error message will be returned in the response body.  // If you want to return a JSON response with the error message, you can do so with `return new NextResponse(JSON.stringify({success:false, message: error.message}), { status: 200, headers: { 'Content-Type': 'application/json' } });`  // In this case, the error message will be included in the response headers.
        }

        return  new NextResponse(JSON.stringify({success:true,message:"Prompt Deleted Successfully"}));
    } catch (error) {
        return   new NextResponse(JSON.stringify({success:false,message:error.message}));
    }
};