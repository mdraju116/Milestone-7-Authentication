/* 
✅✅Go to : https://better-auth.com/docs/authentication/google



✅Step-1 :Get your Google credentials
    ➡️substep-1:
        -click on the underlined link :  Google Cloud Console.  
        -redirected to : https://console.cloud.google.com/   
        -select account (on chrome :md9700, on Brave: md980)
        -Create a new project 
            -Project name : nextjs-better-auth
            -Parent resource : No organization
            -create
    ➡️substep-2:
        -Now select the created project
        -Then click on  APIs & Services → Credentials (left side bar) :https://console.cloud.google.com/apis/credentials
        -Click Create Credentials → OAuth client ID
        -redirected to => Create OAuth client ID  
        -click Configure concent screen => Get Started
            -App Information
                -App name : Nextjs-BetterAuth
                -User support email:mdrajuahmmed9700@gmail.com
            -Next-
                -Audience =>External
            -Next
                -Contact Information =>Email addresses :raju204116@gmail.com
            -Next 
                -Finish =>I agree...
            -Create
    ➡️substep-3:
            -redirected to : Create OAuth client ID
                -Application type =>Web Application
                -Name =>BetterAuth
                -Authorized redirect URIs
                    -Add URI : 
                        -copy this : http://localhost:3000/api/auth/callback/google  from better auth site(https://better-auth.com/docs/authentication/google)
                        -and paste here

                         NB: After deploy in vercel add a new redirect URI like this,  otherwise the login with google will not work
                        -simply go to console page/clients/add redirect URI/save
                        -https://bangla-news-one.vercel.app/api/auth/callback/google

                -Create

                -Now  copy the Client Id : 
                -and paste to .env file as : GOOGLE_xxxxxxxxx _ID = (github push problem) xxx=CLIENT
                
                -again copy the secret key : 
                -and paste to .env file as : GOOGLE_xxxxxxxxx_SECRET=

                -click ok

                -You can close the console now

    

✅Step-2 :Configure the provider
        -copy this : 
                socialProviders: {
                    google: { 
                        clientId: process.env.GOOGLE_xxxxxxxxx_ID as string, 
                        clientSecret: process.env.GOOGLE_xxxxxxxxx_SECRET as string, 
                    },
                },
        -
        -and paste to lib/auth.ts file like this: (also add trustproviders)
                export const auth = betterAuth({
                emailAndPassword: {
                    enabled: true,
                },
                
                //- Set trustedProviders :
                account: {
                    accountLinking: {
                        enabled: true,
                        trustedProviders: ["google", "github"], // Add providers you trust
                    },
                },
                socialProviders: {
                    google: {
                    clientId: process.env.GOOGLE_xxxxxxxxx_ID as string,
                    clientSecret: process.env.GOOGLE_xxxxxxxxx_SECRET as string,
                    },
                },

                
                    database: mongodbAdapter(db, {
                    // Optional: if you don't provide a client, database transactions won't be enabled.
                    client
                    }),
                });

         -now replace the client id and secret key (if you had changed the name in .env file)

        
      



✅Step-3 :Usage =>Sign In with Google
    -go to sign-in/page.tsx
    -Create a Button  : 
        <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
        
    -Create a handler under onSubmit() and 
    -copy the signIn function from better auth and paste to the handler

    //google sign In
     const handleGoogleSignIn =async()=>{
        const resData =await signIn.social({
            provider : "google"
        })
        console.log("After google sign in", resData)
     }


    -okay -ready to use




*/