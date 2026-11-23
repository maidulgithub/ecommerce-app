import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { clerkWebhook } from "./controllers/webhooks.js";
import makeAdmin from "./scripts/makeAdmin.js";
import ProductRouter from "./routes/productsRoutes.js";
import CartRouter from "./routes/cartRoutes.js";
import OrderRouter from "./routes/ordersRoutes.js";
import AddressRouter from "./routes/addressRoutes.js";

const app = express();
// connect to db
(async () => {
  await connectDB();
  // Any other server startup logic that depends on the DB connection
})(); 
  
  // Any other server startup logic that depends on the DB connection


// app.post(
//   '/api/clerk',
//   (req, res, next) => {
//     console.log('=== /api/clerk posthit ===', req.method, req.headers['content-type']);
//     next();
//   },
//   express.raw({ type: 'application/json' }),
//   clerkWebhook
// ); //app_3LedpJ4Wrbas3pRuWYVmPiw9Jrr. prj_Tlc1yZ1HKtjnX5Go5kkhgRaIKDYq

//app.post('api/clerk',express.raw({type: "application/json"}),clerkWebhook)

app.post('/api/clerk', express.raw({ type: 'application/json' }), clerkWebhook);

// Middleware
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

const port = process.env.PORT || 3000;
(async () => {
await makeAdmin();  
})(); 

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live1!');
});
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/addresses", AddressRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;