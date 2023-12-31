
# Socio-App
MERN Stack


# Project Type: MERN Social Media App with Real-time Chatting

## Description:
This project is a full-stack social media application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) and real-time chatting functionality implemented using Socket.IO. The app allows users to register, create profiles, post updates, like posts, and engage in real-time chat conversations with others.


## Features:

1. User Authentication:
   - User registration and login functionality using email and password authentication.
   - Password hashing and salting for secure storage.
   - JWT for user session management and authentication middleware for protected routes.
   - Registration form data handling and validation using Formik and Yup.

2. User Profiles:
   - User profiles with customizable information such as profile picture, bio, occupation, location, firends,etc..
   - Ability to update and view user profiles.
   - Dynamic friend list showing profiles about friends.

3. Post Creation and Interaction:
   - Create, edit, and delete posts with rich text formatting options.
   - Like/unlike posts.
   - View posts from other users in a news feed format.

4. Real-time Chatting:
   - Real-time chat functionality using Socket.IO.
   - Users can create private chat rooms and engage in one-on-one conversations.
   - Real-time Online/Offline information about user.

   ![Screenshot (9)](https://github.com/pradysriv02/Socio-App/assets/116811317/bc92226d-724f-4ab0-a762-bc64e9fd6048)


5.Mode:
   - You can toggle between both dark and light mode as per your comfort.

   - ![Screenshot (8)](https://github.com/pradysriv02/Socio-App/assets/116811317/433c41db-0021-4725-b0ac-0e5c9c9767de)



## Tech Stack:

- **MongoDB**: Used for storing all the necessary info. MongoDB cloud storage Atlas.
- **Express.js**: Backend developed using Express.js framework.
- **React.js**: UI Interface made using React.js.
- **Node.js**: Used for executing javascript code on server-side.
- **Socket.IO**: Used for real-time, bidirectional communication between clients and servers.

## Installation:

1. Clone the repository:
   ```
   git clone https://github.com/pradysriv02/Socio-App.git
   ```

2. Install the dependencies:
   ```
   cd your-repo
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     - `MONGODB_URI`: MongoDB connection string.
     - `JWT_SECRET`: Secret key for JSON Web Tokens.

4. Run the application:
   ```
   npm start: For client side rendering
   node index.js : For server side javascript
   /socket, then node index.js: To run socket.IO server
   ```
   
## Acknowledgements:
- [Socket.IO Documentation](https://socket.io/docs/)
- [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)
- [React.js Documentation](https://reactjs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
