// import { enqueueOrder } from "../../../common/queue/redis-queue.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";
import { CreateOrderService } from "../services/create-order.service.js";
import { OrderService } from "../services/order.service.js";

export class OrderController {
  createService = new CreateOrderService();
  orderService = new OrderService();

  async createOrder(req, res, next) {
    try {
      const { customer, items } = req.body;
      const date = req.body.date ? new Date(date) : new Date();

      const jobId = await this.orderService.enqueueOrder({ customer, date, items });
      
      // const result = await this.createService.createOrder({
      //   customer,
      //   date,
      //   items,
      // });

      return res.json(
      ResponseHandler.ok({
        data: { jobId },
        message: "Order has been enqueued for processing",
      })
    );
      // res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getOrders(req, res, next) {
    try {
      const result = await this.orderService.getOrders();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.orderService.getOrderById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
