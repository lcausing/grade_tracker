// Authentication functionality
let authToken = null;
let currentUser = null;

// Login function
async function login(credentials) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        const result = await response.json();
        
        if (response.ok && result.token) {
            authToken = result.token;
            localStorage.setItem('authToken', authToken);
            
            // Decode token to get user info (simple decode without verification)
            const tokenParts = authToken.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            currentUser = payload;
            
            showMainApp();
            return { success: true };
        } else {
            return { success: false, message: result.message || 'Login failed' };
        }
    } catch (error) {
        return { success: false, message: 'Network error occurred' };
    }
}

// Logout function
function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    showLoginForm();
}

// Check for existing token on page load
function checkAuth() {
    authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            // Simple token validation (check if expired)
            const tokenParts = authToken.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            
            if (payload.exp * 1000 > Date.now()) {
                currentUser = payload;
                showMainApp();
                return;
            } else {
                // Token expired
                localStorage.removeItem('authToken');
                authToken = null;
            }
        } catch (error) {
            // Invalid token
            localStorage.removeItem('authToken');
            authToken = null;
        }
    }
    showLoginForm();
}

// Helper function to get auth headers
function getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    return headers;
}

// UI functions
function showMainApp() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    if (currentUser) {
        document.getElementById('userInfo').textContent = `Welcome, ${currentUser.username}`;
    }
}

function showLoginForm() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('mainApp').style.display = 'none';
}

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    document.getElementById('loginForm').onsubmit = async function(e) {
        e.preventDefault();
        
        const credentials = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        const result = await login(credentials);
        
        if (result.success) {
            document.getElementById('loginMessage').innerHTML = '';
            document.getElementById('loginForm').reset();
        } else {
            document.getElementById('loginMessage').innerHTML = 
                '<div class="message error">' + result.message + '</div>';
        }
    };
});

document.getElementById('gradeForm').onsubmit = async function(e) {
    e.preventDefault();
    
    const data = {
        studentName: document.getElementById('studentName').value,
        studentEmail: document.getElementById('studentEmail').value,
        dataType: document.getElementById('dataType').value,
        dataValue: document.getElementById('dataValue').value
    };

    try {
        const response = await fetch('/api/grades', {
            method: 'POST',
            headers: getAuthHeaders(), //This will include auth token when implemented
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('message').innerHTML = '<div class="message success">Grade submitted successfully!</div>';
            document.getElementById('gradeForm').reset();
        } else {
            document.getElementById('message').innerHTML = '<div class="message error">Error: ' + result.message + '</div>';
        }
    } catch (error) {
        document.getElementById('message').innerHTML = '<div class="message error">Network error occurred</div>';
    }
};

async function loadStudents() {
    try {
        const response = await fetch('/api/students', {
            headers: getAuthHeaders() // This will include auth token when implemented
        });
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            const html = result.data.map(student => 
                `<div class="student-card">
                    <strong>${student.name}</strong> (${student.email})<br>
                    <span class="subject-label">${student.type}:</span> 
                    <span class="grade-value">${Math.round(student.value * 10) / 10}%</span>
                </div>`
            ).join('');
            document.getElementById('students').innerHTML = html;
        } else {
            document.getElementById('students').innerHTML = '<div class="message">No students found</div>';
        }
    } catch (error) {
        document.getElementById('students').innerHTML = '<div class="message error">Error loading students</div>';
    }
}

// Navigation functions
function redirectToAnalytics() {
    // Redirect to analytics service (assuming it runs on port 5003)
    const analyticsUrl = 'http://localhost:3002';
    
    // Store auth token for the analytics service (if needed)
    if (authToken) {
        localStorage.setItem('authTokenForAnalytics', authToken);
    }
    
    // Open analytics in new tab
    window.open(analyticsUrl, '_blank');
}

async function showResults() {
    try {
        const response = await fetch('/api/students', {
            headers: getAuthHeaders()
        });
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            // Calculate statistics
            const students = result.data;
            const totalStudents = students.length;
            const avgValue = (students.reduce((sum, student) => sum + parseFloat(student.value), 0) / totalStudents).toFixed(1);
            const highestValue = (Math.max(...students.map(s => parseFloat(s.value)))).toFixed(1);
            const lowestValue = (Math.min(...students.map(s => parseFloat(s.value)))).toFixed(1);
            
            // Group by type
            const typeStats = students.reduce((acc, student) => {
                if (!acc[student.type]) {
                    acc[student.type] = [];
                }
                acc[student.type].push(parseFloat(student.value));
                return acc;
            }, {});
            
            // Create results HTML
            let resultsHtml = `
                <div class="results-container">
                    <h3>Grade Results Summary</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h4>Total Students</h4>
                            <div class="stat-value">${totalStudents}</div>
                        </div>
                        <div class="stat-card">
                            <h4>Average Grade</h4>
                            <div class="stat-value">${avgValue}%</div>
                        </div>
                        <div class="stat-card">
                            <h4>Highest Grade</h4>
                            <div class="stat-value">${highestValue}%</div>
                        </div>
                        <div class="stat-card">
                            <h4>Lowest Grade</h4>
                            <div class="stat-value">${lowestValue}%</div>
                        </div>
                    </div>
                    
                    <div class="subject-breakdown">
                        <h4>By Subject:</h4>`;
            
            // Add subject statistics
            Object.entries(typeStats).forEach(([type, values]) => {
                const typeAvg = (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
                resultsHtml += `
                    <div class="subject-stat">
                        <strong>${type}:</strong> ${values.length} students, Average: ${typeAvg}%
                    </div>`;
            });
            
            resultsHtml += `
                    </div>
                    
                    <div class="detailed-results">
                        <h4>All Students:</h4>
                        <div class="students-list">`;
            
            // Add detailed student list
            students.sort((a, b) => parseFloat(b.value) - parseFloat(a.value)).forEach(student => {
                const value = parseFloat(student.value);
                const roundedValue = (Math.round(value * 10) / 10).toFixed(1);
                const valueClass = value >= 90 ? 'excellent' : value >= 80 ? 'good' : value >= 70 ? 'average' : 'below-average';
                resultsHtml += `
                    <div class="student-result ${valueClass}">
                        <span class="student-name">${student.name}</span>
                        <span class="student-subject">${student.type}</span>
                        <span class="student-grade">${roundedValue}%</span>
                    </div>`;
            });
            
            resultsHtml += `
                        </div>
                    </div>
                </div>`;
            
            document.getElementById('results-section').innerHTML = resultsHtml;
            
            // Scroll to results
            document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
            
        } else {
            document.getElementById('results-section').innerHTML = '<div class="message">No results to display</div>';
        }
    } catch (error) {
        document.getElementById('results-section').innerHTML = '<div class="message error">Error loading results</div>';
    }
}