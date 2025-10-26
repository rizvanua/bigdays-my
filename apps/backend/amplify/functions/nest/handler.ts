// amplify/functions/nest/handler.ts
import { bootstrapNest } from './nest-app';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: any;

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    const expressApp = await bootstrapNest();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  
  return cachedServer(event, context);
};