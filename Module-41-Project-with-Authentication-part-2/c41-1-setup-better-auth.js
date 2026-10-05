/* 
############## 6. Better Auth and Mongodb (nextjs) ####################
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

	-go to :(left side bar:databases=>mongodb)
 	 https://better-auth.com/docs/adapters/mongo
	
	-first install mongodb (only one time for new project)
	-npm install mongodb
	
	-now copy: npm install @better-auth/mongo-adapter 
	-and paste to terminal

	-again copy the full Example Usage(auth.ts) and
	-replace the code inside the previous auth.ts file with this
	
	=>auth.ts
	import { betterAuth } from "better-auth";
	import { MongoClient } from "mongodb";
	import { mongodbAdapter } from "better-auth/adapters/mongodb";
	const client = new MongoClient								("mongodb://localhost:27017/database");
	const db = client.db();
	export const auth = betterAuth({
  		database: mongodbAdapter(db, {
    			client
  		}),
	});


➡️step-5:Connect Mongodb (not Create Database Tables)

	-go to Mongodb atlas : https://www.mongodb.com/products/platform
	-sign up/sign in with email

	-go to homepage/all project
	https://cloud.mongodb.com/v2#/org/6a06db01f7b3680fb6e16322/projects
	-create a new project - give a project name and 
	-go next and click on create project
	-redirected to the overview page

	-create a new cluster - 
	-choose : free plan
	-give a cluster name (default-Cluster0)
	-provider : aws
	-region : Virginia/anywhere
	-click on Create deployment

	-copy the username: raju204116_db_user (new for every new cluster)
	-and password : wyy7dPB4bvIggkvn  
	-save to anywhere : best case (save them in .env file)

	-then click choose a connection method 
	-click Drivers and client Libraries
	-select :Language: Js   Client Library: Node.js Driver

	-copy the uri :mongodb +srv://raju204116_db_user:
	<db_password>@cluster0.djr5f2c.mongodb.net/?appName=Cluster0

	-paste to .env file with a variable and change the password
	-Like this :MONGODB_URI = mongodb +srv://raju204116_db_user:                  wyy7dPB4bvIggkvn@cluster0.djr5f2c.mongodb.net/?appName=Cluster0
   	
	-click done



	=>now replace the auth url
	-go to auth.ts
	-change this : 
      const client = new MongoClient("mongodb://localhost:27017/database");

	-with this : 
         const client = new MongoClient(process.env.MONGODB_URI!);
	
	-now give an database name: (auth.ts)
	-change : const db = client.db(); 
	-to : const db = client.db("nextjs-betterauth-db1");


       ######## NB ###########
	1.If you want to see the uri again, go to clusters,click on 		  	 Connect and you will see the interface again
	
	2.If you forgot the usename and password for this cluster:
		Go to your MongoDB Atlas project.
		In the left sidebar, go to Security → Database & Network 			Access (the exact menu wording can vary).
		Open the Database Users tab.
		You'll see the username you created.

		For security, MongoDB Atlas does not show you the existing 			password.
		If you forgot it, you can edit the database user and set a 			new password.



 ➡️step-6 : Add Authentication Methods
	-go to : https://better-auth.com/docs/installation
	-copy:
 	 emailAndPassword: { 
   		 enabled: true, 
 	 },
	
	-paste to auth.ts:
	 export const auth = betterAuth({
  		emailAndPassword: { 
    		   enabled: true, 
  		},
  		database: mongodbAdapter(db, {
    		client
  		}),
	});



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
   	   baseURL: "http://localhost:3000"
	})

	export const { signIn, signUp, useSession } = createAuthClient()
	
	-and paste to auth-client.ts

	-now replace the base url like this:
	- baseURL: process.env.BETTER_AUTH_URL

-Okay -🎉 That's it!
*/