import { Response, Request } from "express";
import Product from "../models/product.model";

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

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
