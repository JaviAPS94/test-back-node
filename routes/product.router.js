//En este archivo vamos a definir los servicios (ENDPOINT) y vamos a utilizar nuestro modelo para hacer operaciones
//en nuestra BDD
import express from "express";
import { getAllProducts, getProductById, getProductsByFilters, getProductsStatistics, saveProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", saveProduct);
router.get("/", getAllProducts);
router.get("/by-filters", getProductsByFilters);
router.get("/statistics", getProductsStatistics);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);

export default router;
