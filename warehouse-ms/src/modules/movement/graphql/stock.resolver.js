import MovementController from "../controllers/movement.controller.js";
const controller = new MovementController();

export const Query = {
  productMovements: async (_, payload) =>
    controller.productMovements(payload),
};
