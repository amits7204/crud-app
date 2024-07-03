import express from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", createProduct);

//update product

router.put("/:id", updateProduct);

// delete a product

router.delete("/:id", deleteProduct);

export default router;
