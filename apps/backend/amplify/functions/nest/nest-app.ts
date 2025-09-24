// amplify/functions/nest/nest-app.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { json, urlencoded } from "express";
import * as express from "express";

export async function bootstrapNest() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new (require("@nestjs/platform-express").ExpressAdapter)(expressApp));
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true }));
  app.enableCors({ 
    origin: true, // Allow all origins for development - configure properly for production
    credentials: true 
  });
  await app.init();
  return expressApp;
}
