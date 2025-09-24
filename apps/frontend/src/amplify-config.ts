// amplify-config.ts
import { Amplify } from 'aws-amplify';

// Configure Amplify with your backend outputs
const amplifyConfig = {
  Auth: {
    Cognito: {
      // Add Cognito configuration if you plan to use authentication
      // userPoolId: 'your-user-pool-id',
      // userPoolClientId: 'your-user-pool-client-id',
      // identityPoolId: 'your-identity-pool-id',
    }
  },
  API: {
    Lambda: {
      // Your Lambda function name from the backend
      endpoints: [
        {
          name: 'nestApi',
          endpoint: 'https://lambda.eu-central-1.amazonaws.com/2015-03-31/functions/amplify-bigdaysbackend-admin-nestapilambda8FE1DF12-UE9izTzuym8b/invocations',
          region: 'eu-central-1',
          service: 'lambda'
        }
      ]
    }
  }
};

export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};

export default amplifyConfig;
