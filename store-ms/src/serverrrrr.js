import express from "express";

async function start() {
  const app = express();
  app.use(express.json());

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

  const PORT = process.env.PORT || 4004;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

start().catch((e) => {
  console.error("Server start error", e);
  process.exit(1);
});
