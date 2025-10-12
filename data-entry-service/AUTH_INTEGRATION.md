# Authentication Integration

## Authentication Placeholders

The application currently runs in **development mode** with authentication bypassed. All authentication integration points are clearly marked with comments.

## Location of Auth Placeholders

### 1. **Backend (server.js)**

#### Authentication Middleware (Lines 15-58)
```javascript
// AUTHENTICATION PLACEHOLDER
async function authenticateUser(req, res, next) {
  // TODO: Implement JWT token verification
  // TODO: Call authentication service
  // TODO: Add user info to req.user
}
```

**What to implement:**
- Extract JWT token from Authorization header
- Verify token with authentication service
- Add user information to `req.user`
- Return 401 for invalid/missing tokens

#### Protected Routes
- `POST /api/grades` (Line 83) - Has `authenticateUser` middleware
- `GET /api/students` (Line 103) - Has `authenticateUser` middleware

### 2. **Frontend JavaScript (script.js)**

#### Authentication Functions (Lines 3-40)
```javascript
// AUTHENTICATION PLACEHOLDER
let authToken = null;

// TODO: Implement login function
function login(credentials) { }

// TODO: Implement logout function  
function logout() { }

// TODO: Check for existing token on page load
function checkAuth() { }

// TODO: Helper function to get auth headers
function getAuthHeaders() { }
```

#### API Calls with Auth Headers
- Grade submission (Line 57) - Uses `getAuthHeaders()`
- Load students (Line 74) - Uses `getAuthHeaders()`

### 3. **Frontend HTML (index.html)**

#### Login UI Placeholder (Lines 11-27)
```html
<!-- AUTHENTICATION PLACEHOLDER -->
<!-- TODO: Add login section when auth service is ready -->
<!-- 
<div id="loginSection" class="hidden">
    <h2>Login Required</h2>
    <form id="loginForm">
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
</div>
-->

<!-- TODO: Add user info display when authenticated -->
<!-- 
<div id="userInfo" class="user-info">
    <span id="welcomeMessage">Welcome, [Username]</span>
    <button onclick="logout()">Logout</button>
</div>
-->
```

### 4. **Documentation (README.md)**

The README.md contains comprehensive documentation about:
- Authentication requirements
- API endpoint security
- Environment variables needed
- Testing with authentication

## Implementation Steps

### Step 1: Authentication Service Integration

1. **Uncomment axios import** in `server.js` (Line 3)
2. **Set AUTH_SERVICE_URL** environment variable
3. **Implement token verification** in `authenticateUser()` function
4. **Test with actual auth service**

### Step 2: Frontend Login Implementation

1. **Uncomment login HTML** sections
2. **Implement login/logout functions** in JavaScript
3. **Add token storage** (localStorage)
4. **Implement auth state management**
5. **Add auth checks on page load**

### Step 3: CSS Styling for Auth Elements

Add CSS for authentication UI elements:
```css
.user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
}

#loginSection {
    /* Login form styles */
}
```

## 🧪 Testing Authentication

### Current Development Mode
- Authentication is **bypassed**
- All requests use a demo user
- Console shows: "⚠️ DEVELOPMENT MODE: Authentication bypassed"

### With Real Authentication
1. Start authentication service on port 3000
2. Remove development bypass in `authenticateUser()`
3. Test with valid JWT tokens
4. Verify 401 responses for invalid tokens

## 🔧 Environment Configuration

Required environment variables:
```bash
AUTH_SERVICE_URL=http://localhost:3000
NODE_ENV=production  # To disable development mode
```

## Notes

- All auth placeholders are marked with `AUTHENTICATION PLACEHOLDER`
- Code is production-ready, just needs uncommenting and configuration
- Authentication service must provide JWT token verification endpoint
- Frontend uses Bearer token authentication pattern
- All API routes are protected by default (except /health)

## Quick Integration Checklist

- [ ] Set up authentication service
- [ ] Configure AUTH_SERVICE_URL environment variable  
- [ ] Uncomment and configure authenticateUser() middleware
- [ ] Implement frontend login/logout functions
- [ ] Add authentication UI elements
- [ ] Test end-to-end authentication flow
- [ ] Update CSS for authentication elements
- [ ] Configure production environment variables