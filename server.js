import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import booksRoute from "./routes/books.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import {connect} from "./db/connect.js"

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json());
app.use( 
    
  cors({
    origin: "http://localhost:5234",
    credentials: true,
  }),
);


/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", booksRoute);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

/* MongoDB connection */
connect();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});
