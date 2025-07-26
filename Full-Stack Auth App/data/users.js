//import mongo collections, bcrypt and implement the following data functions
import { users } from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';

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
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must contain at least one uppercase character');
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    throw new Error('Password must contain at least one number');
  }
  
  // Check for at least one special character (any non-alphanumeric character)
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

export const signUpUser = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  // Validate all inputs
  firstName = validateString(firstName, 'First name', 2, 25);
  lastName = validateString(lastName, 'Last name', 2, 25);
  userId = validateString(userId, 'User ID', 5, 10);
  password = validatePassword(password);
  
  // Validate favorite quote
  if (!favoriteQuote || typeof favoriteQuote !== 'string') {
    throw new Error('Favorite quote must be a valid string');
  }
  favoriteQuote = favoriteQuote.trim();
  if (favoriteQuote.length < 20 || favoriteQuote.length > 255) {
    throw new Error('Favorite quote must be between 20 and 255 characters');
  }
  
  // Validate theme preference
  if (!themePreference || typeof themePreference !== 'object' || Array.isArray(themePreference)) {
    throw new Error('Theme preference must be an object');
  }
  
  const themeKeys = Object.keys(themePreference);
  if (themeKeys.length !== 2 || !themeKeys.includes('backgroundColor') || !themeKeys.includes('fontColor')) {
    throw new Error('Theme preference must contain exactly backgroundColor and fontColor properties');
  }
  
  const backgroundColor = validateHexColor(themePreference.backgroundColor, 'Background color');
  const fontColor = validateHexColor(themePreference.fontColor, 'Font color');
  
  if (backgroundColor === fontColor) {
    throw new Error('Background color and font color cannot be the same');
  }
  
  // Validate role
  if (!role || typeof role !== 'string') {
    throw new Error('Role must be a valid string');
  }
  role = role.toLowerCase().trim();
  if (role !== 'admin' && role !== 'user') {
    throw new Error('Role must be either admin or user');
  }
  
  // Check for duplicate userId (case-insensitive)
  const userCollection = await users();
  const existingUser = await userCollection.findOne({ 
    userId: { $regex: new RegExp(`^${userId}$`, 'i') } 
  });
  
  if (existingUser) {
    throw new Error('There is already a user with that userId');
  }
  
  // Hash password
  const saltRounds = 16;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Create user object
  const newUser = {
    firstName,
    lastName,
    userId: userId.toLowerCase(), // Store as lowercase
    password: hashedPassword,
    favoriteQuote,
    themePreference: {
      backgroundColor,
      fontColor
    },
    role
  };
  
  // Insert user
  const insertResult = await userCollection.insertOne(newUser);
  
  if (!insertResult.insertedId) {
    throw new Error('Failed to insert user');
  }
  
  return { registrationCompleted: true };
};

export const signInUser = async (userId, password) => {
  // Validate inputs
  if (!userId || !password) {
    throw new Error('Both userId and password must be supplied');
  }
  
  userId = validateString(userId, 'User ID', 5, 10);
  password = validatePassword(password);
  
  // Find user (case-insensitive)
  const userCollection = await users();
  const user = await userCollection.findOne({ 
    userId: { $regex: new RegExp(`^${userId}$`, 'i') } 
  });
  
  if (!user) {
    throw new Error('Either the userId or password is invalid');
  }
  
  // Compare password
  const passwordMatch = await bcrypt.compare(password, user.password);
  
  if (!passwordMatch) {
    throw new Error('Either the userId or password is invalid');
  }
  
  // Return user data (without password)
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user.userId,
    favoriteQuote: user.favoriteQuote,
    themePreference: user.themePreference,
    role: user.role
  };
};