'use strict';

const five = require("johnny-five");
const fetch = require("node-fetch");
const nsolid = require('nsolid')

nsolid.start({
  saas: '',
  app: 'iot-joystick',
  tracingEnabled: true
})

const board = new five.Board();


board.on("ready", () => {
  const joystick = new five.Joystick({
    pins: ['A0', "A1"],
    invertY: true
  });

  let led, message;
  joystick.on('change', function() {
    var ledNumber = null;
    var x = Math.round(this.x);
    var y = Math.round(this.y);
    if (x === 1){
      message = 'Blue led on';
      ledNumber = 5;
    }
    if (x === -1){
        message = 'Green led on';
        ledNumber = 11;
    }
    if (y === 1){
        message = 'Red led on';
        ledNumber = 10
    }
    if (y === -1){
        message = 'Yellow led on';
        ledNumber = 6;
    }
    if (ledNumber !== null){
        if (led){
            led.off();
        }
        led = new five.Led(ledNumber);
        led.on();

        let todo = {
          message: message
        }

      fetch('http://localhost:9999/send-message', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(json => console.log(json));
    }
});
});
