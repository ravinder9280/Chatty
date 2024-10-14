import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import {connectDB} from '@/utils/database.js'
import User from '@/models/user'
console.log(process.env.GOOGLE_CLIENT_ID);


const handler =NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session}){
            const sessionUser=await User.findOne({
                email:session.user.email
            })
            session.user.id=sessionUser._id.toString();
            return session;
    
        },
        async signIn({profile}){
            try { 
                await connectDB()
                const userExist= await User.findOne({
                    email:profile.email
                })
                if(!userExist){
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture,
                    })
                }
                
                    
    
                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false
              

                
            }
    
        }


    }

})

    
export {handler as GET  , handler as  POST};