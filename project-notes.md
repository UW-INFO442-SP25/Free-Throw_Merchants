# Project Requirements & Local Running Notes

## Running The Project Locally

🖥️ Running the Project Locally

Follow the steps below to run the fullstack FoodSaver application on your local machine:

📦 Prerequisites

Node.js (v16 or later)

npm (comes with Node.js)

Firebase project (already configured in firebaseConfig.js)

💠 Installation Steps

Clone the repository:

git clone https://github.com/YOUR-ORG/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

Install dependencies for the client and server:

# In the root folder
cd client
npm install

cd ../server
npm install

Set up Firebase (if needed):

Ensure your client/firebaseConfig.js and server/config/firebaseAdmin.js are correctly configured.

You should have a serviceAccountKey.json in server/config/.

Start the development servers:

In two terminals (or use concurrently):

# Terminal 1 - start the server
cd server
npm run dev

# Terminal 2 - start the React client
cd client
npm run dev

The client will typically run at http://localhost:5173The server will run at http://localhost:3000

🚨 Notes

Make sure your Firebase Realtime Database and Firebase Auth are active

If using protected API routes, ensure valid Firebase Auth tokens are passed in headers

Routes like /dashboard and /profile require users to be authenticated


# Testing Protocol

## 🔑 Feature: Login (Consumer & Business)
- **How to Test**: Use existing test accounts from Firebase Auth to log in
- **Expected Result**: Redirect to `/profile` or `/dashboard` based on userType
- **Known Bugs**: Gives a message but no redirection, due to time constraints I left this as a last thing to do and did not get to it. Click ok and you should be able to access the dashboard or profile page depending how you logged in

## 🔑 Feature: Add Donation (Business)
- **How to Test**: Log in as business → click Add Donation → fill form
- **Expected Result**: Item appears on dashboard
- **Known Bugs**: Image preview shows but will not display the image itself (we did not set this up properly so it save a refrence to the images on the database but not the image itself). Also editing the listing has not been implmented nor archieving it 

## 🔑 Feature: View Listings (Public)
- **How to Test**: Go to `/donation-listings` without logging in
- **Expected Result**: See all posted donations, sorted chronologically
- **Known Bugs**: Images for the listings are not shown. Detailed viewed and claiming was not implemented 


⚠️ Implementation Notes
While we aimed to implement all core features, there were a few that we were not able to complete due to technical challenges. This project was our first time combining React with a backend server using Firebase, which introduced complexities we hadn’t encountered in previous courses like INFO 441.
We encountered several unexpected roadblocks, including:
* Issues with properly configuring and accessing Firebase Realtime Database due to incorrect reference variables
* Challenges with setting up and maintaining user authentication and session management
* Debugging small bugs that had outsized impacts on the functionality and data flow
These setbacks impacted our development timeline, but we used them as learning opportunities to better understand full-stack integration, asynchronous data handling, and authentication flows.