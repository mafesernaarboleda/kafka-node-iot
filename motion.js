const five = require("johnny-five");
const board = new five.Board();
const producerKafka = require('./producer');

board.on("ready", () =>{

  const motion = new five.Motion(7);
  const led = new five.Led(13);

  motion.on("calibrated",() => {
    console.log("calibrated");
  });

  motion.on("motionstart", () => {
    led.on();
    producerKafka.sendMessage('Quien anda ahí 😰 😱 👻 ??');
  });

  motion.on("motionend", () => {
    led.off();
    producerKafka.sendMessage('uff se fue este puto 🏃🏻‍♀ !!!!!');
  });
});