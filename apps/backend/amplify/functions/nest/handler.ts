// amplify/functions/nest/handler.ts
export const handler = async (event: any, context: any) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    body: JSON.stringify({
      message: 'Hello from BigDays API!',
      timestamp: new Date().toISOString(),
      path: event.path || '/',
      method: event.httpMethod || 'GET'
    })
  };
};