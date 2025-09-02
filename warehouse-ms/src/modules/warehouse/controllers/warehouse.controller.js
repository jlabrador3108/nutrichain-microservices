import WarehouseService from '../services/warehouse.service.js';

class WarehouseController {
  constructor() {
    this.service = new WarehouseService();
  }

  async create(payload) {
    return this.service.create(payload);
  }

  async list() {
    return this.service.findAll();
  }

  async get(id) {
    return this.service.findById(id);
  }

  async update(id, payload) {
    return this.service.update(id, payload);
  }

  async delete(id) {
    return this.service.delete(id);
  }
}

export default WarehouseController;
