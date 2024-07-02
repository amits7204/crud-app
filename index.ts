import mongoose from "mongoose";
import Product from "./models/product.model";

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
    res.send("Hello from Node API 3000 amit");
});

app.get("/api/products", async (req: any, res: any) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/product/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

app.post(
    "/api/products",
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

/**
 * update product by id
 */

app.put("/api/product/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ mesage: "Product not found" });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error: any) {
        res.status(500).json({ message: error?.message });
    }
});

/**
 *  delete product by id
 */

app.delete("/api/product/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ mesage: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
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
