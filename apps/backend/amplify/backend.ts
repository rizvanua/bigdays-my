// // amplify/backend.ts
// import { defineBackend } from "@aws-amplify/backend";
// import { defineFunction, secret } from "@aws-amplify/backend";
// import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
// import { Stack } from "aws-cdk-lib";

// import {
//   CorsHttpMethod,
//   HttpApi,
//   HttpMethod,
// } from "aws-cdk-lib/aws-apigatewayv2";

// const nestApiFn = defineFunction({
//   name: "nest-api",
//   entry: "./functions/nest/handler.ts",
//   environment: {
//     NODE_OPTIONS: "--enable-source-maps",
//     DB_SECRET: secret("DB_SECRET"), // optional
//   },
//   timeoutSeconds: 15,
//   memoryMB: 1024,
// });

// const backend = defineBackend({
//   nestApiFn,
// });
// // create a new API stack
// const apiStack = backend.createStack("api-stack");

// const httpLambdaIntegration = new HttpLambdaIntegration(
//   "nest-api-integration",
//   backend.nestApiFn.resources.lambda
// );

// const httpApi = new HttpApi(apiStack, "HttpApi", {
//   apiName: "myHttpApi",
//   corsPreflight: {
//     // Modify the CORS settings below to match your specific requirements
//     allowMethods: [
//       CorsHttpMethod.GET,
//       CorsHttpMethod.POST,
//       CorsHttpMethod.PUT,
//       CorsHttpMethod.DELETE,
//     ],
//     // Restrict this to domains you trust
//     allowOrigins: ["*"],
//     // Specify only the headers you need to allow
//     allowHeaders: ["*"],
//   },
//   createDefaultStage: true,
// });

// // add routes to the API with a IAM authorizer and different methods
// httpApi.addRoutes({
//   path: "/items",
//   methods: [HttpMethod.GET, HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE],
//   integration: httpLambdaIntegration,
// });
// amplify/backend.ts
import { defineBackend } from "@aws-amplify/backend";
import { defineFunction, secret } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import {
  AuthorizationType,
  Cors,
  LambdaIntegration,
  MethodLoggingLevel,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";

const nestApiFn = defineFunction({
  name: "nest-api",
  entry: "./functions/nest/handler.ts",
  environment: {
    NODE_OPTIONS: "--enable-source-maps",
    DB_SECRET: secret("DB_SECRET"),
  },
  timeoutSeconds: 15,
  memoryMB: 1024,
});

const backend = defineBackend({
  nestApiFn,
});

// Create API Gateway stack
const apiStack = backend.createStack("api-stack");

// Create REST API
const restApi = new RestApi(apiStack, "BigDaysApi", {
  restApiName: "BigDays Wedding API",
  description: "API for BigDays Wedding Landing Page",
  deploy: true,
  deployOptions: {
    stageName: "prod",
    loggingLevel: MethodLoggingLevel.INFO,
    dataTraceEnabled: true,
    metricsEnabled: true,
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: [
      "Content-Type",
      "X-Amz-Date",
      "Authorization",
      "X-Api-Key",
      "X-Amz-Security-Token",
      "X-Amz-User-Agent",
    ],
    allowCredentials: true,
  },
});

// Create Lambda integration
const lambdaIntegration = new LambdaIntegration(
  backend.nestApiFn.resources.lambda,
  {
    requestTemplates: {
      "application/json": JSON.stringify({
        httpMethod: "$context.httpMethod",
        path: "$context.path",
        headers: {
          "$param": "$util.escapeJavaScript($input.params().header.get($param))"
        },
        queryStringParameters: {
          "$param": "$util.escapeJavaScript($input.params().querystring.get($param))"
        },
        body: "$input.body",
        isBase64Encoded: false,
        requestContext: {
          requestId: "$context.requestId",
          stage: "$context.stage",
          httpMethod: "$context.httpMethod",
          path: "$context.path",
          resourcePath: "$context.resourcePath",
          identity: {
            sourceIp: "$context.identity.sourceIp",
            userAgent: "$context.identity.userAgent"
          }
        }
      }),
    },
    integrationResponses: [
      {
        statusCode: "200",
        responseParameters: {
          "method.response.header.Access-Control-Allow-Origin": "'*'",
          "method.response.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
          "method.response.header.Access-Control-Allow-Methods": "'GET,POST,PUT,DELETE,OPTIONS'",
        },
      },
    ],
  }
);

// Add specific routes
const apiPath = restApi.root.addResource("api");

// Health endpoint
const healthPath = apiPath.addResource("health");
healthPath.addMethod("GET", lambdaIntegration, {
  methodResponses: [
    {
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
        "method.response.header.Access-Control-Allow-Headers": true,
        "method.response.header.Access-Control-Allow-Methods": true,
      },
    },
  ],
});

// Catch-all proxy route for NestJS routing
const proxyPath = apiPath.addResource("{proxy+}");
proxyPath.addMethod("ANY", lambdaIntegration, {
  methodResponses: [
    {
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
        "method.response.header.Access-Control-Allow-Headers": true,
        "method.response.header.Access-Control-Allow-Methods": true,
      },
    },
  ],
});

// Add OPTIONS method for CORS preflight
const optionsMethod = proxyPath.addMethod("OPTIONS", lambdaIntegration, {
  methodResponses: [
    {
      statusCode: "200",
      responseParameters: {
        "method.response.header.Access-Control-Allow-Origin": true,
        "method.response.header.Access-Control-Allow-Headers": true,
        "method.response.header.Access-Control-Allow-Methods": true,
      },
    },
  ],
});

export default backend;