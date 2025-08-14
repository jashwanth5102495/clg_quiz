# Quiz Application Backend

A robust Node.js backend for a quiz web application with MongoDB integration, JWT authentication, and comprehensive API endpoints.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** integration with Mongoose
- **JWT Authentication** for admin routes
- **Question Management** with difficulty-based distribution
- **Result Tracking** with detailed analytics
- **CSV Export** functionality for admin
- **Rate Limiting** and security middleware
- **Comprehensive Error Handling**
- **Input Validation** with express-validator

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/quiz-app
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed the database with questions:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### 🔓 Public Endpoints

#### Get Questions
```http
GET /questions?topic=MBA
GET /questions?topic=MCA
```

**Response:**
- Returns exactly 20 questions per topic
- Questions are distributed: 5 easy, 5 slightly_difficult, 5 moderate, 5 difficult
- Order is randomized within each difficulty level
- Correct answers are not included in response

#### Submit Quiz
```http
POST /submit
```

**Request Body:**
```json
{
  "student_name": "John Doe",
  "roll_number": "MBA001",
  "topic": "MBA",
  "time_taken": 1200,
  "answers": [
    {
      "question_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "selected_option": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz submitted successfully",
  "result": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "student_name": "John Doe",
    "roll_number": "MBA001",
    "topic": "MBA",
    "score": 15,
    "total_questions": 20,
    "percentage": 75,
    "grade": "B+",
    "date": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get Student Results
```http
GET /results/student/:rollNumber?topic=MBA
```

### 🔒 Admin Endpoints (Require Authentication)

#### Admin Login
```http
POST /admin/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "username": "admin",
    "role": "admin"
  }
}
```

#### Get All Results
```http
GET /admin/results?page=1&limit=20&topic=MBA&sortBy=date&sortOrder=desc
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### Export Results as CSV
```http
GET /admin/results?format=csv&topic=MBA
```

#### Get Dashboard Statistics
```http
GET /admin/dashboard
```

#### Get Detailed Result
```http
GET /admin/result/:id
```

#### Delete Result
```http
DELETE /admin/result/:id
```

## 🗄️ Database Models

### Question Model
```javascript
{
  question_text: String,
  options: [String], // Array of 4 options
  correct_option_index: Number, // 0-3
  topic: "MBA" | "MCA",
  difficulty: "easy" | "slightly_difficult" | "moderate" | "difficult",
  sub_category: String,
  created_at: Date,
  updated_at: Date
}
```

### Result Model
```javascript
{
  student_name: String,
  roll_number: String,
  topic: String,
  answers: [{
    question_id: ObjectId,
    selected_option: Number,
    is_correct: Boolean
  }],
  score: Number,
  total_questions: Number,
  percentage: Number,
  time_taken: Number, // in seconds
  date: Date
}
```

## 🔧 Question Distribution

### MBA Topics:
- **Easy (5):** Finance Basics, Marketing Fundamentals, etc.
- **Slightly Difficult (5):** Strategic Management, Operations Management, etc.
- **Moderate (5):** Strategic Analysis, Project Management, etc.
- **Difficult (5):** Advanced Finance, Advanced Strategy, etc.

### MCA Topics:
- **Easy (5):** Hardware + Basic Programming
- **Slightly Difficult (5):** UNIX Basics
- **Moderate (5):** Current Technology
- **Difficult (5):** Conditional Statements + Loops + Data Structures

## 🛡️ Security Features

- **Helmet.js** for security headers
- **Rate Limiting** (100 requests per 15 minutes)
- **CORS** configuration
- **JWT Authentication** for admin routes
- **Input Validation** and sanitization
- **Error Handling** without exposing sensitive data

## 📊 Admin Features

- **Dashboard** with comprehensive statistics
- **Result Management** with pagination and filtering
- **CSV Export** for data analysis
- **Detailed Result View** with question-by-question breakdown
- **Result Deletion** capability

## 🚀 Deployment

### Environment Variables for Production:
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-app
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_super_secure_jwt_secret_key
PORT=5000
```

### PM2 Deployment:
```bash
npm install -g pm2
pm2 start server.js --name "quiz-backend"
pm2 startup
pm2 save
```

## 🧪 Testing

### Health Check:
```bash
curl http://localhost:5000/api/health
```

### Test Question Fetching:
```bash
curl "http://localhost:5000/api/questions?topic=MBA"
```

### Test Admin Login:
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample questions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation above
- Review error messages in server logs
- Ensure all environment variables are properly set
- Verify MongoDB connection

---

**Happy Coding! 🎉**