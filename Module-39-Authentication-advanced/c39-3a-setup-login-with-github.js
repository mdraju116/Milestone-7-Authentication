/* 
✅✅Go to : https://better-auth.com/docs/authentication/github

✅Step-1 :Get your GitHub credentials

    ➡️substep-1:
        -click on the underlined link :  GitHub Developer Portal.
        -redirected to : https://github.com/settings/developers 
        -click on : newAuthApp
        -Register a new OAuth app
            -Application name : NextJsBetterAuth
            -Homepage URL : http://localhost:3000/
            -Redirect URI : http://localhost:3000/api/auth/callback/github
            NB: After deploy in vercel add a new redirect URI like this,  otherwise the login with github will not work
            -
            -Allow wildcard matching
        -click on Register Applicaton


    ➡️substep-2:
        -Now  copy the Client Id : 
        -and paste to .env file as : Github_xxxxxxxxx _ID = (github push problem) xxx=CLIENT
                
        -generate new client secret id
        -then copy the secret key : 
        -and paste to .env file as :  Github_xxxxxxxxx_SECRET=

        -click Update Application

        -You can close the console now


✅Step-2 :Configure the provider
        -copy this : 
                github: { 
                    clientId: process.env.GITHUB_CLIENT_ID as string, 
                    clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
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
        <Button onClick={handleGithubSignIn}>Sign In with Github</Button>
        
    -Create a handler under onSubmit() and 
    -copy the signIn function from better auth and paste to the handler

    //github sign In
     const handleGithubSignIn =async()=>{
        const resData =await signIn.social({
            provider : "github"
        })
        console.log("After Github sign in", resData)
     }


    -okay -ready to use



⚠️⚠️NB: 
Github jei Email diye signup ache, Same Email diye ei site e age Login kora thakle,
connection error dekhabe, seikhetre database theke user ke delete kore abar try korte hobe.









*/