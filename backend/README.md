# User Endpoints Documentation

## User Registration Endpoint

### Endpoint
`POST /users/register`

### Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, password, and vehicle details.

### Request Body
The request body should be a JSON object containing the following fields:
- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 5 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of ['car', 'motorcycle', 'bicycle', 'bike'].

Example:
```json
{
  "fullname": {
    "firstname": "Jaya",
    "lastname": "Vardhan"
  },
  "email": "jaya.vardhan@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

#### Success
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
    "email": "jaya.vardhan@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Validation Errors
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

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

## User Login Endpoint

### Endpoint
`POST /users/login`

### Description
This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body
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

### Responses

#### Success
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
    "email": "jaya.vardhan@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Validation Errors
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

#### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Invalid Email or Password"
}
```

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

## User Profile Endpoint

### Endpoint
`GET /users/profile`

### Description
This endpoint is used to retrieve the profile of the authenticated user.

### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

### Responses

#### Success
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
  "email": "jaya.vardhan@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Unauthorized"
}
```

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

## User Logout Endpoint

### Endpoint
`GET /users/logout`

### Description
This endpoint is used to log out the authenticated user and blacklist the JWT token.

### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing a success message.

Example:
```json
{
  "message": "Successfully logged out"
}
```

#### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Unauthorized"
}
```

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

# MrParker Endpoints Documentation

## MrParker Registration Endpoint

### Endpoint
`POST /mrparker/register`

### Description
This endpoint is used to register a new MrParker. It requires the MrParker's first name, last name, email, and password.

### Request Body
The request body should be a JSON object containing the following fields:
- `fullname.firstname` (string, required): The first name of the MrParker. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the MrParker. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the MrParker. Must be a valid email format.
- `password` (string, required): The password for the MrParker. Must be at least 5 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "Jaya",
    "lastname": "Vardhan"
  },
  "email": "Jaya.Vardhan@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code**: `201 Created`
- **Response Body**: A JSON object containing the authentication token and MrParker details.

Example:
```json
{
  "token": "your_jwt_token",
  "MrParker": {
    "_id": "mrparker_id",
    "fullname": {
      "firstname": "Jaya",
      "lastname": "Vardhan"
    },
    "email": "Jaya.Vardhan@example.com"
  }
}
```

#### Validation Errors
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

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

## MrParker Login Endpoint

### Endpoint
`POST /mrparker/login`

### Description
This endpoint is used to log in an existing MrParker. It requires the MrParker's email and password.

### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the MrParker. Must be a valid email format.
- `password` (string, required): The password for the MrParker. Must be at least 5 characters long.

Example:
```json
{
  "email": "Jaya.Vardhan@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the authentication token and MrParker details.

Example:
```json
{
  "token": "your_jwt_token",
  "MrParker": {
    "_id": "mrparker_id",
    "fullname": {
      "firstname": "Jaya",
      "lastname": "Vardhan"
    },
    "email": "Jaya.Vardhan@example.com"
  }
}
```

#### Validation Errors
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

#### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Invalid Email or Password"
}
```

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

## MrParker Profile Endpoint

### Endpoint
`GET /mrparker/profile`

### Description
This endpoint is used to retrieve the profile of the authenticated MrParker.

### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated MrParker.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the MrParker details.

Example:
```json
{
  "_id": "mrparker_id",
  "fullname": {
    "firstname": "Jaya",
    "lastname": "Vardhan"
  },
  "email": "Jaya.Vardhan@example.com"
}
```

#### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Unauthorized"
}
```

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

## MrParker Logout Endpoint

### Endpoint
`GET /mrparker/logout`

### Description
This endpoint is used to log out the authenticated MrParker and blacklist the JWT token.

### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated MrParker.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing a success message.

Example:
```json
{
  "message": "Successfully logged out"
}
```

#### Authentication Errors
- **Status Code**: `401 Unauthorized`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Unauthorized"
}
```

#### Server Errors
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "error": "Internal Server Error"
}
```

