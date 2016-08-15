var Bleacon = require('bleacon');

var uuid = '0112233445566778899aabbccddeeff0';
var major = 0;
var minor = 0;
var measuredPower = 88;

Bleacon.startAdvertising(uuid, major, minor, measuredPower);


