import express from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    registerNewUser,
    userLogin,
} from "../controllers/product.controller";
import verifyToken from "../middleware/authmiddleware";

const router = express.Router();

// register
router.post("/register", registerNewUser);
// user login
router.post("/userLogin", userLogin);

router.post("/", verifyToken, createProduct);
// get product
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProduct);

//update product

router.put("/:id", verifyToken, updateProduct);

// delete a product

router.delete("/:id", verifyToken, deleteProduct);

export default router;
