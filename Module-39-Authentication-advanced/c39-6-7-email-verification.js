/* 

✅✅-Go to : https://better-auth.com/docs/authentication/email-password
-Just see the docs : Email verification


⚠️⚠️NB:
As it is an testing/local domain, not real. So the verification mail will only send to the account(md980) 
which is signed-in at the https://resend.com/onboarding . Any ohter email will not receive the verificatoin mail.

-So create account with that email(md980) only

-To send email at others gmail, first provide the actual domain (paid).



✅✅-Go to : https://resend.com/docs/send-with-better-auth
-Follow the steps:

➡️Step-1.Install the Resend SDK:
npm install resend

➡️Step-2.Add your API key to the environment:
-Sign-in to resend.com and create an Api key
-https://resend.com/onboarding

-Click on : Add  API key  
    Created: (re_xxxxxxxxx)
-copy the key and 
-paste to .env file as : RESEND_API_KEY=re_xxxxxxxxx


➡️Step-3:Send password reset and verification emails
-again go to : https://resend.com/docs/send-with-better-auth
-copy the verification code 
-and paste to auth.ts file
-then modify it like this: (full code at the bottom)
    -change the from to email
    -add an : requireEmailVerification:true to previous function

=auth.ts (full code at the bottom)
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        html: `
        <h1>Please verify your email address.</h1>
        <p>
          Click <a href="${url}">here</a> to verify your email.
        </p>
      `,
      });
    },
  }

➡️Step-4:Set Expire time
    -go to: https://better-auth.com/docs/reference/options
    -copy this from emailVerification:
        sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600 // 1 hour

    -and paste at the end of the email verification





############################### ✅✅✅=>Full auth.ts (modified wiht gpt) #####################################

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db('1st-db');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // console.log(" Verification URL:", url); //will see at server console
      // console.log(" Sending to:", user.email);

      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        html: `
        <h1>Please verify your email address.</h1>
        <p>
          Click <a href="${url}">here</a> to verify your email.
        </p>
      `,
      });

      console.log("RESEND DATA:", data); //will see at server console
      console.log("RESEND ERROR:", error);
    },

    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 7 * 24 * 3600,
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "discord"], // Add providers you trust
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



*/