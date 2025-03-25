# Movie Hub API

A RESTful API for managing movies with features like image upload, user authentication, and advanced querying.

## Features

- 🎬 Movie Management (CRUD operations)
- 🔐 User Authentication with JWT
- 📸 Image Upload with Cloudinary
- 🔍 Advanced Querying and Filtering
- 🎯 Pagination
- 🔒 Protected Routes
- 📝 Input Validation

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- Cloudinary for Image Storage
- Multer for File Upload

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary Account
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5700
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-hub.git
cd movie-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create and configure your `.env` file with the required environment variables.

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Movies
- `GET /api/v1/movies` - Get all movies
- `GET /api/v1/movies/:id` - Get a specific movie
- `POST /api/v1/movies` - Create a new movie
- `PUT /api/v1/movies/:id` - Update a movie
- `DELETE /api/v1/movies/:id` - Delete a movie

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

## Request Examples

### Create a Movie
```http
POST /api/v1/movies
Content-Type: multipart/form-data

title: The Matrix
publishYear: 1999
poster: [image_file]
```

### Register a User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- File upload errors
- Database errors
