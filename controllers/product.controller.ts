import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Product from "../models/product.model";
import User from "../models/user.model";

/**
 * Register new user
 * @param req
 * @param res
 */

const registerNewUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
};

/**
 * User Login
 * @param req
 * @param res
 * @returns
 */

const userLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const token = jwt.sign({ userId: user._id }, "your-secret-key", {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

/**
 * @param req
 * @param res
 * get all all Products
 */

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get Product using id
 * @param req
 * @param res
 */

const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Add produuct
 * @param req
 * @param res
 */

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * update product by id
 * @param req
 * @param res
 * @returns if product Id not available then return Product not found
 */

const updateProduct = async (req: Request, res: Response) => {
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
};

/**
 * delete product by id
 * @param req
 * @param res
 * @returns if product Id not available then return Product not found
 */

const deleteProduct = async (req: Request, res: Response) => {
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
};

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    registerNewUser,
    userLogin,
};
