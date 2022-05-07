/**
 * The facade design pattern allows the usage of a simplified
 * API to hide the low level details in a CodeBase. This can be
 * achieved by creating wrapper interfaces on top of existing
 * interfaces to help client applications
 */

class PlumbingSystem {
  setPressure(pressure: number) {/*some code*/}
  turnOn() {/*some code*/}
  turnOff() {/*some code*/}
}

class ElectricalSystem {
  setVoltage(voltage: number) {/*some code*/}
  turnOn() {/*some code*/}
  turnOff() {/*some code*/}
}

class House {
  private plumbing = new PlumbingSystem();
  private electrical = new ElectricalSystem();

  public turnOnSystems() {
    this.electrical.setVoltage(120);
    this.electrical.turnOn();

    this.plumbing.setPressure(500);
    this.plumbing.turnOn();
  }

  public turnOffSystems() {
    this.electrical.turnOff();
    this.plumbing.turnOff();
  }
}

/*Simply turn on or off without worrying about details*/
const house = new House();
house.turnOnSystems();
house.turnOffSystems();