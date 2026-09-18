import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./app/config/db.js";

// Routers
import authRouter from "./app/routes/auth.routes.js";
import { apiError } from "./app/utils/error.js";
import noteRouter from "./app/routes/note.routes.js"

const app = express();
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter)

        
app.use(apiError)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
