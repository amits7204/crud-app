import mongoose from "mongoose";
import Product from "./models/product.model";
import ProductRoute from "./routes/product.route";

const express = require("express");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", ProductRoute);

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
    res.send("Hello from Node API 3000 amit");
});

mongoose
    .connect(
        "mongodb+srv://amits7204:bbnaFAs1HNQsoOA2@tododb.263oukx.mongodb.net/?retryWrites=true&w=majority&appName=TodoDB"
    )
    .then(() => {
        console.log("Connected!");
        app.listen(3000, () => {
            console.log("server is running on port 3000");
        });
    })
    .catch(() => {
        console.log("connection failed");
    });
