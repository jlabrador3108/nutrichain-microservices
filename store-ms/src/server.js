import express from "express";
import cors from "cors";
import { createServer } from "http";
import { loadRoutes } from "./common/routes.index.js";
import { allExceptionsHandler } from "./common/middlewares/all-exceptions.filter.js";
import { responseInterceptor } from "./common/middlewares/response.interceptor.js";

class Server {
  app;
  port;
  server;

  constructor() {
    this.app = express();

    this.port = process.env.PORT || "4004";

    this.server = createServer(this.app);

    this.middlewares();

    loadRoutes(this.app);

    this.app.use(allExceptionsHandler);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(responseInterceptor);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server store-ms running on port: ${this.port}`);
    });
  }
}

export default Server;
