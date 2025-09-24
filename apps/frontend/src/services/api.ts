// services/api.ts
import { invoke } from 'aws-amplify/api';

export interface ApiResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export interface ApiRequest {
  httpMethod: string;
  path: string;
  headers?: Record<string, string>;
  body?: string;
  queryStringParameters?: Record<string, string>;
}

class ApiService {
  private readonly functionName = 'nestApi';

  async callLambda(payload: ApiRequest): Promise<ApiResponse> {
    try {
      const response = await invoke({
        apiName: this.functionName,
        path: '/',
        options: {
          body: payload,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });

      return response as ApiResponse;
    } catch (error) {
      console.error('Error calling Lambda function:', error);
      throw error;
    }
  }

  // Convenience methods for common operations
  async getHealth(): Promise<ApiResponse> {
    return this.callLambda({
      httpMethod: 'GET',
      path: '/api/health',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async testApi(data?: any): Promise<ApiResponse> {
    return this.callLambda({
      httpMethod: 'POST',
      path: '/api/test',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async customRequest(method: string, path: string, data?: any): Promise<ApiResponse> {
    return this.callLambda({
      httpMethod: method,
      path,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

export const apiService = new ApiService();
export default apiService;
