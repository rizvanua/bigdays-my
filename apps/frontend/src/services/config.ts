// Configuration service for managing environment-specific settings
export interface AppConfig {
  apiBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
  debug: boolean;
}

class ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): AppConfig {
    const environment = this.getEnvironment();
    
    return {
      apiBaseUrl: this.loadApiBaseUrl(),
      environment,
      debug: environment === 'development',
    };
  }

  private getEnvironment(): 'development' | 'staging' | 'production' {
    const env = (import.meta as any).env?.MODE || 'production';
    
    if (env === 'development') return 'development';
    if (env === 'staging') return 'staging';
    return 'production';
  }

  private loadApiBaseUrl(): string {
    // Priority order:
    // 1. Environment variable
    // 2. Environment-specific defaults
    // 3. Fallback to hardcoded value
    
    const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
    if (envUrl) return envUrl;

    const environment = this.getEnvironment();
    
    switch (environment) {
      case 'development':
        return 'http://localhost:3000'; // Local development
      case 'staging':
        return 'https://staging-api.example.com'; // Staging environment
      case 'production':
      default:
        return 'https://j6ya6klcs9.execute-api.us-east-1.amazonaws.com/prod'; // Production
    }
  }

  public getConfig(): AppConfig {
    return { ...this.config };
  }

  public getApiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }

  public isDevelopment(): boolean {
    return this.config.environment === 'development';
  }

  public isProduction(): boolean {
    return this.config.environment === 'production';
  }

  public isDebugEnabled(): boolean {
    return this.config.debug;
  }
}

// Export singleton instance
export const configService = new ConfigService();
export default configService;
