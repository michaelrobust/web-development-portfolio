// Helper functions
function validateString(str, fieldName, minLength, maxLength, allowNumbers = false) {
    if (!str || typeof str !== 'string') {
        throw new Error(`${fieldName} must be a valid string`);
    }
    
    str = str.trim();
    if (str.length === 0) {
        throw new Error(`${fieldName} cannot be empty or just spaces`);
    }
    
    if (str.length < minLength || str.length > maxLength) {
        throw new Error(`${fieldName} must be between ${minLength} and ${maxLength} characters`);
    }
    
    if (!allowNumbers && /\d/.test(str)) {
        throw new Error(`${fieldName} cannot contain numbers`);
    }
    
    return str;
}

function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        throw new Error('Password must be a valid string');
    }
    
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    
    if (/\s/.test(password)) {
        throw new Error('Password cannot contain spaces');
    }
    
    if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase character');
    }
    
    if (!/\d/.test(password)) {
        throw new Error('Password must contain at least one number');
    }
    
    if (!/[^a-zA-Z0-9]/.test(password)) {
        throw new Error('Password must contain at least one special character');
    }
    
    return password;
}

function validateHexColor(color, fieldName) {
    if (!color || typeof color !== 'string') {
        throw new Error(`${fieldName} must be a valid string`);
    }
    
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(color)) {
        throw new Error(`${fieldName} must be a valid hex color code`);
    }
    
    return color.toLowerCase();
}

function showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.client-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error client-error';
    errorDiv.textContent = message;
    
    // Insert at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
    }
}

// Sign up form validation
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            try {
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const userId = document.getElementById('userId').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const favoriteQuote = document.getElementById('favoriteQuote').value;
                const backgroundColor = document.getElementById('backgroundColor').value;
                const fontColor = document.getElementById('fontColor').value;
                const role = document.getElementById('role').value;

                // Check if all fields are provided
                if (!firstName || !lastName || !userId || !password || !confirmPassword || 
                    !favoriteQuote || !backgroundColor || !fontColor || !role) {
                    throw new Error('All fields must be provided');
                }

                // Validate each field
                validateString(firstName, 'First name', 2, 25);
                validateString(lastName, 'Last name', 2, 25);
                validateString(userId, 'User ID', 5, 10);
                validatePassword(password);

                // Check password confirmation
                if (password !== confirmPassword) {
                    throw new Error('Passwords do not match');
                }

                // Validate favorite quote
                const trimmedQuote = favoriteQuote.trim();
                if (trimmedQuote.length < 20 || trimmedQuote.length > 255) {
                    throw new Error('Favorite quote must be between 20 and 255 characters');
                }

                // Validate colors
                validateHexColor(backgroundColor, 'Background color');
                validateHexColor(fontColor, 'Font color');
                
                if (backgroundColor.toLowerCase() === fontColor.toLowerCase()) {
                    throw new Error('Background color and font color cannot be the same');
                }

                // Validate role
                if (role !== 'admin' && role !== 'user') {
                    throw new Error('Role must be either admin or user');
                }

                // If we get here, validation passed
                // Remove any existing error
                const existingError = document.querySelector('.client-error');
                if (existingError) {
                    existingError.remove();
                }

            } catch (error) {
                e.preventDefault();
                showError(error.message);
            }
        });
    }

    // Sign in form validation
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            try {
                const userId = document.getElementById('user_id').value;
                const password = document.getElementById('password').value;

                // Check if fields are provided
                if (!userId || !password) {
                    throw new Error('Both User ID and password must be provided');
                }

                // Validate fields
                validateString(userId, 'User ID', 5, 10);
                validatePassword(password);

                // If we get here, validation passed
                // Remove any existing error
                const existingError = document.querySelector('.client-error');
                if (existingError) {
                    existingError.remove();
                }

            } catch (error) {
                e.preventDefault();
                showError(error.message);
            }
        });
    }
});