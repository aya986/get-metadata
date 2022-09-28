import config from "./config";
import express, { Express } from "express";
import indexRouter from "./routes/index";

async function runServer() {
  const app: Express = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.set("port", config.port);
  app.listen(config.port);
  console.log(`🚀  Server ready at ${config.port}`);

  
  app.use("/", indexRouter);
}

runServer();
