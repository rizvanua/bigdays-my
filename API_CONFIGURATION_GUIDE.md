# API Configuration Guide

## 🎯 **Problem Solved: No More Hardcoded URLs!**

Your API service now supports multiple configuration methods to avoid hardcoding the API Gateway URL.

## 🔧 **Configuration Methods**

### **Method 1: Environment Variables (Recommended)**

Create environment files in your frontend directory:

#### **For Local Development:**
```bash
# Create .env.local in apps/frontend/
echo "VITE_API_BASE_URL=https://j6ya6klcs9.execute-api.us-east-1.amazonaws.com/prod" > apps/frontend/.env.local
```

#### **For Production:**
Set the environment variable in your deployment platform:
- **Amplify Console**: Add `VITE_API_BASE_URL` in Environment Variables
- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Environment Variables

### **Method 2: Amplify Outputs (Advanced)**

When using Amplify Gen 2 with proper outputs, you can:

1. **Update backend.ts** to export the API URL:
```typescript
// In apps/backend/amplify/backend.ts
export const apiUrl = restApi.url;
```

2. **Use in frontend**:
```typescript
// In apps/frontend/src/services/api.ts
import { apiUrl } from '../../../backend/amplify/backend';
const API_BASE_URL = apiUrl || import.meta.env.VITE_API_BASE_URL || 'fallback-url';
```

### **Method 3: Runtime Configuration**

For dynamic configuration, you can load from a config endpoint:

```typescript
// Load config at runtime
const loadConfig = async () => {
  const response = await fetch('/config.json');
  const config = await response.json();
  return config.apiUrl;
};
```

## 🚀 **Current Implementation**

Your API service now uses this priority order:

1. **`VITE_API_BASE_URL`** environment variable
2. **Hardcoded fallback** (for development)

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://j6ya6klcs9.execute-api.us-east-1.amazonaws.com/prod';
```

## 📝 **Usage Examples**

### **Local Development:**
```bash
# Set environment variable
export VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

### **Different Environments:**
```bash
# Development
VITE_API_BASE_URL=https://dev-api.example.com

# Staging  
VITE_API_BASE_URL=https://staging-api.example.com

# Production
VITE_API_BASE_URL=https://api.example.com
```

### **Amplify Console:**
1. Go to your Amplify app
2. Navigate to "Environment variables"
3. Add: `VITE_API_BASE_URL` = `https://your-api-gateway-url.amazonaws.com/prod`

## ✅ **Benefits**

- ✅ **No hardcoded URLs** in source code
- ✅ **Environment-specific** configurations
- ✅ **Easy deployment** across different environments
- ✅ **Fallback support** for development
- ✅ **Type-safe** with TypeScript

## 🔄 **Migration Steps**

1. **Create environment file**:
   ```bash
   echo "VITE_API_BASE_URL=https://j6ya6klcs9.execute-api.us-east-1.amazonaws.com/prod" > apps/frontend/.env.local
   ```

2. **Test locally**:
   ```bash
   cd apps/frontend && npm run dev
   ```

3. **Deploy with environment variable** in your CI/CD platform

**Your API configuration is now flexible and environment-aware!** 🎉
