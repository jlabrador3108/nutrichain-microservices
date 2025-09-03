import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { orderSchema } from "../dtos/create-order.dto.js";
import { validate } from "../../../common/middlewares/validate.js";

const router = Router();
const controller = new OrderController();

router.post("/", validate(orderSchema), controller.createOrder.bind(controller));
router.get("/", controller.getOrders.bind(controller));
router.get("/:id", controller.getOrderById.bind(controller));

export default router;

