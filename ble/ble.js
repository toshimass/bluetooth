var noble = require('noble');

ACSP_RN4020_SUUID='b1e00000000000000000000000000000'
ACSP_RN4020_CUUID='ble00000000000000000000000000001'

// connect peripheral
function connect_rn4020(peripheral) {
    // connect with peripheral
    peripheral.connect(function(error) {
      console.log('connected');
      console.dir(peripheral);
    // discover service
      peripheral.discoverServices([], onServicesDiscovered);
    });
}

// discover service
function onServicesDiscovered(error, services) {
  services.forEach(function(service) {
    console.log(' --- show attribule ---');    
    //console.dir(service);

   service.discoverCharacteristics([], onCharacteristicDiscovered);
  });
}

function onCharacteristicDiscovered(error, characteristics) {
  console.log('characteristics discovered');

  characteristics.forEach(function(characteristic) {
    console.log('charastaristics uuid: '+characteristic.uuid);
    characteristic.on('read', onLedCharacteristicRead);
  });
}

function onLedCharacteristicRead(data, isNotification) {
  console.log('ledCharacteristic read response value: ', data.readInt8(0));
}

function onButtonCharacteristicRead(data, isNotification) {
  if (isNotification) {
    console.log('buttonCharacteristic notification value: ', data.readInt8(0));
  } else {
    console.log('buttonCharacteristic read response value: ', data.readInt8(0));
  }
}

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
    var suuid = peripheral.advertisement.serviceUuids;
    if(suuid == ACSP_RN4020_SUUID)
        //console.dir('suuid: '+suuid);
        // stop scanning for safety usage
        noble.stopScanning();
        console.log('start connect');
	connect_rn4020(peripheral);
});


