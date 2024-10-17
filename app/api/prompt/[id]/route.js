import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";



export const GET=async (request,{params})=>{
    try {
        const prompt = await Prompt.findById(params.id)


        if (!prompt) {
            return new NextResponse(JSON.stringify({success:false,message:"Prompt not found"}))
        }
        return new NextResponse(JSON.stringify({success:true,prompt}))
        
    } catch (error) {
        
    }

}