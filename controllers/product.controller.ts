import Product from "../models/product.model";

const getProducts = async (req: any, res: any) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getProduct = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req: any, res: any) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * update product by id
 */
const updateProduct = async (req: any, res: any) => {
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
 *  delete product by id
 */

const deleteProduct = async (req: any, res: any) => {
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
