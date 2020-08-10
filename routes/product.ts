import { Router } from "https://deno.land/x/oak/mod.ts";
import productController from "./../controllers/products.ts";
const router = new Router();
//get all products
router.get("/api/v1/products", productController.products);
//get product details by id
router.get("/api/v1/products/:id", productController.product);
router.post("/api/v1/products", productController.save);
router.put("/api/v1/products/:id", productController.update);
router.delete("/api/v1/products/:id", productController.delete);
export default router;
