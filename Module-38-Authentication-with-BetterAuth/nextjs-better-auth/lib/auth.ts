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
    requireEmailVerification: true,

    // c39-8
    sendResetPassword: async ({ user, url} ) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: ` <h4>Reset Password</h4>
        Click the link to reset your password: ${url}
        <p>Ignore this message, if you haven't request a  password reset.</p>`,


      });
    },
  },

  // c39-6-7
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


  // c39-1-2
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    // c39-3a
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    // c39-3b
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