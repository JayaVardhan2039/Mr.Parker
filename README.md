# Mr.Parker - parking repurposed

> Ever circled the block 10 times looking for parking? We've been there too.

![Mr.Parker Banner](./frontend/public/banner.png)

## The Problem We're Solving

We've all been there:
- Driving in circles looking for parking
- Getting late for meetings because there's "no parking anywhere"
- Paying ridiculous amounts for parking garages
- Watching empty driveways while struggling to find a spot

## Here's Where Mr.Parker Comes In

Mr.Parker connects people who need parking with people who have it. Simple as that. Think of it as your friendly neighbor letting you use their driveway - but with added security, convenience, and a chance to make some extra cash.

## How Mr.Parker Actually Works

1. **Users Book Nearby Parkers**: Normal part-time individuals who can assist with vehicle parking
2. **Real-Time Vehicle Management**: Parkers take the vehicle and return it when needed
3. **Live Location Tracking**: See your vehicle's exact location in real-time
4. **Time-Based Services**: Schedule pickups and handovers at your convenience
5. **Daily Statistics Reset**: Earnings and parking counts refresh daily at 10:55 PM
6. **Secure OTP Verification**: Complete handovers safely with OTP verification
7. **Fare Calculation**: Automatic fare calculation based on distance and time

## Key Features

🚗 **For Vehicle Owners:**
- Find nearby parkers in real-time
- Get fare estimates before booking
- Track your vehicle's location live
- Request handovers with OTP verification
- Multiple vehicle type support

🅿️ **For Mr.Parkers:**
- Accept parking requests
- Track daily earnings
- Navigate to pickup and handover locations
- Verify handovers with OTP system
- Manage multiple parking requests

## Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **GSAP** for smooth animations
- **Socket.io-client** for real-time communication
- **Tailwind CSS** for responsive styling
- **React Router Dom** for navigation
- **Axios** for API requests
- **React Google Maps** for location tracking
- **Motion** for UI animations
- **Remixicon** for icons

### Backend
- **Node.js** with Express server
- **MongoDB** with Mongoose for database management
- **Socket.io** for real-time updates
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Express Validator** for input validation
- **Node Schedule** for daily resets
- **Axios** for external API calls
- **Google Maps API** for geocoding and location services
- **Dotenv** for environment configuration
- **CORS** for cross-origin requests

## Installation Guide

### Prerequisites
- Node.js and npm
- MongoDB instance
- Google Maps API key

### Setup Backend
```bash
# Clone the repository
git clone https://github.com/JayaVardhan2039/Mr.Parker.git
cd Mr.Parker/backend

# Install dependencies
npm install

# Create .env file with the following variables
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# GOOGLE_MAPS_API=your_google_maps_api_key
# PORT=3000

# Start the server
npx nodemon
```

### Setup Frontend
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file with
# VITE_BASE_URL=http://localhost:3000
# GOOGLE_MAPS_API=your_google_maps_api_key

# Start the development server
npm run dev
```

## Project Structure

Need the full setup guide? Check our [Installation Wiki](docs/INSTALL.md)

## Join Our Community

Mr.Parker is built by people who understand the parking struggle. We're always looking for:
- 💡 Feature ideas from real users
- 🐛 Bug reports (yeah, we have those)
- 🤝 Community feedback
- 📱 Testing on different devices

## The Road Ahead

We're working on:
- Making the app even easier to use
- Expanding to more neighborhoods
- Adding flexible payment options
- Building a mobile app
- And lots more based on YOUR feedback!



## Let's Connect!

- 🌐 [Website](https://next-js-portfolio-jv.vercel.app/)


---

<p align="center">
Built with ❤️ by people who hate looking for parking
</p>
