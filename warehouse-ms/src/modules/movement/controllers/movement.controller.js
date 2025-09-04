import { ProductMovementsService } from "../services/product-movements.service.js";


class MovementController {
  constructor() {
    this.productMovementsService = new ProductMovementsService();
  }

  async productMovements(payload) {
    return await this.productMovementsService.productMovements(payload);
  }
}

export default MovementController;
