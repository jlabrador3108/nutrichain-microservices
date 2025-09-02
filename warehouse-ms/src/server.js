import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema.js";
import { ResponseHandler } from "./common/utils/response-handler.js";

async function start() {
  const app = express();

  const server = new ApolloServer({
    schema,
    formatResponse: (response, requestContext) => {
      if(response.errors){
        return response.errors[0]
      }
      return ResponseHandler.ok({
        message: response.message || "Request successful2",
        ...response,
      });
    },
    formatError: (err) => {
      console.error("[GraphQL Error]", err.extensions?.exception?.errors || err.message);
      return {
        // success: false,
        // statusCode: err.extensions?.code === "BAD_USER_INPUT" ? 400 : 500,
        // message: err.message,
        errors: err.extensions?.exception?.errors || err.message,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.get("/health", async (_req, res) => {
    try {
      // ping Mongo via prisma
      await prisma.$runCommandRaw({ ping: 1 });
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ ok: false });
    }
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

start().catch((e) => {
  console.error("Server start error", e);
  process.exit(1);
});
