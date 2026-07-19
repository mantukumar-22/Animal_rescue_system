# Animal Rescue Backend

A simple Node.js and Express backend for user authentication in the Animal Rescue application.

## Features

- User registration
- User login
- Get all user profiles
- User logout
- JWT-based authentication with cookie support

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcrypt
- cookie-parser

## Project Structure

- src/app.js - Express app setup
- src/routes/user.routes.js - User route definitions
- src/controller/user.controller.js - User logic
- src/models/user.model.js - User schema
- src/middleware/auth.middleware.js - Authentication middleware

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

Base URL:
```text
http://localhost:5000/users/v1
```

### 1. Register User

- Method: POST
- Endpoint: /register

Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "123456",
  "mobileNumber": 9876543210
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {}
}
```

### 2. Login User

- Method: POST
- Endpoint: /login

Request body:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Login Successful",
  "token": "jwt_token",
  "user": {}
}
```

### 3. Get All Profiles

- Method: GET
- Endpoint: /profiles

Requires authentication.

Response:
```json
{
  "success": true,
  "users": []
}
```

### 4. Logout User

- Method: GET
- Endpoint: /logout

Response:
```json
{
  "success": true,
  "message": "Logout Successfully"
}
```

## Notes

- The authentication token is stored in a cookie named token.
- For protected routes, send the token in the Authorization header or use the cookie-based approach.

## Future Improvements

- Add email verification
- Add password reset functionality
- Add role-based access control
- Add profile update and delete features
