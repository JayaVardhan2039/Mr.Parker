# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## Request Body
The request body should be a JSON object containing the following fields:
- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 5 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "Jaya",
    "lastname": "Vardhan"
  },
  "email": "jaya.vardhan@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Response Body**: A JSON object containing the authentication token and user details.

Example:
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "Jaya",
      "lastname": "Vardhan"
    },
    "email": "jaya.vardhan@example.com"
  }
}
```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing an array of validation error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 5 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint is used to log in an existing user. It requires the user's email and password.

## Request Body
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 5 characters long.

Example:
```json
{
  "email": "jaya.vardhan@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the authentication token and user details.

Example:
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "Jaya",
      "lastname": "Vardhan"
    },
    "email": "jaya.vardhan@example.com"
  }
}
```

### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing an array of validation error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 5 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Invalid Email or Password"
}
```

### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

# User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
This endpoint is used to retrieve the profile of the authenticated user.

## Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the user details.

Example:
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "Jaya",
    "lastname": "Vardhan"
  },
  "email": "jaya.vardhan@example.com"
}
```

### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Unauthorized"
}
```

### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

# User Logout Endpoint

## Endpoint
`GET /users/logout`

## Description
This endpoint is used to log out the authenticated user.

## Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing a success message.

Example:
```json
{
  "message": "Successfully logged out"
}
```

### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Unauthorized"
}
```

### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}

