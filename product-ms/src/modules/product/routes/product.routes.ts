import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validate } from "../../../common/middlewares/validate";
import { CreateProductSchema } from "../dtos/create-product.dto";
import { UpdateProductSchema } from "../dtos/update-product.dto";
import { FindElsProductSchema } from "../dtos/find-els-product.dto";

const controller = new ProductController();
const router = Router();

router.get("/", controller.getAll.bind(controller));
router.get("/els", validate(FindElsProductSchema, "query"),controller.findEls.bind(controller));
router.get("/sku/:sku", controller.getBySku.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", validate(CreateProductSchema), controller.create.bind(controller));
router.patch("/:id", validate(UpdateProductSchema), controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));


export default router;
