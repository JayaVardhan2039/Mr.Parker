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
`POST /mrparkers/register`

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
`POST /mrparkers/login`

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
`GET /mrparkers/profile`

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
`GET /mrparkers/logout`

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

# Maps Routes Endpoints Documentation

## Get Coordinates Endpoint

### Endpoint
`GET /maps/get-coordinates`

### Description
This endpoint retrieves the coordinates (latitude and longitude) for a given address.

### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

### Query Parameters
- `address` (string, required): The address to geocode. Must be at least 3 characters long.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the coordinates.

Example:
```json
{
  "ltd": 12.9716,
  "lng": 77.5946
}
```

#### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing validation error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Address must be at least 3 characters long",
      "param": "address",
      "location": "query"
    }
  ]
}
```

#### Not Found
- **Status Code**: `404 Not Found`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Coordinates not found"
}
```

## Get Distance and Time Endpoint

### Endpoint
`GET /maps/get-distance-time`

### Description
This endpoint calculates the distance and time between two locations.

### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

### Query Parameters
- `origin` (string, required): The starting location. Must be at least 3 characters long.
- `destination` (string, required): The ending location. Must be at least 3 characters long.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing distance and duration information.

Example:
```json
{
  "distance": {
    "text": "5.2 km",
    "value": 5200
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```

#### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing validation error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Origin must be at least 3 characters long",
      "param": "origin",
      "location": "query"
    },
    {
      "msg": "Destination must be at least 3 characters long",
      "param": "destination",
      "location": "query"
    }
  ]
}
```

#### Not Found
- **Status Code**: `404 Not Found`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Internal server error"
}
```

## Get Auto-Complete Suggestions Endpoint

### Endpoint
`GET /maps/get-suggestions`

### Description
This endpoint provides auto-complete suggestions for location searches.

### Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

### Query Parameters
- `input` (string, required): The search query. Must be at least 3 characters long.

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: An array of suggestion objects.

Example:
```json
[
  {
    "description": "Bangalore, Karnataka, India",
    "place_id": "ChIJbU60yXAWrjsR4E9-UejD3_g",
    "structured_formatting": {
      "main_text": "Bangalore",
      "secondary_text": "Karnataka, India"
    }
  },
  {
    "description": "Bangalore Railway Station, Bangalore, Karnataka, India",
    "place_id": "ChIJB1nGyZsWrjsRx_ZGYpWNCjw",
    "structured_formatting": {
      "main_text": "Bangalore Railway Station",
      "secondary_text": "Bangalore, Karnataka, India"
    }
  }
]
```

#### Validation Errors
- **Status Code**: `400 Bad Request`
- **Response Body**: A JSON object containing validation error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Search query must be at least 3 characters long",
      "param": "input",
      "location": "query"
    }
  ]
}
```

#### Server Error
- **Status Code**: `500 Internal Server Error`
- **Response Body**: A JSON object containing an error message.

Example:
```json
{
  "message": "Internal server error"
}
```

# Park Endpoints Documentation

## Create Park Endpoint

### Endpoint
`POST /parks/create`

### Description
This endpoint is used to create a new park request. It requires the pickup address, destination address, and vehicle type.

### Request Body
The request body should be a JSON object containing the following fields:
- `pickup` (string, required): The pickup address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.
- `vehicleType` (string, required): The type of the vehicle. Must be one of ['car', 'motorcycle', 'bicycle', 'bike'].

Example:
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

### Responses

#### Success
- **Status Code**: `201 Created`
- **Response Body**: A JSON object containing the park details.

Example:
```json
{
  "_id": "park_id",
  "user": "user_id",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car",
  "status": "pending",
  "fare": 100
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
      "msg": "Invalid Pickup Address",
      "param": "pickup",
      "location": "body"
    },
    {
      "msg": "Invalid Destination Address",
      "param": "destination",
      "location": "body"
    },
    {
      "msg": "Invalid Vehicle Type",
      "param": "vehicleType",
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

## Get Fare Endpoint

### Endpoint
`GET /parks/get-fare`

### Description
This endpoint is used to get the fare estimate for a park request. It requires the pickup address and destination address.

### Query Parameters
- `pickup` (string, required): The pickup address. Must be at least 3 characters long.
- `destination` (string, required): The destination address. Must be at least 3 characters long.

Example:
```
GET /parks/get-fare?pickup=123%20Main%20St&destination=456%20Elm%20St
```

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the fare estimate.

Example:
```json
{
  "fare": 100
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
      "msg": "Invalid Pickup Address",
      "param": "pickup",
      "location": "query"
    },
    {
      "msg": "Invalid Destination Address",
      "param": "destination",
      "location": "query"
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

## Confirm Park Endpoint

### Endpoint
`POST /parks/confirm`

### Description
This endpoint is used to confirm a park request by a MrParker. It requires the park ID.

### Request Body
The request body should be a JSON object containing the following field:
- `parkId` (string, required): The ID of the park request. Must be a valid MongoDB ObjectId.

Example:
```json
{
  "parkId": "60d21b4667d0d8992e610c85"
}
```

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the confirmed park details.

Example:
```json
{
  "_id": "60d21b4667d0d8992e610c85",
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
  },
  "mrparker": {
    "_id": "mrparker_id",
    "fullname": {
      "firstname": "Parker",
      "lastname": "Smith"
    },
    "email": "parker.smith@example.com"
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car",
  "status": "accepted",
  "fare": 100,
  "otp": 123456
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
      "msg": "Invalid Park Id",
      "param": "parkId",
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

## Start Park Endpoint

### Endpoint
`GET /parks/start-park`

### Description
This endpoint is used to start a park request by a MrParker. It requires the park ID and OTP.

### Query Parameters
- `parkId` (string, required): The ID of the park request. Must be a valid MongoDB ObjectId.
- `otp` (number, required): The OTP for the park request. Must be a 6-digit number.

Example:
```
GET /parks/start-park?parkId=60d21b4667d0d8992e610c85&otp=123456
```

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the started park details.

Example:
```json
{
  "_id": "60d21b4667d0d8992e610c85",
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
  },
  "mrparker": {
    "_id": "mrparker_id",
    "fullname": {
      "firstname": "Parker",
      "lastname": "Smith"
    },
    "email": "parker.smith@example.com"
  },
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car",
  "status": "ongoing",
  "fare": 100
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
      "msg": "Invalid Park Id",
      "param": "parkId",
      "location": "query"
    },
    {
      "msg": "Invalid OTP",
      "param": "otp",
      "location": "query"
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

