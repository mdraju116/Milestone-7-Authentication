"use client"


import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { Spinner } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";



const ProfileInfoPage = () => {
    

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
             {
                session?.user ? <>

                    <div className="flex flex-col items-center">
                    
                            {session.user.image && <Image src={session.user.image} alt="User's Image"
                                width={40} height={40} className="rounded-full object-cover"
                            />}
                            <span>{session.user.name}</span>
                            <span> {session.user.email}</span>
                       
                        
                    </div>


                </> : <>
                    <p>User Not Found.</p>

                </>

            }

            <Link href={"/update-profile"}> <Button >Update Profile</Button> </Link>
            

            
        </div>
    );
};

export default ProfileInfoPage;