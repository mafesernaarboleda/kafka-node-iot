
const kafka = require('kafka-node');

const client = new kafka.Client('localhost:2181');
const offset = new kafka.Offset(client);
const options = { groupId: 'kafka-node-iot', autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024, fromOffset: true};

const consumer = new kafka.Consumer(
    client,
    [{ topic: 'demo', partition: 0, offset: 5}],
     options);

consumer.on('message', (message) => {
  console.log(message);
});

consumer.on('offsetOutOfRange',  (topic) =>{
  topic.maxNum = 2;
  offset.fetch([topic],  (err, offsets) => {
    if (err) {
      return console.error(err);
    }
    var min = Math.min(offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
});