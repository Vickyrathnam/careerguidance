# Career Guidance System

A comprehensive career guidance platform built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

- **Career Assessment**: Comprehensive evaluation of interests, skills, values, and personality
- **AI-Powered Matching**: Intelligent career recommendations based on user profiles
- **Expert Mentors**: Connect with industry professionals for personalized guidance
- **Learning Roadmaps**: Step-by-step career development paths with resources
- **User Authentication**: Secure login and registration system
- **Contact System**: Direct communication with support team

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for development and building

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Create a PostgreSQL database named `career_guidance`
2. Copy `server/.env.example` to `server/.env` and update the database connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/career_guidance
   JWT_SECRET=your-super-secret-jwt-key-here
   ```
3. Run the database schema:
   ```bash
   psql -d career_guidance -f server/src/config/database.sql
   ```

### Installation

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

### Running the Application

#### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev:full
```

Or run them separately:

Frontend (http://localhost:5173):
```bash
npm run dev
```

Backend (http://localhost:5000):
```bash
cd server
npm run dev
```

#### Production Mode

Build and start the backend:
```bash
cd server
npm run build
npm start
```

Build the frontend:
```bash
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Assessment
- `POST /api/assessment/responses` - Save assessment responses
- `POST /api/assessment/career-matches` - Save career matches
- `GET /api/assessment/history` - Get user's assessment history

### Mentors
- `GET /api/mentors` - Get all available mentors
- `GET /api/mentors/:id` - Get specific mentor
- `POST /api/mentors/:id/book-session` - Book a session with mentor
- `GET /api/mentors/sessions/my-sessions` - Get user's mentor sessions

### Contact
- `POST /api/contact/messages` - Submit contact message
- `GET /api/contact/messages` - Get contact messages (admin)
- `PATCH /api/contact/messages/:id/status` - Update message status

## Database Schema

The application uses the following main tables:
- `users` - User accounts and authentication
- `assessment_responses` - User assessment data
- `career_matches` - Career matching results
- `mentors` - Available mentors and their information
- `mentor_sessions` - Booked mentoring sessions
- `contact_messages` - Contact form submissions

## Features Overview

### Career Assessment
- Multi-step questionnaire covering interests, skills, values, work style, education, and personality
- Progress tracking and validation
- Responsive design for all devices

### Career Matching
- AI-powered algorithm that matches users with suitable careers
- Scoring system based on multiple factors
- Detailed career information including salary, growth, and requirements

### Mentor System
- Browse available mentors by expertise and rating
- Book one-on-one sessions
- Integrated scheduling system
- Session management

### Contact System
- Multi-category contact form
- Automatic message routing
- Status tracking for admin

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.