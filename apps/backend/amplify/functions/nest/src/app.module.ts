// amplify/functions/nest/src/app.module.ts
import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { MainController } from "./main.controller";
// import { UsersController } from "./users.controller";

@Module({ controllers: [HealthController, MainController] })
export class AppModule {}