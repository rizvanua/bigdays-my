# Shared Libraries

This directory contains shared code that can be reused across multiple Lambda functions.

## Structure

```
lib/
  services/          # Shared service classes
    dynamodb-service.ts
    index.ts         # Barrel export for easy imports
```

## Usage

Import shared services in your Lambda functions:

```typescript
// Option 1: Direct import
import { DynamoDBService } from "../../lib/services/dynamodb-service";

// Option 2: Using index (cleaner)
import { DynamoDBService } from "../../lib/services";
```

## Adding New Shared Services

1. Create your service file in `lib/services/`
2. Export it from `lib/services/index.ts`
3. Import it in your functions using relative paths

## Note

- These files are bundled with each function that imports them
- Ensure all dependencies are included in each function's `package.json`
- Use relative paths from function directories (e.g., `../../lib/services/`)

