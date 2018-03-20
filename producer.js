
const kafka = require('kafka-node');

function sendMessage(message) {
    const client = new kafka.Client('localhost:2181');
    const producer = new kafka.Producer(client, { requireAcks: 1 });
    producer.on('ready', () => {
        producer.send([
            { topic: 'test', partition: 0, messages: message }
        ], (err, result) => {
            console.log(err || result);
        });
    });
  }

  module.exports = {
    sendMessage
  };