/* 
=>see-38-1b : project setup (for full process )


➡️step-6 : replace the auth url
		-go to auth.ts
		-change this : 
		const client = new MongoClient("mongodb://localhost:27017/database");

		-with this : 
		const client = new MongoClient(process.env.MONGODB_URI!);



➡️step-7 : Mount Handler
	-create 3 folder and a file like this:
	-/app/api/auth/[...all]/route.ts

	-go to : https://better-auth.com/docs/installation
	-now copy this :
	import { auth } from "@/lib/auth"; // path to your auth file
	import { toNextJsHandler } from "better-auth/next-js";

	export const { POST, GET } = toNextJsHandler(auth);

	-and paste into route.ts

➡️step-8 : Create Client Instance
	-create a file inside the lib folder like this:
	-lib/auth-client.ts
	-now copy this :
	import { createAuthClient } from "better-auth/react"
	export const authClient = createAuthClient({
    		/ The base URL of the server (optional if you're using 		the same domain) /
   	   baseURL: "http://localhost:3000"
	})

	export const { signIn, signUp, useSession } = createAuthClient()
	
	-and paste to auth-client.ts



    
-Okay


*/