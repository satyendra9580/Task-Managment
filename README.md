![Screenshot from 2025-03-11 22-37-46](https://github.com/user-attachments/assets/37c069d3-87ac-47cf-a209-37fd0bcedec8)
![Screenshot from 2025-03-11 22-37-10](https://github.com/user-attachments/assets/f35304c0-5259-419c-9079-56ba2449daec)
![Screenshot from 2025-03-11 22-36-24](https://github.com/user-attachments/assets/3a443aeb-bda0-4123-872e-116ac9ab1c45)
# Task Management App

A modern task management application built with React.js, Node.js, Express.js, and MongoDB.

## Features

- Create, view, update, and delete tasks
- Filter tasks by status and priority
- Search tasks by title or description
- Sort tasks by various criteria
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React.js (with Vite)
- Material UI
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-management-app
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/task-management-app
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
task-management-app/
├── backend/
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── .env           # Environment variables
│   ├── package.json   # Backend dependencies
│   └── server.js      # Express server
├── frontend/
│   ├── public/        # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   ├── App.jsx      # Main App component
│   │   └── main.jsx     # Entry point
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Vite configuration
└── README.md          # Project documentation
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
