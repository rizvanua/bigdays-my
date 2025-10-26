// Simple test to verify configuration is working
import { configService } from '../config';

// Test configuration loading
console.log('🔧 Configuration Test:');
console.log('Environment:', configService.getConfig().environment);
console.log('API Base URL:', configService.getApiBaseUrl());
console.log('Is Development:', configService.isDevelopment());
console.log('Is Production:', configService.isProduction());
console.log('Debug Enabled:', configService.isDebugEnabled());

export {};
