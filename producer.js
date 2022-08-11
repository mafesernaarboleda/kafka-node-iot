
'use strict';
const express = require('express')
const kafka = require('kafka-node');
const nsolid = require('nsolid')

const port = process.env.PORT || 9999;

nsolid.start({
  saas: '',
  app: 'iot-producer',
  tracingEnabled: true
})

const app = express()

app.use(express.json())

function sendMessage(message) {
  const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
  const producer = new kafka.Producer(client, { requireAcks: 1 });
    producer.on('ready', () => {
      producer.send([
          { topic: 'nsolid-demo', partition: 0, messages: message }
      ], (err, result) => {
          console.log(err || result);
      });
    });
}

app.post('/send-message', (req, res) => {
  sendMessage(req.body.message)
  res.json('message send')
})

app.listen(port, () => {
  console.log('Listening on port: ', port, process.pid);
});


