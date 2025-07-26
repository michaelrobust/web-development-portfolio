import authRoutes from './auth_routes.js';

const configRoutes = (app) => {
  app.use('/', authRoutes);
  
  app.use('*', (req, res) => {
    res.status(404).render('error', {
      title: 'Error',
      error: 'Page not found'
    });
  });
};

export default configRoutes;