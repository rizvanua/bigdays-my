// amplify/functions/nest/src/app.module.ts
import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
// import { UsersController } from "./users.controller";

@Module({ controllers: [HealthController] })
export class AppModule {}