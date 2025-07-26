//import express, express router as shown in lecture code
import { Router } from 'express';
import { signUpUser, signInUser } from '../data/users.js';

const router = Router();

// Helper function to validate string
const validateString = (str, fieldName, minLength, maxLength, allowNumbers = false) => {
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
};

// Helper function to validate password
const validatePassword = (password) => {
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
};

// Helper function to validate hex color
const validateHexColor = (color, fieldName) => {
  if (!color || typeof color !== 'string') {
    throw new Error(`${fieldName} must be a valid string`);
  }
  
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;
  if (!hexRegex.test(color)) {
    throw new Error(`${fieldName} must be a valid hex color code`);
  }
  
  return color.toLowerCase();
};

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/signupuser')
  .get(async (req, res) => {
    //code here for GET
    res.render('signupuser', { title: 'Sign Up' });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      const {
        firstName,
        lastName,
        userId,
        password,
        confirmPassword,
        favoriteQuote,
        backgroundColor,
        fontColor,
        role
      } = req.body;

      // Check if all fields are provided
      if (!firstName || !lastName || !userId || !password || !confirmPassword || 
          !favoriteQuote || !backgroundColor || !fontColor || !role) {
        throw new Error('All fields must be provided');
      }

      // Validate inputs
      const validFirstName = validateString(firstName, 'First name', 2, 25);
      const validLastName = validateString(lastName, 'Last name', 2, 25);
      const validUserId = validateString(userId, 'User ID', 5, 10);
      const validPassword = validatePassword(password);
      
      // Check password confirmation
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate favorite quote
      if (!favoriteQuote || typeof favoriteQuote !== 'string') {
        throw new Error('Favorite quote must be a valid string');
      }
      const trimmedQuote = favoriteQuote.trim();
      if (trimmedQuote.length < 20 || trimmedQuote.length > 255) {
        throw new Error('Favorite quote must be between 20 and 255 characters');
      }

      // Validate colors
      const validBackgroundColor = validateHexColor(backgroundColor, 'Background color');
      const validFontColor = validateHexColor(fontColor, 'Font color');
      
      if (validBackgroundColor === validFontColor) {
        throw new Error('Background color and font color cannot be the same');
      }

      // Validate role
      if (!role || typeof role !== 'string') {
        throw new Error('Role must be a valid string');
      }
      const trimmedRole = role.toLowerCase().trim();
      if (trimmedRole !== 'admin' && trimmedRole !== 'user') {
        throw new Error('Role must be either admin or user');
      }

      const themePreference = {
        backgroundColor: validBackgroundColor,
        fontColor: validFontColor
      };

      // Call database function
      const result = await signUpUser(
        validFirstName,
        validLastName,
        validUserId,
        validPassword,
        trimmedQuote,
        themePreference,
        trimmedRole
      );

      if (result.registrationCompleted) {
        res.redirect('/signinuser');
      } else {
        res.status(500).render('signupuser', {
          title: 'Sign Up',
          error: 'Internal Server Error'
        });
      }

    } catch (error) {
      res.status(400).render('signupuser', {
        title: 'Sign Up',
        error: error.message
      });
    }
  });

router
  .route('/signinuser')
  .get(async (req, res) => {
    //code here for GET
    res.render('signinuser', { title: 'Sign In' });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      const { user_id, password } = req.body;

      if (!user_id || !password) {
        throw new Error('Both userId and password must be provided');
      }

      // Validate inputs
      const validUserId = validateString(user_id, 'User ID', 5, 10);
      const validPassword = validatePassword(password);

      // Call database function
      const user = await signInUser(validUserId, validPassword);

      // Store user in session
      req.session.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
        favoriteQuote: user.favoriteQuote,
        themePreference: user.themePreference,
        role: user.role
      };

      // Redirect based on role
      if (user.role === 'admin') {
        res.redirect('/administrator');
      } else {
        res.redirect('/user');
      }

    } catch (error) {
      res.status(400).render('signinuser', {
        title: 'Sign In',
        error: error.message
      });
    }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  
  res.render('user', {
    title: 'User Profile',
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    role: req.session.user.role,
    favoriteQuote: req.session.user.favoriteQuote,
    currentTime,
    currentDate,
    isAdmin: req.session.user.role === 'admin',
    themePreference: req.session.user.themePreference
  });
});

router.route('/administrator').get(async (req, res) => {
  //code here for GET
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  
  res.render('administrator', {
    title: 'Administrator',
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    role: req.session.user.role,
    favoriteQuote: req.session.user.favoriteQuote,
    currentTime,
    currentDate,
    themePreference: req.session.user.themePreference
  });
});

router.route('/signoutuser').get(async (req, res) => {
  //code here for GET
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err);
    }
    res.render('signoutuser', {
      title: 'Signed Out'
    });
  });
});

export default router;