var Bleacon = require('bleacon');
Bleacon.startScanning();

Bleacon.on('discover', function(bleacon) {
   console.dir(bleacon);
   console.log("test");
});
