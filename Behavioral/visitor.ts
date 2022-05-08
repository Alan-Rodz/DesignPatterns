/**
 * The visitor design pattern is used when an operation must be performed
 * on a group of objects of similar kind
 */

// === Explanation ================================================================
/**
 * The Component interface declares an `accept` method that should take the base
 * visitor interface as an argument.
 */
interface Component {
  accept(visitor: Visitor): void;
}

/**
* Each Concrete Component must implement the `accept` method in such a way that
* it calls the visitor's method corresponding to the component's class.
*/
class ConcreteComponentA implements Component {
  /**
   * Note that we're calling `visitConcreteComponentA`, which matches the
   * current class name. This way we let the visitor know the class of the
   * component it works with.
   */
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }

  /**
   * Concrete Components may have special methods that don't exist in their
   * base class or interface. The Visitor is still able to use these methods
   * since it's aware of the component's concrete class.
   */
  public exclusiveMethodOfConcreteComponentA(): string {
    return 'A';
  }
}

class ConcreteComponentB implements Component {
  /**
   * Same here: visitConcreteComponentB => ConcreteComponentB
   */
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
    return 'B';
  }
}

/**
* The Visitor Interface declares a set of visiting methods that correspond to
* component classes. The signature of a visiting method allows the visitor to
* identify the exact class of the component that it's dealing with.
*/
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;
  visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
* Concrete Visitors implement several versions of the same algorithm, which can
* work with all concrete component classes.
*
* You can experience the biggest benefit of the Visitor pattern when using it
* with a complex object structure, such as a Composite tree. In this case, it
* might be helpful to store some intermediate state of the algorithm while
* executing visitor's methods over various objects of the structure.
*/
class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
  }
}

class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
  }
}

/**
* The client code can run visitor operations over any set of elements without
* figuring out their concrete classes. The accept operation directs a call to
* the appropriate operation in the visitor object.
*/
function clientCode(components: Component[], visitor: Visitor) {
  for (const component of components) {
    component.accept(visitor);
  }
}

const components = [
  new ConcreteComponentA(),
  new ConcreteComponentB(),
];

console.log('The client code works with all visitors via the base Visitor interface:');
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);

console.log('It allows the same client code to work with different types of visitors:');
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);

// === Example ====================================================================
/*Component*/
interface CarAssemblyLineMachine {
  addParts(partIntegrator: PartIntegrationMachine): void;
}

/*ConcreteComponentA*/
class AddDoorsSubMachine implements CarAssemblyLineMachine {
  public addParts(partIntegrator: PartIntegrationMachine): void {
    partIntegrator.addDoors(this);
  }

  public exclusiveMethodOfAddDorsMachine(color: string): string {
    return `Doors have been painted with color: ${color}`;
  }
}

/*ConcreteComponentB*/
class AddWheelsSubMachine implements CarAssemblyLineMachine {
  public addParts(partIntegrator: PartIntegrationMachine): void {
    partIntegrator.addWheels(this);
  }

  public exclusiveMethodOfAddWheelsMachine(specialDesign: string): string {
    return `Special design: ${specialDesign} has been applied to the wheels`;
  }
}

/*Visitor*/
interface PartIntegrationMachine {
  addDoors(machine: AddDoorsSubMachine): void;
  addWheels(machine: AddWheelsSubMachine): void;
}

/*ConcreteVisitor1*/
class FirstBrandPartIntegrationMachine implements PartIntegrationMachine {
  addDoors(machine: AddDoorsSubMachine): void {
    machine.exclusiveMethodOfAddDorsMachine('Brand1 Color');
  }

  addWheels(machine: AddWheelsSubMachine): void {
    machine.exclusiveMethodOfAddWheelsMachine('Brand1 Special Design');
  }
}

/*ConcreteVisitor2*/
class SecondBrandPartIntegrationMachine implements PartIntegrationMachine {
  addDoors(machine: AddDoorsSubMachine): void {
    machine.exclusiveMethodOfAddDorsMachine('Brand2 Color');
  }

  addWheels(machine: AddWheelsSubMachine): void {
    machine.exclusiveMethodOfAddWheelsMachine('Brand2 Special Design');
  }
}

/*ClientCode*/
const carMakerClientCode = (carAssemblyLineMachines: CarAssemblyLineMachine[], integrationMachine: PartIntegrationMachine) => {
  for (const component of carAssemblyLineMachines) {
    component.addParts(integrationMachine);
  }
}

const carAssemblyLineMachines = [
  new AddDoorsSubMachine(),
  new AddWheelsSubMachine(),
];

const brand1 = new FirstBrandPartIntegrationMachine();
carMakerClientCode(carAssemblyLineMachines, brand1);

const brand2 = new SecondBrandPartIntegrationMachine();
carMakerClientCode(carAssemblyLineMachines, brand2);