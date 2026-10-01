/* 
✅✅Go to : https://better-auth.com/docs/authentication/discord

✅Step-1 :Get your Discord credentials

    ➡️substep-1:
        -click on the underlined link :   Discord Developer Portal.
        -redirected to : https://discord.com/developers/applications
        -click on : New Application
            -Name : NextJsBetterAuth
            -Create

    ➡️substep-2:
        -Now  copy the Application ID : 
        -and paste to .env file as : DISCORD_CLIENT_ID = 
                
        -then copy the Public Key key : 
        -and paste to .env file as :  DISCORD_CLIENT_SECRET =

    ➡️substep-2: 
        -go to Oauth2 : https://discord.com/developers/applications/1555171401772572785/oauth2
        -Redirects :Add Redirect URI
        -copy this from better auth site :http://localhost:3000/api/auth/callback/discord
        -and paste here
        -save changes

        -okay
        -You can close the console now


✅Step-2 :Configure the provider
        -copy this : 
                  discord: { 
                    clientId: process.env.DISCORD_CLIENT_ID as string, 
                    clientSecret: process.env.DISCORD_CLIENT_SECRET as string, 
                },
              
        -and paste to lib/auth.ts file like this:
                export const auth = betterAuth({
                emailAndPassword: {
                    enabled: true,
                },
                socialProviders: {
                    google: {
                    clientId: process.env.GOOGLE_xxxxxxxxx_ID as string,
                    clientSecret: process.env.GOOGLE_xxxxxxxxx_SECRET as string,
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

        -now replace the client id and secret key (if you had changed the name in .env file)
        
        
        -Now Set trustedProviders :
         account: {
            accountLinking: {
                enabled: true,
                trustedProviders: ["google", "github"], // Add providers you trust
            },
        },

         


✅Step-3 :Usage =>Sign In with GitHub
    -go to sign-in/page.tsx
    -Create a Button  : 
        <Button onClick={handleDiscordSignIn}>Sign In with Discord</Button>
        
    -Create a handler under onSubmit() and 
    -copy the signIn function from better auth and paste to the handler

    //discord sign In
     const handleDiscordSignIn =async()=>{
        const resData =await signIn.social({
            provider : "discord"
        })
        console.log("After Github sign in", resData)
     }


    -okay -ready to use



⚠️⚠️NB: 
Discord jei Email diye signup ache, Same Email diye ei site e age Login kora thakle,
connection error dekhabe, seikhetre database theke user ke delete kore abar try korte hobe.









*/