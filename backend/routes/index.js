import userRoutes from './users.js';



const constructorMethod = (app) => {
    
    app.use('/usersData', userRoutes);
    
};

export default constructorMethod;