import mongoose from "mongoose";
import Product from "./models/product.model";

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
    res.send("Hello from Node API 3000 amit");
});

app.post(
    "/api/produucts",
    async (
        req: any,
        res: { send: (arg0: string) => void; status: (arg0: Number) => any }
    ) => {
        try {
            const product = await Product.create(req.body);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
);

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
