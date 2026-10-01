/* 
{/ to protect visiting /profile while it is still invisible/not logged in - use proxy.ts /}

=>Go to : https://better-auth.com/docs/integrations/next
-copy the code of Next.js 16+ (Proxy)
-create a file (proxy.ts) at the root -outside of app 
-paste the code
-add/remove the urls at the bottom


=>proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile"], // Specify the routes the middleware applies to
};




*/