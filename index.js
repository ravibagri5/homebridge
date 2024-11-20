const { Accessory, Service, Characteristic, uuid } = require('homebridge');

// This is a simple Homebridge plugin that exposes a light accessory
module.exports = (homebridge) => {
  homebridge.registerAccessory('homebridge-my-plugin', 'MyLight', MyLightAccessory);
};

class MyLightAccessory {
  constructor(log, config) {
    this.log = log;
    this.name = config.name || 'My Light'; // The name of the light in the Home app

    // The state of the light
    this.on = false;
  }

  // The getServices method defines the services the accessory exposes to Homebridge
  getServices() {
    // Define the light bulb service
    const lightService = new Service.Lightbulb(this.name);

    // Add characteristics for turning the light on/off
    lightService.getCharacteristic(Characteristic.On)
      .on('get', this.getState.bind(this))  // Get the current state of the light
      .on('set', this.setState.bind(this)); // Set the state of the light

    // Return the services for this accessory
    return [lightService];
  }

  // Get the state of the light (on or off)
  getState(callback) {
    this.log(`Getting the state of the light: ${this.on ? 'on' : 'off'}`);
    callback(null, this.on); // Return the current state
  }

  // Set the state of the light (turn on or off)
  setState(value, callback) {
    this.log(`Setting the state of the light to: ${value ? 'on' : 'off'}`);
    this.on = value; // Update the state

    // Simulate a delay or interaction with the real device
    setTimeout(() => {
      callback(); // Call the callback once the state is set
    }, 500);
  }
}
