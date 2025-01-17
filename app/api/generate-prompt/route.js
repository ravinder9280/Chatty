import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

export const POST= async(request)=>{
    try {
        
        const { prompt} = await request.json();
        if(!prompt){
        return new NextResponse(JSON.stringify({message:"prompt is Required",success:false}))


        }
    
    
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt);
        
        console.log(result.response.text());
                return new NextResponse(JSON.stringify({message:"Prompt Generated Successfully",success:true,data:result.response.text()}))
    } catch (error) {
        return new NextResponse(JSON.stringify({message:error.message,success:false}))

        
    }
    
}