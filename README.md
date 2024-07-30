# Flight Status Dashboard - Backend

## Overview
This is the backend of the Flight Status Update application. It provides APIs for user authentication, managing flight data, fetching flight statuses alongside giving the flexibility to add passengers to a flight. The backend is built using Node.js, Express, and MongoDB. And deployed on an AWS EC2 instance

## Features
- Customer authentication (signup and login)
- Review flights booked by a customer
- Manage flight data (add, update and fetch)
- Fetch flight status
- Manage customer and passenger data
- SMS and Email notifications for flight status updates

## Technology Stack
- Node.js
- Express
- MongoDB
- Mongoose (for MongoDB object modeling)
- bcrypt (for password hashing)
- JWT (for authentication tokens)
- Twilio (for SMS notifications)
- Nodemailer (for Email notifications)
- AWS EC2

## API Endpoints
# Authentication

- `POST /api/auth/signup` - Sign up a new Customer
- `POST /api/auth/login` - Log in an existing Customer

# Flights
- `POST /api/flights` - Add a new flight
- `GET /api/flights/:flightNumber` - Get flight status by flight number
- `PUT /api/flights/:flightId` - Update flight information

# Customers
- `GET /api/auth/future-flights` - Get future flights for a logged-in customer

# Passengers
- `POST /api/passengers` - Add a new passenger

## Sample API Requests
# Sign Up
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "password123"
  }'
```

# Log In
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

# Add Flight
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/flights \
  -H "Content-Type: application/json" \
  -d '{
    "flightNumber": "6E123",
    "airline": "Indigo",
    "status": "Scheduled",
    "gate": "A2",
    "ScheduledDepartureTime": "2024-08-01T15:30:00Z",
    "ScheduledArrivalTime": "2024-08-01T17:30:00Z"
  }'
``` 

# Update a flight's status
```sh
curl -X PUT https://www.api-flights-indigo.work.gd/api/flights/6E123 \
     -H "Content-Type: application/json" \
     -d '{
           "status": "Delayed", 
           "gate": "A2"                    
        }'
```

# Check Flight Status
```sh
curl -X GET https://www.api-flights-indigo.work.gd/api/flights/6E123
```

# Get Future Flights
``` sh
curl -X GET https://www.api-flights-indigo.work.gd/api/customers/60d0fe4f5311236168a109ca/flights
```

# Add Passenger
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/passengers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "phone": "0987654321",
    "email": "jane.doe@example.com",
    "flightNumber": "6E123",
    "bookingNumber": "PNR123"
  }'
```

## License
This project is licensed under the MIT License.