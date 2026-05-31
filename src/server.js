import express from "express";
import noteRoutes from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Middlewares:

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use(cors());

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
