
import express from 'express'; // Express web server framework
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import configRoutes from './spotify/routes/index.js';
import configRoutes2 from './routes/index.js';

import { fileURLToPath } from 'url';
import path from 'path';



// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);
// const stat = express.static(dirname+"/public")



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stat = express.static(path.join(__dirname, '/public'));

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
      saveUninitialized: true,
      
   }));


configRoutes(app);
configRoutes2(app);
app.listen(3000, () => {
      console.log("We've now got a server!");
      console.log('Your routes will be running on http://localhost:3000');
})