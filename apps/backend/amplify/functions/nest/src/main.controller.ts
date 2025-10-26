// amplify/functions/nest/src/main.controller.ts
import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";

@Controller()
export class MainController {
  @Get()
  getHello(@Req() req: Request) {
    return {
      message: 'Hello from BigDays API!',
      timestamp: new Date().toISOString(),
      path: req.path || '/',
      method: req.method || 'GET'
    };
  }
}
