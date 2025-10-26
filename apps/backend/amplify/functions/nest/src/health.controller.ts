// amplify/functions/nest/src/health.controller.ts
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  ok() { return { ok: true, ts: Date.now(), message: "I/m healthy" }; }
}
