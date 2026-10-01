import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db('1st-db');

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github","discord"], // Add providers you trust
		},
	},
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
     github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
      discord: { 
        clientId: process.env.DISCORD_CLIENT_ID as string, 
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string, 
      },
},
  

    database: mongodbAdapter(db, {
      // Optional: if you don't provide a client, database transactions won't be enabled.
      client
    }),
  });