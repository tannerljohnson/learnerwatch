export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "learnerwatch.com"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ysu852rdea.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "YOUR_COGNITO_REGION",
    USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID"
  },
  lambda: {
    REGION: "us-east-1",
    URL: "https://lambda.us-east-1.amazonaws.com/2018-12-07/functions/streamS3Data/invocations",
    TYPE: "lambda"
  }
};
