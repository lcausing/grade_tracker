# Grade Tracker - Data Entry Service# Data Entry Service



A clean, modern web application for entering student grade data with authentication integration points.A Node.js Express web application for entering grade data into the Grade Tracker system.



## 🚀 Features## Features



- **Simple Grade Entry**: Clean form interface for entering student grades- **Authentication Integration**: Verifies user credentials through the Authentication Service

- **Modern UI**: Responsive design with gradients and smooth animations- **Grade Submission**: Simple form interface for entering student grades

- **Authentication Ready**: Complete placeholders for auth integration- **MySQL Integration**: Stores grade data in MySQL database

- **Database Integration**: MySQL support with demo mode fallback- **Student Management**: View and manage student records

- **Testing Suite**: Comprehensive API testing included- **RESTful API**: Provides endpoints for grade operations

- **Health Monitoring**: Built-in health check endpoint

## 📁 Project Structure

## API Endpoints

```

data-entry-service/### Authentication Required

├── public/

│   ├── index.html      # Main UI with auth placeholdersAll API endpoints require a valid JWT token in the Authorization header:

│   ├── style.css       # Modern, responsive CSS```

│   └── script.js       # Frontend JS with auth functionsAuthorization: Bearer <token>

├── server.js           # Express server with auth middleware```

├── test.js            # Complete testing suite

├── Dockerfile         # Docker container setup### Grade Operations

└── AUTH_INTEGRATION.md # Authentication integration guide

```- `POST /api/grades` - Submit a new grade

- `GET /api/students` - Get all students and their grades

## 🛠 Quick Start- `GET /api/students/:id` - Get specific student information



### Prerequisites## Installation & Setup

- Node.js 16+

- MySQL database (optional - falls back to demo mode)### Prerequisites



### Installation- Node.js 16+ and npm

```bash- MySQL database running (configured in docker-compose.yml)

npm install- Authentication service running on port 3000

```

### Local Development

### Development

```bash1. **Install dependencies**:

npm start   ```powershell

# or   npm install

node server.js   ```

```

2. **Configure environment** (copy .env and adjust if needed):

### Testing   ```powershell

```bash   cp .env.example .env

node test.js   ```

```

3. **Start the service**:

### Docker   ```powershell

```bash   npm run dev  # Development with nodemon

docker build -t grade-tracker-data-entry .   # or

docker run -p 3001:3001 grade-tracker-data-entry   npm start    # Production

```   ```



## 🌐 Usage4. **Access the application**:

   - Web interface: http://localhost:3001

1. **Start the service**: `npm start`   - API: http://localhost:3001/api/*

2. **Open browser**: http://localhost:3001

3. **Enter grades**: Use the clean form interface### Docker Setup

4. **View students**: Click "View All Students" to see entered data

1. **Build the image**:

## 🔐 Authentication Integration   ```powershell

   docker build -t grade-tracker-data-entry .

All authentication integration points are clearly marked with:   ```

- **Server**: `AUTHENTICATION PLACEHOLDER` comments

- **Frontend**: Auth functions ready for implementation2. **Run with docker-compose** (from root directory):

- **Documentation**: Complete integration guide in `AUTH_INTEGRATION.md`   ```powershell

   docker-compose up data-entry-service

### Current Status   ```

- ✅ Development mode (auth bypassed)

- ✅ All placeholders ready## Environment Variables

- ✅ Demo user configured

- 🚧 Waiting for auth service integration| Variable | Default | Description |

|----------|---------|-------------|

## 🎯 API Endpoints| `PORT` | 3001 | Server port |

| `DB_HOST` | localhost | MySQL host |

- `GET /health` - Service health check| `DB_PORT` | 3306 | MySQL port |

- `POST /api/grades` - Submit new grade (auth required)| `DB_USER` | appuser | MySQL username |

- `GET /api/students` - Retrieve all students (auth required)| `DB_PASSWORD` | apppass | MySQL password |

| `DB_NAME` | grade_tracker | MySQL database name |

## 🎨 UI Features| `AUTH_SERVICE_URL` | http://localhost:3000 | Authentication service URL |

| `NODE_ENV` | development | Environment mode |

- **Responsive Design**: Works on desktop and mobile

- **Modern Styling**: Clean gradients and animations## Database Schema

- **Form Validation**: Client-side input validation

- **Success/Error Messages**: Clear user feedbackThe service expects a MySQL table named `students`:

- **Loading States**: Smooth user experience

```sql

## 📝 Development NotesCREATE TABLE students (

    id INT AUTO_INCREMENT PRIMARY KEY,

- **Demo Mode**: Automatically falls back if database unavailable    name VARCHAR(100),

- **Clean Architecture**: Separated HTML, CSS, and JavaScript    email VARCHAR(100),

- **Production Ready**: Includes Docker setup and health checks    grade FLOAT

- **Extensible**: Easy to add features and modify);

```

## 🤝 Collaboration

## Error Handling

Perfect for team development:

- Clear authentication integration pointsThe service provides detailed error responses:

- Comprehensive documentation

- Easy to run and test- **400 Bad Request**: Invalid input data

- Ready for auth service connection- **401 Unauthorized**: Authentication failure

- **404 Not Found**: Resource not found

## 🔧 Environment Variables- **500 Internal Server Error**: Database or server errors

- **503 Service Unavailable**: Authentication service unavailable

```bash

PORT=3001                    # Server port## Security Features

DB_HOST=localhost           # MySQL host

DB_USER=appuser            # MySQL username- **Token-based Authentication**: Integration with external auth service

DB_PASSWORD=apppass        # MySQL password- **Input Validation**: Comprehensive validation of grade data

DB_NAME=grade_tracker      # MySQL database- **SQL Injection Protection**: Parameterized queries

AUTH_SERVICE_URL=http://localhost:3000  # Auth service URL- **CORS Support**: Cross-origin resource sharing configuration

```- **Error Sanitization**: Safe error messages without sensitive data

## Testing

### Manual Testing

1. **Start all services** (MySQL, Auth Service, Data Entry Service)
2. **Open web interface**: http://localhost:3001
3. **Authenticate** with valid credentials
4. **Submit test grades** using the form
5. **Verify data** in MySQL database

### API Testing

```bash
# Health check
curl http://localhost:3001/health

# Test grade submission (replace <token> with valid JWT)
curl -X POST http://localhost:3001/api/grades \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"studentName":"Test User","studentEmail":"test@example.com","subject":"Math","grade":90}'
```

## Architecture Notes

- **Separation of Concerns**: Authentication handled by separate service
- **Database Connection Pooling**: Efficient MySQL connection management
- **Graceful Shutdown**: Proper cleanup on process termination
- **Stateless Design**: No server-side session storage
- **RESTful API**: Standard HTTP methods and status codes

## Development Notes

- Uses Express.js framework for web server
- MySQL2 library for database operations with promise support
- Axios for HTTP requests to authentication service
- Environment-based configuration
- Comprehensive error handling and logging