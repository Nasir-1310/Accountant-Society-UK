"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import SearchBar from "./SearchBar";

const Menu=()=>{

    const [open,setOpen]=useState(false);

    return(
        <div className="">
            <Image src="/menu.png" alt="menu icon" width={28} height={28} className="cursor-pointer" onClick={()=>setOpen((prev)=>!prev)}/>
            {
                open && (
                    <div className="absolute bg-black text-white left-0 top-20 w-1/2 h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 z-10">
                        <Link href="/">Home</Link>
                        {/* <SearchBar></SearchBar> */}
                        <Link href="/search" className="flex text-black items-center gap-2 bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition">
                            <Image src="/search.png" alt="Search Icon" width={16} height={16} />
                            <p className="text-sm font-medium">Find an Accountant</p>
                        </Link>
                        <Link href="/">Find an Accountant</Link>
                        <Link href="/">Contact us</Link>
                        <Link href="/">About us</Link>
                        <Link href="/">Sign in</Link>

                    </div>
                )
            }
        </div>
    )
}
export default Menu;