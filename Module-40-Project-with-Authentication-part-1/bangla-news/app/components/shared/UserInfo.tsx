"use client"

import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { Spinner } from "@heroui/react";


const UserInfo = () => {


    const { data: session, isPending } = useSession();
    if (isPending) {
        return <div className="flex flex-col items-center gap-2">
            <Spinner color="success" />
            <span className="text-xs text-muted">Loading...</span>
        </div>
    }
    // console.log(session);


    return (
        <div>

            {/* //implement sign-out function */}
            {
                session?.user ? <>

                    <div className="flex flex-col items-center">
                        <Link href={"/profile-info"}>
                            {session.user.image && <Image src={session.user.image} alt="User's Image"
                                width={40} height={40} className="rounded-full object-cover"
                            />}
                            <span>{session.user.name}</span>
                        </Link>
                        <button onClick={() => { signOut() }} className="btn bg-red-700 text-white" > সাইন আউট </button>

                    </div>


                </> : <>
                    <Link href={"/sign-in"}> <button className="btn ">সাইন ইন</button> </Link>
                    <Link href={"/sign-up"}> <button className="btn bg-red-700 text-white">সাইন আপ</button></Link>

                </>

            }


        </div >
    );
};

export default UserInfo;