import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhook } from "./controllers/webhooks.js";

const app = express();
// connect to db
// (async () => {
//   await connectDB();
//   // Any other server startup logic that depends on the DB connection
// })(); 
  
  // Any other server startup logic that depends on the DB connection


// app.post(
//   '/api/clerk',
//   (req, res, next) => {
//     console.log('=== /api/clerk posthit ===', req.method, req.headers['content-type']);
//     next();
//   },
//   express.raw({ type: 'application/json' }),
//   clerkWebhook
// );

//app.post('api/clerk',express.raw({type: "application/json"}),clerkWebhook)

app.post('/api/clerk', express.raw({ type: 'application/json' }), clerkWebhook);

// Middleware
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live1!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;