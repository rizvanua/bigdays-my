// API service for calling the backend API Gateway
import { configService } from './config';

// Get API URL from configuration service
const API_BASE_URL = configService.getApiBaseUrl();

export interface HealthResponse {
  message: string;
  timestamp: string;
  path: string;
  method: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getHealth(): Promise<HealthResponse> {
    return this.makeRequest<HealthResponse>('/api/health');
  }

  // Add more API methods as needed
  async getApiStatus(): Promise<{ status: string; timestamp: string }> {
    try {
      const health = await this.getHealth();
      return {
        status: 'healthy',
        timestamp: health.timestamp
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;