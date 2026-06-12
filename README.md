# MERN Notes App

A full-stack Notes Management Application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

## Features

* User Authentication (JWT)
* Create Notes
* View Notes
* Update Notes
* Delete Notes
* Protected Routes
* MongoDB Database Integration
* Responsive User Interface

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd NotesApp
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

## Future Improvements

* Search Notes
* Categories
* Pin Notes
* Dark Mode


## Author

Zohaib Ahmed
