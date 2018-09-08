module.exports = env => ({
  Region: "eu-west-3",
  ConfigOptions: {
    FunctionName: `cryptomon-buy-lambda-${env}`,
    Description: "",
    Handler: "index.handler",
    RoleName: `cryptomon-buy-lambda-staging`,
    MemorySize: 128,
    Timeout: 30,
    Runtime: "nodejs8.10",
    Environment: {
      Variables: {
        NODE_ENV: env
      }
    }
  }
})