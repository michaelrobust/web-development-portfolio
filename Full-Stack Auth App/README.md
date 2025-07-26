# Full-Stack Auth App

## 📚 Overview

**Full-Stack Auth App** is a secure, full-stack Node.js/Express web application that provides user authentication, session management, and role-based access control. It features custom middleware, theme personalization, and full validation on both client and server sides.

---

## 📌 Features

- ✅ User Registration and Secure Login
- 🔒 Password hashing with `bcrypt`
- 🎭 Role-based access: `admin` vs `user`
- 🌈 Personalized themes (background & font colors)
- 🧠 Session tracking with `express-session`
- 🧱 Custom middleware for logging, protection & redirection
- 🖥️ Client-side and server-side validation
- 📆 Real-time timestamp display
- 📝 Structured logging for every request

---

## 🗂️ Project Structure
Full-Stack Auth App
├── package.json
├── app.js
├── config/
│   ├── mongoCollections.js
│   ├── mongoConnection.js
│   └── settings.js
├── data/
│   └── users.js
├── public/
│   ├── css/
│   │   └── sitestyles.css
│   └── js/
│       └── form_validate.js
├── routes/
│   ├── index.js
│   └── auth_routes.js
└── views/
    ├── administrator.handlebars
    ├── error.handlebars
    ├── signinuser.handlebars
    ├── signoutuser.handlebars
    ├── signupuser.handlebars
    ├── user.handlebars
    └── layouts/
        └── main.handlebars


---

## 🧠 Technologies Used

- **Node.js** / **Express**
- **MongoDB** with native driver
- **bcrypt** for password hashing
- **express-session** for session tracking
- **Handlebars.js** for server-side views
- **Vanilla JS** for form validation
- **CSS** for theming and layout

---

## 🔐 Authentication Logic

- Passwords are hashed using bcrypt before being saved
- Session cookies maintain login state (`AuthenticationState`)
- Authenticated users are redirected by role:
  - `admin` → `/administrator`
  - `user` → `/user`

---

## 🧱 Middleware Responsibilities

- Logs method, path, timestamp, and auth status
- Prevents access to login/signup pages if already signed in
- Protects routes based on login state and role
- Applies dynamic redirection from `/` based on session

---

## 🎨 Theming

Each user selects:
- `backgroundColor` (hex)
- `fontColor` (hex, must differ)

These preferences are stored in session and dynamically applied to all views for authenticated users.

---

## 🧪 Validation Summary

| Field            | Validation Rules                                                   |
|------------------|---------------------------------------------------------------------|
| First/Last Name  | 2–25 chars, alphabet only, trimmed                                  |
| User ID          | 5–10 chars, alphabet only, unique (case-insensitive), trimmed       |
| Password         | ≥8 chars, 1 uppercase, 1 number, 1 special character, no spaces     |
| Confirm Password | Must match password (client-side)                                  |
| Favorite Quote   | 20–255 characters, non-empty, trimmed                               |
| Theme Colors     | Valid hex, and background ≠ font color                              |
| Role             | Must be either `"admin"` or `"user"`                                |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install bcrypt express express-session mongodb express-handlebars


{
  "name": "full-stack-auth-app",
  "version": "1.0.0",
  "description": "Authentication and role-based access system",
  "main": "app.js",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  },
  "author": "YuKaiYeh",
  "license": "MIT"
}


3. Start the Server



📂 MongoDB Structure
	•	Database: YuKaiYeh_lab10
	•	Collection: users

Example document:
{
  firstName: "John",
  lastName: "Doe",
  userId: "johndoe",
  password: "<hashed-password>",
  favoriteQuote: "The purpose of life is a life of purpose.",
  themePreference: {
    backgroundColor: "#ffffff",
    fontColor: "#000000"
  },
  role: "admin"
}
