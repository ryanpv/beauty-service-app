import express, { Request, Response} from 'express';
import "dotenv/config.js";
import https from 'https';
import * as fs from 'fs';  
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: [
    'http://localhost:3000'
  ],
  credentials: true,
}))
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
  cookie: { maxAge: 30000 }
  // cookie: { maxAge: 24 * 30 * 60  * 60 * 1000 } // 30 days
}))

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

app.post('/password-resets', requestNewPassword)
app.get('/password-resets/:token', passwordResetTokenCheck)
app.put('/password-resets/:token', passwordReset)

/////////////////////////
// app.post("/sessions", (req: Request, res: Response) => {
//   console.log("user session start");
//   res.end();
// });

// app.delete("/sessions", (req: Request, res: Response) => {
//   console.log("user session end");
//   res.end();  
// });



const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

const server = https.createServer(options, app)

server.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`);
});