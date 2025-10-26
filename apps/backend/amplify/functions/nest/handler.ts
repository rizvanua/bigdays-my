// amplify/functions/nest/handler.ts
import { createExpressApp } from './express-app';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: any;

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    const expressApp = createExpressApp();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  
  return cachedServer(event, context);
};