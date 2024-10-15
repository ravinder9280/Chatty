"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import cimg from "@/public/logo.jpg";
import { useState, useEffect } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const page = () => {
  const{data:session}=useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
  
    setProvider();
  }, []);
  console.log(session?.user);
  
  return (
    <nav className="flex nav p-4 sticky top-0 items-center mb-8 justify-between">
      <Link href="/" className="p-2 hover:bg-gray-300  hover:rounded-2xl">
       

        <p className=" text-3xl font-extrabold text-green-500">Chatty</p>
      </Link>
      <div className="flex gap-4">
        <Link
          href="/create-prompt"
          className="bg-black text-white hover:bg-gray-700 rounded-full p-2 px-4"
        >
          Create Post
        </Link>
        {session?.user ? (
          <div className="flex gap-4">

          <button onClick={()=>{
            signOut();
          }} className="border text-red-500 text-xs hover:bg-gray-300 border-red-500 rounded-full p-2 px-4">
            Sign Out
          </button>
          <Link href='/profile'>
          <Image
          alt="user"
          className=" cursor-pointer hover:border-cyan-700 border-2 border-graynpm run dev-500 rounded-3xl  "
          
          src={session?.user.image}
          width={40}
          height={40}
          />
          </Link>
            
          
            </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="border border-black hover:bg-gray-300  rounded-full p-2 px-4"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default page;
