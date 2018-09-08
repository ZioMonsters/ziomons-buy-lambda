const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({region:'eu-west-3'});


exports.handler = (event, context, callback) => {
  const _tokenId = JSON.parse(event.Records[0].body)._tokenId;
  const eventId = JSON.parse(event.Records[0].body).eventId;
  console.log(_tokenId);
  Promise.all([
      documentClient.delete({
          TableName: `cryptomon-shop-${process.env.NODE_ENV}`,
          Key: {
              monsterId: _tokenId
          }
      }).promise(),

      documentClient.put({
          TableName: `cryptomon-events-${process.env.NODE_ENV}`,
          Item: {
              transactionId: eventId,
              type: 'buy',
              processed: true
          }
      }).promise().catch(console.error)
  ])
  .then(() => callback(null, event))
  .catch(console.error);
}
