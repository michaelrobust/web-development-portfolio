// Setup server, session and middleware here.
import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import configRoutes from './routes/index.js';

const app = express();

// Configure handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/public', express.static('public'));

// Session configuration
app.use(session({
  name: 'AuthenticationState',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false
}));

// Middleware #1: Logging middleware for all requests
app.use((req, res, next) => {
  const timestamp = new Date().toUTCString();
  const method = req.method;
  const route = req.originalUrl;
  
  let authStatus = '(Non-Authenticated)';
  if (req.session.user) {
    if (req.session.user.role === 'admin') {
      authStatus = '(Authenticated Administrator User)';
    } else {
      authStatus = '(Authenticated User)';
    }
  }
  
  console.log(`[${timestamp}]: ${method} ${route} ${authStatus}`);
  next();
});

// Middleware #2: Root route redirect middleware
app.use('/', (req, res, next) => {
  if (req.path === '/') {
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/administrator');
      } else {
        return res.redirect('/user');
      }
    } else {
      return res.redirect('/signinuser');
    }
  }
  next();
});

// Middleware #3: Sign in route protection
app.use('/signinuser', (req, res, next) => {
  if (req.method === 'GET') {
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/administrator');
      } else {
        return res.redirect('/user');
      }
    }
  }
  next();
});

// Middleware #4: Sign up route protection
app.use('/signupuser', (req, res, next) => {
  if (req.method === 'GET') {
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/administrator');
      } else {
        return res.redirect('/user');
      }
    }
  }
  next();
});

// Middleware #5: User route protection
app.use('/user', (req, res, next) => {
  if (req.method === 'GET') {
    if (!req.session.user) {
      return res.redirect('/signinuser');
    }
  }
  next();
});

// Middleware #6: Administrator route protection
app.use('/administrator', (req, res, next) => {
  if (req.method === 'GET') {
    if (!req.session.user) {
      return res.redirect('/signinuser');
    }
    if (req.session.user.role !== 'admin') {
      return res.status(403).render('error', {
        title: 'Error',
        error: 'You do not have permission to view this page.',
        userLink: true
      });
    }
  }
  next();
});

// Middleware #7: Sign out route protection
app.use('/signoutuser', (req, res, next) => {
  if (req.method === 'GET') {
    if (!req.session.user) {
      return res.redirect('/signinuser');
    }
  }
  next();
});

// Configure routes
configRoutes(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});