import express, { Request, Response} from 'express';
import "dotenv/config.js";
import https from 'https';
import * as fs from 'fs';  
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';

// ROUTER IMPORTS
import { testRoute } from './routes/test-route.js'
import { servicesRouter } from './routes/service-routes.js';
import { usersRouter} from './routes/users-routers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTERS
app.use('/test', testRoute)
app.use('/services', servicesRouter)
app.use('/users', usersRouter);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to home page for PolishByCin")
});

app.get("/test-auth", (req: Request, res: Response) => {
  console.log("response from ig auth")
  res.send("response from ig auth endpoint");
});

app.post("/sessions", (req: Request, res: Response) => {
  console.log("user session start");
  res.end();
});

app.delete("/sessions", (req: Request, res: Response) => {
  console.log("user session end");
  res.end();  
});



const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

const server = https.createServer(options, app)

server.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`);
});