
"use client"

import Image from "next/image";
import logo from "@/public/logo.webp"
import Link from "next/link";
import UserInfo from "./UserInfo";
import { Spinner } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" })
    
     const {  isPending } = useSession();
        if (isPending) {
            return <div className="flex flex-col items-center gap-2">
                <Spinner color="success" />
                <span className="text-xs text-muted">Loading...</span>
            </div>
        }
    

    return (
        <header >
            <Link href="/" >

                <div className="px-24 flex justify-between items-center mt-2">

                    <div className="flex gap-3 mx-auto pl-50 ">
                        <Image src={logo} alt="logo" height={40} width={50} style={{ width: 'auto', height: 'auto' }} />

                        <div className="space-y-1">
                            <h1 className="text-red-700 font-bold text-2xl ">Bangla News 24</h1>
                            <p className="text-gray-600 text-xs">{date}</p>
                        </div>
                    </div>


                    {/* signup-signin-signout */}
                    <div className="flex gap-2">

                        <UserInfo/>

                    </div>
                </div>
                
            </Link>

        </header>


    );
};

export default Header;