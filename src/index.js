const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({region:'eu-west-3'});


exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.Records[0].body);

  Promise.all([
      documentClient.delete({
          TableName: `cryptomon-shop-${process.env.NODE_ENV}`,
          Key: {
              monsterId: data._tokenId
          }
      }).promise(),

      documentClient.put({
          TableName: `cryptomon-shop-${process.env.NODE_ENV}`,
          Item: {
              transactionId: data.eventId,
              type: 'bought',
              processed: true
          }
      }).promise().catch(console.error)
  ])
  .then(() => callback(null, event))
  .catch(console.error);
}
