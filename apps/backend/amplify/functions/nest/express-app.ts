// amplify/functions/nest/express-app.ts
import express from "express";
import { json, urlencoded } from "express";
import { DynamoDBService, getSchemaForType, itemSchemas } from "../../lib/services";

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

  // Path normalization middleware - strip /api prefix if present
  // This handles cases where API Gateway forwards paths with /api prefix
  // app.use((req, res, next) => {
  //   if (req.path.startsWith('/api/') || req.path === '/api') {
  //     const newPath = req.path.replace(/^\/api/, '') || '/';
  //     const query = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  //     req.url = newPath + query;
  //   }
  //   next();
  // });
console.log('Hello from BigDays API!');
  // Routes
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello from BigDays API!',
      timestamp: new Date().toISOString(),
      path: req.path || '/',
      method: req.method || 'GET'
    });
  });

  

  

  app.get('/health', (req, res) => {
    res.json({ 
      ok: true, 
      ts: Date.now(),
      debug: {
        path: req.path,
        originalUrl: req.originalUrl,
        url: req.url
      }
    });
  });

  // DynamoDB example routes
  // Create or update an item with schema validation
  app.post('/items', async (req, res) => {
    try {
      const { id, type, ...rest } = req.body;
      
      if (!id || !type) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'id and type are required'
        });
      }

      const item = {
        id,
        type,
        ...rest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Get schema based on type, or use default
      const schema = getSchemaForType(type);
      
      // Validate and save
      await DynamoDBService.putItem(item, schema);
      res.status(201).json({ success: true, item });
    } catch (error: any) {
      console.error('Error creating item:', error);
      
      // Check if it's a validation error
      if (error.message?.startsWith('Validation failed:')) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.message
        });
      }

      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  // Type-specific routes with explicit schema validation
  app.post('/items/venue', async (req, res) => {
    try {
      const item = {
        ...req.body,
        type: 'venue',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await DynamoDBService.putItem(item, itemSchemas.venue);
      res.status(201).json({ success: true, item });
    } catch (error: any) {
      if (error.message?.startsWith('Validation failed:')) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.message
        });
      }
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  app.post('/items/booking', async (req, res) => {
    try {
      const item = {
        ...req.body,
        type: 'booking',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await DynamoDBService.putItem(item, itemSchemas.booking);
      res.status(201).json({ success: true, item });
    } catch (error: any) {
      if (error.message?.startsWith('Validation failed:')) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.message
        });
      }
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  app.post('/items/profile', async (req, res) => {
    try {
      const item = {
        ...req.body,
        type: 'profile',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await DynamoDBService.putItem(item, itemSchemas.profile);
      res.status(201).json({ success: true, item });
    } catch (error: any) {
      if (error.message?.startsWith('Validation failed:')) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.message
        });
      }
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  app.post('/items/contact', async (req, res) => {
    try {
      const item = {
        ...req.body,
        type: 'contact',
        status: req.body.status || 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await DynamoDBService.putItem(item, itemSchemas.contact);
      res.status(201).json({ success: true, item });
    } catch (error: any) {
      if (error.message?.startsWith('Validation failed:')) {
        return res.status(400).json({
          error: 'Validation Error',
          message: error.message
        });
      }
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  // Get an item by id and type
  app.get('/api/items/:id/:type', async (req, res) => {
    try {
      const { id, type } = req.params;
      const item = await DynamoDBService.getItem(id, type);
      
      if (!item) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Item not found'
        });
      }

      res.json({ success: true, item });
    } catch (error: any) {
      console.error('Error getting item:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  // Update an item
  app.put('/api/items/:id/:type', async (req, res) => {
    try {
      const { id, type } = req.params;
      const updates = {
        ...req.body,
        updatedAt: new Date().toISOString(),
      };

      await DynamoDBService.updateItem(id, type, updates);
      const updatedItem = await DynamoDBService.getItem(id, type);
      
      res.json({ success: true, item: updatedItem });
    } catch (error: any) {
      console.error('Error updating item:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  // Delete an item
  app.delete('/api/items/:id/:type', async (req, res) => {
    try {
      const { id, type } = req.params;
      await DynamoDBService.deleteItem(id, type);
      
      res.json({ success: true, message: 'Item deleted' });
    } catch (error: any) {
      console.error('Error deleting item:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });

  // Query items by id (and optionally filter by type prefix)
  app.get('/api/items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { typePrefix } = req.query;
      
      const items = await DynamoDBService.queryItems(
        id,
        typePrefix as string | undefined
      );
      
      res.json({ success: true, items, count: items.length });
    } catch (error: any) {
      console.error('Error querying items:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
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
