# Blog Management System

## Overview
This project is a backend application for a **Blog Management System** that supports two roles: **Admin** and **User**. It allows users to create, update, and delete their blogs while providing admins with tools to manage users and their blogs. The platform ensures secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

---

## Features

### User Roles
- **Admin**:
  - Can block users and delete any blog.
  - Cannot create or update blogs.
- **User**:
  - Can register, log in, and manage their own blogs (create, update, delete).
  - Cannot perform admin-specific actions.

### Authentication & Authorization
- JWT-based authentication to secure operations.
- Role-based access control to differentiate between Admin and User permissions.

### Blog API
- Public access to blogs with the following features:
  - **Search**: Find blogs by title or content.
  - **Sort**: Sort blogs by creation date or title.
  - **Filter**: Filter blogs by author.

### Error Handling
- Comprehensive error management for various scenarios such as validation errors, authentication failures, and unexpected server issues.
- Standardized error response format for consistent communication.

---

## Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

---

## Models

### User Model
- `name`: Full name of the user.
- `email`: Unique email for authentication.
- `password`: Securely hashed password.
- `role`: User role (`admin` or `user`).
- `isBlocked`: Indicates if a user is blocked (default: `false`).
- `createdAt` and `updatedAt`: Timestamps for creation and updates.

### Blog Model
- `title`: Blog title.
- `content`: Blog content.
- `author`: Reference to the `User` model.
- `isPublished`: Indicates publication status (default: `true`).
- `createdAt` and `updatedAt`: Timestamps for creation and updates.

---

## API Endpoints

### Authentication
1. **Register User**:
   - `POST /api/auth/register`: Registers a new user.
2. **Login User**:
   - `POST /api/auth/login`: Logs in a user and provides a JWT.

### Blog Management
1. **Create Blog**:
   - `POST /api/blogs`: Creates a blog (requires login).
2. **Update Blog**:
   - `PATCH /api/blogs/:id`: Updates a user's blog.
3. **Delete Blog**:
   - `DELETE /api/blogs/:id`: Deletes a user's blog.
4. **Get All Blogs (Public)**:
   - `GET /api/blogs`: Fetches all blogs with search, sort, and filter options.

### Admin Actions
1. **Block User**:
   - `PATCH /api/admin/users/:userId/block`: Blocks a user.
2. **Delete Blog**:
   - `DELETE /api/admin/blogs/:id`: Deletes any blog.

---

## Error Response Format
```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,
  "error": {
    "details": "Additional error details, if applicable"
  },
  "stack": "Error stack trace, if available"
}
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rafizul896/blog-server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd blog-server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NODE_ENV=development
     PORT=5000
     DATABASE_URI=<your-mongodb-uri>
     JWT_ACCESS_SECRET=<your-secret-key>
     ```

5. Start the server:
   ```bash
   npm run start:dev
   ```

---
