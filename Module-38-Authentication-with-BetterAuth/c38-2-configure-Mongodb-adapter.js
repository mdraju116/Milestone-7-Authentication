/* 
=>see-38-1b : project setup (for full process )


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
	const client = new MongoClient								("mongodb://localhost:27017/database");
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



*/