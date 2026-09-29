/* 

✅✅✅1. What is Better Auth?  -https://better-auth.com/
Better Auth is an authentication framework for TypeScript/JavaScript/Next.js applications.

It can handle things such as:
👤 User registration
🔑 Login/logout
🔒 Sessions
🍪 Cookies
🔐 Password hashing
🌐 Social login such as Google/GitHub
🛡️ Protecting authenticated pages and APIs


✅Instead of manually building:

Register
   ↓
Hash password
   ↓
Store user
   ↓
Login
   ↓
Create session
   ↓
Set cookie
   ↓
Check session
   ↓
Logout


Better Auth provides many of these pieces for you.


✅✅2.How it fits into a Next.js app

A simplified structure looks like:
Next.js Application
        │
        ↓
   Better Auth
        │
   ┌────┴────┐
   ↓         ↓
Database   Session
   │         │
   ↓         ↓
Users     Logged-in user




For example:
User
 ↓
/login
 ↓
Better Auth
 ↓
Check email + password
 ↓
Create session
 ↓
Cookie
 ↓
User is authenticated




Then, on a protected page:
/dashboard
     ↓
Check session
     ↓
Session exists?
   ↙       ↘
 Yes        No
  ↓          ↓
Dashboard   Login



✅✅✅3.How do you use it?
For a Next.js + TypeScript project, the learning process is roughly:

1. Install Better Auth
        ↓
2. Create authentication configuration
        ↓
3. Connect a database
        ↓
4. Create the Better Auth API handler
        ↓
5. Create Register/Login UI
        ↓
6. Check the user's session
        ↓
7. Protect pages
        ↓
8. Add Logout




A very simplified conceptual example:
const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
});

Then your application communicates with the authentication system rather than implementing 
password/session handling from scratch.






✅✅✅4.Project Setup /Install betterAuth

✅✅Install and configure
	-go to https://better-auth.com/docs/installation

	➡️step-1:Install the Package
	-copy : npm install better-auth
	-paste to project directory

	➡️step-2:Set Environment Variables
	-now create a .env file into the project
	-go to site and Generate a secret key
	-copy : BETTER_AUTH_SECRET=mJe44axqSVrGTZLd7NHiu8ReuD2DbLLG
	-paste to .env file

	-again go and copy the base 
         url : BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app
	-paste to .env file

	➡️step-3:Create A Better Auth Instance
	-now create folder lib (outside of the app) and 
	-create a auth.ts file inside the lib 
	-go to site and copy this:
		import { betterAuth } from "better-auth";
		export const auth = betterAuth({
 			 //...
		});

	-paste to auth.ts

	➡️step-4:Configure Database
	-go to : https://better-auth.com/docs/adapters/mongo
	-first install mongodb (only one time for new vscode)
	-npm install mongodb
	
	-now copy: npm install @better-auth/mongo-adapter 
	-and paste to terminal

	-again copy the full Example Usage(auth.ts) and
	-replace the code inside the previous auth.ts file with this
	
	=>auth.ts
	import { betterAuth } from "better-auth";
	import { MongoClient } from "mongodb";
	import { mongodbAdapter } from "better-auth/adapters/mongodb";
	const client = new MongoClient("mongodb://localhost:27017/database");
	const db = client.db();
    
	export const auth = betterAuth({
  		database: mongodbAdapter(db, {
    			client
  		}),
	});



	➡️step-5:Connect Mongodb
    
	-go to Mongodb atlas : https://www.mongodb.com/products/platform
	-sign up/sign in with email

	-go to homepage/all project
	https://cloud.mongodb.com/v2#/org/6a06db01f7b3680fb6e16322/projects
	-create a new project - give a project name and go next
	
	-create a new cluster - 
	-choose : free plan
	-provider : aws
	-region : Virginia/anywhere
	
	-click deployment
	-copy the username: raju204116_db_user (new for every new cluster)
	-and password : wyy7dPB4bvIggkvn  
	-save to anywhere : best case (save them in .env file)

	-then click choose a connection method 
	-click Drivers and client Libraries
	-select :Language: Js   Client Library: Node.js Driver

	-copy the uri :mongodb +srv://raju204116_db_user:<db_password>@cluster0.djr5f2c.mongodb.net/?appName=Cluster0

	-paste to .env file with a variable and change the password
	-Like this :MONGODB_URI = mongodb +srv://raju204116_db_user:wyy7dPB4bvIggkvn@cluster0.djr5f2c.mongodb.net/?appName=Cluster0
   	
	-click done


	➡️step-6 : replace the auth url
	-go to auth.ts
	-change this : 
	const client = new MongoClient("mongodb://localhost:27017/database");

	-with this : 
	const client = new MongoClient(process.env.MONGODB_URI!);


######## NB ###########
	1.-(If you see the uri again, go to clusters,click on Connect and
	you will see the interface again)
	
	2.-If you forgot the usename and password for this cluster:
		Go to your MongoDB Atlas project.
		In the left sidebar, go to Security → Database & Network Access (the exact menu wording can vary).
		Open the Database Users tab.
		You'll see the username you created.

		For security, MongoDB Atlas does not show you the existing password.
		If you forgot it, you can edit the database user and set a new password.


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