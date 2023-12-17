import userRoutes from './users.js';

import { application } from 'express';

const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        // Landing page
        res.status(200).render('pages/landing', {title: 'Landing Page'});
    });
    app.use('/usersData', userRoutes);
    // app.use('/api', apiRoutes);

   //  app.use('*', (req, res) => {
   //      res.status(404).render('pages/error', {title: 'Error', error: 'Route not found'});
   //  });
};

export default constructorMethod;