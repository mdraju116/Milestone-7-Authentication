
/* 
🔐 Authentication
✅✅✅1.What is Authentication?
Authentication is the process of verifying the identity of a user or system.

In simple words:
Authentication answers: “Who are you?”

For example, when you log in to Facebook:
Email/Phone + Password
          ↓
     Server checks
          ↓
   Is this really you?
      ↙         ↘
    Yes          No
     ↓            ↓
  Login       Login failed

So, logging in is a common example of authentication.



✅✅✅2.Why do we need Authentication?
Authentication is mainly needed to identify users and protect user-specific resources.

1. 🔒 Protect private information
Suppose you have a banking website:

Your account
Your balance
Your transactions

Only you should be able to access these.
Authentication helps the system identify you before giving access.

2. 👤 Identify different users
Imagine an e-commerce website with:

Raju's account
Karim's account
Rahim's account

After authentication, the server knows:
This request → Raju
So it can show Raju's orders, profile, cart, etc.



3. 🚪 Protect restricted areas
For example:
Public Home Page
       ↓
   Login required
       ↓
Dashboard

Without authentication, anyone could potentially access the dashboard.


4. 🛡️ Protect APIs and backend resources
For example:
GET /api/my-profile

The server needs to know:

"Which user is requesting this data?"
Authentication provides that identity.



✅✅✅3.Types of Authentication
There are several ways to authenticate a user.


✅1. 🔐 Password-based Authentication
The most common type.

Email + Password
       ↓
     Login
       ↓
   Authenticated

Example:
Email: raju@gmail.com
Password: ********


✅2. 📱 OTP Authentication
The system sends a One-Time Password (OTP) to your phone or email.
Enter phone number
       ↓
Receive OTP: 582931
       ↓
Enter OTP
       ↓
Authenticated


✅3. 🌐 OAuth / Social Login
You use an existing account to log in to another application.

For example:
"Continue with Google"
"Continue with GitHub"
"Continue with Facebook"

Instead of creating another password, the external provider helps verify your identity.


✅4. 🔑 Passkey / Biometric Authentication

Modern authentication can use:
Fingerprint
Face recognition
Device PIN
Passkey

For example:
Open website
     ↓
Use fingerprint
     ↓
Identity verified
     ↓
Login


✅5. 🎫 Token-based Authentication
After successful login, the server gives the client a token.
Simplified flow:

Login
  ↓
Server verifies credentials
  ↓
Token generated
  ↓
Client stores token
  ↓
Client sends token with requests
  ↓
Server verifies token

JWT (JSON Web Token) is a common example.


✅6. 🍪 Session-based Authentication
The server creates a session after login.

Login
  ↓
Server creates session
  ↓
Session ID stored in cookie
  ↓
Browser sends cookie
  ↓
Server identifies the user

This is another very common approach for web applications.



✅✅4.Authentication vs Authorization

This is very important when learning authentication.

|                | Authentication   | Authorization                   |
| -------------- | ---------------- | ------------------------------- |
| Main question  | **Who are you?** | **What are you allowed to do?** |
| Example        | Login            | Access admin dashboard          |
| Happens first? | ✅ Yes            | Usually after authentication    |
| Example        | Email + password | Admin/user permissions          |




*/