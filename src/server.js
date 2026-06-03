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

app.use(cors()); //Enable CORS
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter); //Enable rate limiting

app.use("/api/notes", noteRoutes);

//Connect to the database and start the server

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
