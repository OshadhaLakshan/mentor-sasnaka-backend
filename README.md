# Backend Repository: mentor-sasnaka-backend

## Overview
This repository contains the backend code for the Mentor Sasnaka platform. The backend provides RESTful APIs for authentication, data management, and other functionalities.

## Tech Stack
- **Framework**: Node.js with Express.js
- **Database**: MongoDB (or your chosen database)
- **Authentication**: JSON Web Tokens (JWT)
- **Hosting**: Vercel (Serverless Functions)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/OshadhaLakshan/mentor-sasnaka-backend.git
   cd mentor-sasnaka-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create an `.env` file**
   Add the following environment variables to an `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mentor-sasnaka
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server locally**
   ```bash
   npm run dev
   ```

5. **Test the APIs**
   Use a tool like Postman or curl to test the endpoints, e.g.,:
   ```bash
   curl -X POST http://localhost:3000/api/admin/login -d '{"username":"admin","password":"12345"}' -H "Content-Type: application/json"
   ```

6. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## Folder Structure
```
/src
  /controllers   # API route logic
  /routes        # Express route definitions
  /models        # Database models
  /middleware    # Custom middleware (e.g., authentication)
  /utils         # Helper functions
```

## API Endpoints
### Authentication
- `POST /api/admin/login` - Authenticate an admin user.

### Other Endpoints
- Define additional endpoints as needed.
