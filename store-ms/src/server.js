import express from "express";
import cors from "cors";
import { createServer } from "http";
import { allExceptionsHandler } from "./common/middlewares/all-exceptions.filter.js";
import { responseInterceptor } from "./common/middlewares/response.interceptor.js";
import { loadRoutes } from "./common/routes/index.js";
import { startQueueProcessor } from "./common/queue/simple-redis-queue.js";

class Server {
  app;
  port;
  server;

  constructor() {
    this.app = express();

    this.port = process.env.PORT || "4004";

    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(responseInterceptor);
  }

  async init() {
    // cargar rutas async
    await loadRoutes(this.app);

    // middleware de errores al final
    this.app.use(allExceptionsHandler);

    this.server = createServer(this.app);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server store-ms running on port: ${this.port}`);
      startQueueProcessor();
    });
  }
}

export default Server;
