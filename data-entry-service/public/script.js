// AUTHENTICATION PLACEHOLDER
// TODO: Add authentication token management
let authToken = null;

// TODO: Implement login function
function login(credentials) {
    // Example implementation:
    // const response = await fetch('/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(credentials)
    // });
    // const result = await response.json();
    // authToken = result.token;
    // localStorage.setItem('authToken', authToken);
}

// TODO: Implement logout function  
function logout() {
    // authToken = null;
    // localStorage.removeItem('authToken');
    // window.location.href = '/login';
}

// TODO: Check for existing token on page load
function checkAuth() {
    // authToken = localStorage.getItem('authToken');
    // if (!authToken) {
    //     window.location.href = '/login';
    // }
}

// TODO: Helper function to get auth headers
function getAuthHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    // TODO: Add token when auth is implemented
    // if (authToken) {
    //     headers['Authorization'] = `Bearer ${authToken}`;
    // }
    return headers;
}
// END AUTHENTICATION PLACEHOLDER

document.getElementById('gradeForm').onsubmit = async function(e) {
    e.preventDefault();
    
    const data = {
        subject: document.getElementById('subject').value,
        studentName: document.getElementById('studentName').value,
        studentEmail: document.getElementById('studentEmail').value,
        grade: document.getElementById('grade').value
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
                `<div>
                    <strong>${student.name}</strong> (${student.email}) - Grade: ${student.grade}%
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