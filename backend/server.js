import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";

dotenv.config();

connectdb();

const app = express();
app.use(express.json());



app.get("/", (req, res) => {
    res.send("API is running...");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.blue)
)
