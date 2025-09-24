// amplify/backend.ts
import { defineBackend } from "@aws-amplify/backend";
import { defineFunction, secret } from "@aws-amplify/backend";

const nestApiFn = defineFunction({
  name: "nest-api",
  entry: "./functions/nest/handler.ts",
  environment: {
    NODE_OPTIONS: "--enable-source-maps",
    DB_SECRET: secret("DB_SECRET"), // optional
  },
  timeoutSeconds: 15,
  memoryMB: 1024,
});

export default defineBackend({
  nestApiFn,
});
