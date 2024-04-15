import express, { Request, Response} from 'express';
import https from 'https';
import cookieParser from 'cookie-parser';
import "dotenv/config.js";
import * as fs from 'fs';  
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import { ModifiedSession } from './controllers/login.js';

// ROUTER IMPORTS
import { testRoute } from './routes/test-route.js'
import { servicesRouter } from './routes/service-routes.js';
import { serviceCategoryRouter } from './routes/service-category-routes.js';
import { usersRouter} from './routes/users-routes.js';
import { sessionRouter } from './routes/session-routes.js';

// CONTROLLERS
import { getRoles } from './controllers/roles.js';
import { getServiceCategories } from './controllers/get-services-categories.js';
import { checkUserRole } from './middleware/check-user.js';
import { uploadServices } from './controllers/add-service.js';
import { pool } from './queries.js';
import { requestNewPassword } from './controllers/request-password-reset.js';
import { passwordResetTokenCheck } from './controllers/token-password-reset.js';
import { passwordReset } from './controllers/password-reset.js';
import { appointmentTimes } from './controllers/appointment-times.js';
import { contactRequest } from './controllers/contact-message.js';

// VALIDATORS
import { validateNewpassRequest } from './middleware/validators/validate-newpass-request.js';
import { validatePasswordResetToken } from './middleware/validators/validate-reset-token.js';
import { validateNewPassword } from './middleware/validators/validate-new-password.js';
import { validateContactForm } from './middleware/validators/validate-contact-form.js';


const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// app.set('trust proxy', true);

const rate_limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Request limit has been reached. Please try again later.",
  store: new MemoryStore()
});

app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3001',
    'https://beauty-service-app.onrender.com',
    'https://beauty-service-app-1.onrender.com',
    'https://www.polishbycin.com',
    'https://api.polishbycin.com'
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: new (connectPgSimple(session))({
    pool: pool,
    tableName: process.env.SESSION_TABLE
  }),
  secret: process.env.STORE_SECRET,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  rolling: true,
  // cookie: { 
  //   maxAge: 5 * 60 * 1000,
  //   secure: true
  //  } // ** REMOVE FOR PROD - 5 minutes
  cookie: { 
    maxAge: 24 * 30 * 60  * 60 * 1000, // 30 days
    secure: true
   }
}));
app.use(rate_limiter);

// if session expires/user cookie value does not match accessToken, user cookies will be cleared
app.use((req, res, next) => {
  const userCookie = req.cookies.user;
  const sessionToken = (req.session as ModifiedSession).accessToken;

  if (userCookie !== sessionToken) {
    console.log('server.js: cleared sessions from app.use');
    
    res.clearCookie('user');
    res.clearCookie('id');
    req.session.destroy((error) => {
      console.error('server.js: error with sessions', error);
    });
  }
  next();
});

// ROUTERS
app.use('/test', testRoute);
app.use('/services', servicesRouter);
app.use('/service-categories', serviceCategoryRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionRouter);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to home page for PolishByCin")
});

//////// TEST/ADMIN ROUTES
app.get("/test-auth", (req: Request, res: Response) => {
  console.log("response from ig auth")
  res.send("response from ig auth endpoint");
});

app.get('/get-roles', getRoles)

app.get('/service-categories', getServiceCategories)

app.get('/check-user', checkUserRole)
app.get('/upload-services', uploadServices)

app.post('/contact-messages', validateContactForm, contactRequest);

app.post('/password-resets', validateNewpassRequest, requestNewPassword)
app.get('/password-resets/:token', validatePasswordResetToken, passwordResetTokenCheck)
app.put('/password-resets/:token', validateNewPassword, passwordReset)

/////////////////////////
app.get('/appointment-times', appointmentTimes)

if (process.env.NODE_ENV === 'development') {
  const options = {
    key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
  };
  
  const server = https.createServer(options, app)
  
  server.listen(PORT, () => {
    console.log(`Listening on port: ${ PORT }`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`In ${ process.env.NODE_ENV }: server is listening on port ${ PORT }`);
  });
}