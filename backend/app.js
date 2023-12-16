// import express from 'express'; // Express web server framework
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import configRoutes from './spotify/routes/index.js';

// import { fileURLToPath } from 'url';
// import path from 'path';
// import exphbs from 'express-handlebars';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const stat = express.static(__dirname+"/public")
// /**
//  * Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string
//  */



// const app = express();
// app.use("/public",stat)


// const rewriteUnsupportedBrowserMethods = (req, res, next) => {
//    if (req.body && req.body._method) {
//       req.method = req.body._method
//       delete req.body._method
//    }
// }


// // app.use(express.static(__dirname + '/public'))

// app.use(cors())
//    .use(cookieParser())
//    .use(express.json())
//    .use(express.urlencoded({ extended: true }))
//    .use(session({
//       name: 'AuthCookie',
//       secret: 'Secret!',
//       resave: false,
//       saveUninitialized: false,
//    }));

// app.set('views', path.join(__dirname, 'spotify/views'));
// app.engine('handlebars', exphbs.engine({
//    defaultLayout: 'main',
//    layoutsDir: path.join(__dirname, 'spotify/views/layouts')
//  }));
 
//  app.set('view engine', 'handlebars');
// // app.get('/', middleware.hasCookie);
// // app.get('/users/dashboard', middleware.noCookie);



// configRoutes(app);
// app.listen(3000, () => {
//       console.log("We've now got a server!");
//       console.log('Your routes will be running on http://localhost:3000');
// })














// ... rest of your express app setup





import express from 'express'; // Express web server framework
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import configRoutes from './spotify/routes/index.js';

import { fileURLToPath } from 'url';
import path from 'path';
import exphbs from 'express-handlebars';


// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);
// const stat = express.static(dirname+"/public")



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stat = express.static(path.join(__dirname, '/public'));
/**
 
Generates a random string containing numbers and letters
@param  {number} length The length of the string
@return {string} The generated string
*/



const app = express();
app.use("/public",stat)


const rewriteUnsupportedBrowserMethods = (req, res, next) => {
   if (req.body && req.body._method) {
      req.method = req.body._method
      delete req.body._method
   }
}


// app.use(express.static(dirname + '/public'))

app.use(cors())
   .use(cookieParser())
   .use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use(session({
      name: 'AuthCookie',
      secret: 'Secret!',
      resave: false,
      saveUninitialized: false,
      
   }));




app.set('views', path.join(__dirname, 'spotify/views'));



   // app.engine('handlebars', exphbs.engine({
//    defaultLayout: 'main',
//    layoutsDir: path.join(__dirname, 'spotify/views/layouts')
//  }));
app.engine('handlebars', exphbs.engine({
   defaultLayout: 'main',
   layoutsDir: path.join(__dirname, 'spotify/views/layouts')
 }));
 
 app.set('view engine', 'handlebars');
// app.get('/', middleware.hasCookie);
// app.get('/users/dashboard', middleware.noCookie);



configRoutes(app);
app.listen(3000, () => {
      console.log("We've now got a server!");
      console.log('Your routes will be running on http://localhost:3000');
})