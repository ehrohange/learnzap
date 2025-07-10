import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users/users";
import authRouter from "./routes/auth/auth";
import { connectDB } from "./config/db";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter);


connectDB().then(
    () => {
        app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
    }
)
