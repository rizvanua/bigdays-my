// amplify/functions/nest/express-app.ts
import express from "express";
import { json, urlencoded } from "express";

export function createExpressApp() {
  const app = express();

  // Middleware
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true }));

  // CORS middleware
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    next();
  });

  // Routes
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello from BigDays API!',
      timestamp: new Date().toISOString(),
      path: req.path || '/',
      method: req.method || 'GET'
    });
  });

  app.get('/api', (req, res) => {
    res.json({
      message: 'Hello from BigDays API!',
      timestamp: new Date().toISOString(),
      path: req.path || '/api',
      method: req.method || 'GET'
    });
  });

  app.get('/api/health', (req, res) => {
    res.json({ 
      ok: true, 
      ts: Date.now() 
    });
  });

  app.get('/health', (req, res) => {
    res.json({ 
      ok: true, 
      ts: Date.now() 
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method} ${req.originalUrl} not found`
    });
  });

  return app;
}
