/**
 * The bridge pattern is used to decouple interfaces from implementation and 
 * hiding the implementation details from the client program
 */

// === Explanation ================================================================

/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
 class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
      this.implementation = implementation;
  }

  public operation(): string {
      const result = this.implementation.operationImplementation();
      return `Abstraction: Base operation with:\n${result}`;
  }
}

/**
* You can extend the Abstraction without changing the Implementation classes.
*/
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
      const result = this.implementation.operationImplementation();
      return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

/**
* The Implementation defines the interface for all implementation classes. It
* doesn't have to match the Abstraction's interface. In fact, the two
* interfaces can be entirely different. Typically the Implementation interface
* provides only primitive operations, while the Abstraction defines higher-
* level operations based on those primitives.
*/
interface Implementation {
  operationImplementation(): string;
}

/**
* Each Concrete Implementation corresponds to a specific platform and
* implements the Implementation interface using that platform's API.
*/
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
      return 'ConcreteImplementationA: Here\'s the result on the platform A.';
  }
}

class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
      return 'ConcreteImplementationB: Here\'s the result on the platform B.';
  }
}

/**
* Except for the initialization phase, where an Abstraction object gets linked
* with a specific Implementation object, the client code should only depend on
* the Abstraction class. This way the client code can support any abstraction-
* implementation combination.
*/
function clientCode(abstraction: Abstraction) {
  // ..

  console.log(abstraction.operation());

  // ..
}

/**
* The client code should be able to work with any pre-configured abstraction-
* implementation combination.
*/
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log('');

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);


// === Example ====================================================================
class AnimalAbstraction {
  protected AnimalImplementation: AnimalImplementation

  constructor(AnimalImplementation: AnimalImplementation) {
    this.AnimalImplementation = AnimalImplementation;
  }

  public makeSound(): string {
    const result = this.AnimalImplementation.makeSound();
    return `AnimalAbstraction: Base operation with:\n${result}`;
  }
}

class ExtendedAnimalAbstraction extends AnimalAbstraction {
  public makeSoundAndDescribe(): string {
      const result = this.AnimalImplementation.makeSound();
      return `Make Sound: ${result}\n, and now the animal would be described.`;
  }
}

interface AnimalImplementation {
  makeSound(): string;
}

class DogImplementation implements AnimalImplementation {
  makeSound(): string {
      return 'A dog goes "woof"!';
  }
}

class CatImplementation implements AnimalImplementation {
  makeSound(): string {
      return 'A cat goes "meow"!';
  }
}

const animalClientCode = (animalAbstraction: AnimalAbstraction) => {
  console.log(animalAbstraction.makeSound());
}

/*Notice how animalClientCode can use any abstraction-implementation combination*/
let dogImplementation = new DogImplementation();
let dogAbstraction = new AnimalAbstraction(dogImplementation);
animalClientCode(dogAbstraction);

console.log('');

let catImplementation = new CatImplementation();
let catAbstraction = new ExtendedAnimalAbstraction(catImplementation);
animalClientCode(catAbstraction);
