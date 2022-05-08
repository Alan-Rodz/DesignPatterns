/**
 * The flyweight design pattern is used to cache and reuse object instances. It is 
 * therefore used with immutable objects.
 */

// === Explanation ================================================================
/**
 * The Flyweight stores a common portion of the state (also called intrinsic
 * state) that belongs to multiple real business entities. The Flyweight accepts
 * the rest of the state (extrinsic state, unique for each entity) via its
 * method parameters.
 */
class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

/**
* The Flyweight Factory creates and manages the Flyweight objects. It ensures
* that flyweights are shared correctly. When the client requests a flyweight,
* the factory either returns an existing instance or creates a new one, if it
* doesn't exist yet.
*/
class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = <any>{};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  /**
   * Returns a Flyweight's string hash for a given state.
   */
  private getKey(state: string[]): string {
    return state.join('_');
  }

  /**
   * Returns an existing Flyweight with a given state or creates a new one.
   */
  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log('FlyweightFactory: Reusing existing flyweight.');
    }

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

/**
* The client code usually creates a bunch of pre-populated flyweights in the
* initialization stage of the application.
*/
const factory = new FlyweightFactory([
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['Mercedes Benz', 'C500', 'red'],
  ['BMW', 'M5', 'red'],
  ['BMW', 'X6', 'white'],
  // ...
]);
factory.listFlyweights();

function addCarToPoliceDatabase(
  ff: FlyweightFactory, plates: string, owner: string,
  brand: string, model: string, color: string,
) {
  console.log('\nClient: Adding a car to database.');
  const flyweight = ff.getFlyweight([brand, model, color]);

  // The client code either stores or calculates extrinsic state and passes it
  // to the flyweight's methods.
  flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');
addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');
factory.listFlyweights();

// === Example ====================================================================
/*Flyweight*/
class Citizen {
  private sharedInformationAcrossCitizenObjects: any;

  constructor(sharedInformationAcrossCitizenObjects: any) {
    this.sharedInformationAcrossCitizenObjects = sharedInformationAcrossCitizenObjects;
  }

  public getCitizenInformation(uniqueInformationAcrossCitizenObjects): void {
    const s = JSON.stringify(this.sharedInformationAcrossCitizenObjects);
    const u = JSON.stringify(uniqueInformationAcrossCitizenObjects);
    console.log(`Citizen object displaying shared information ${this.sharedInformationAcrossCitizenObjects} and unique information ${uniqueInformationAcrossCitizenObjects}`);
  }
}

/*FlyweightFactory*/
class CitizenFactory {
  private citizens: { [key: string]: Citizen } = <any>{};

  constructor(initialCitizens: string[][]) {
    for (const citizenState of initialCitizens) {
      this.citizens[this.getKey(citizenState)] = new Citizen(citizenState);
    }
  }

  private getKey(citizenState: string[]): string {
    return citizenState.join('_');
  }

  public getCitizen(citizenSharedState: string[]): Citizen {
    const key = this.getKey(citizenSharedState);

    if (!(key in this.citizens)) {
      console.log('CitizenFactory: Can\'t find a citizen, creating new one.');
      this.citizens[key] = new Citizen(citizenSharedState);
    } else {
      console.log('CitizenFactory: Reusing existing citizen.');
    }

    return this.citizens[key];
  }

  public listCitizens(): void {
    const count = Object.keys(this.citizens).length;
    console.log(`\nFlyweightFactory: I have ${count} citizens:`);
    for (const key in this.citizens) {
      console.log(key);
    }
  }
}

/*ClientCode*/
const citizenFactory = new CitizenFactory([
  ['Anne Mary', 'Date of Birth: 1999', 'Address: Somewhere in Nevada', 'SSN: 123456'],
  ['John Doe', 'Date of Birth: unknown', 'Address: unknown', 'SSN: 654321' ],
  ['Ridley', 'Date of Birth: 1900', 'Address: Outer Space', 'SSN: 69-420'],
]);
citizenFactory.listCitizens();

const addCitizenToDatabase = (factory: CitizenFactory, name: string, dateOfBirth: string, address: string, SSN: string) =>  {
  const citizenFlyweight = factory.getCitizen([name, dateOfBirth, address]);
  citizenFlyweight.getCitizenInformation([SSN]);
}

addCitizenToDatabase(citizenFactory, 'Ishmael', 'Date of Birth: Before the 1900s', 'The Sea', 'SSN: 606060');
addCitizenToDatabase(citizenFactory, 'Ahab', 'Date of Birth: Before the 1900s', 'The Sea', 'SSN: 707070');
citizenFactory.listCitizens();
