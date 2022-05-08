/**
 * The template method design pattern is used to create a 
 * template method stub and defer the steps of implementation
 * to the subclasses
 */

// === Explanation ================================================================

/**
 * The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed of calls to (usually) abstract primitive operations.
 *
 * Concrete subclasses should implement these operations, but leave the template
 * method itself intact.
 */
abstract class AbstractClass {
    /**
     * The template method defines the skeleton of an algorithm.
     */
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    /**
     * These operations already have implementations.
     */
    protected baseOperation1(): void {
        console.log('AbstractClass says: I am doing the bulk of the work');
    }

    protected baseOperation2(): void {
        console.log('AbstractClass says: But I let subclasses override some operations');
    }

    protected baseOperation3(): void {
        console.log('AbstractClass says: But I am doing the bulk of the work anyway');
    }

    /**
     * These operations have to be implemented in subclasses.
     */
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    /**
     * These are "hooks." Subclasses may override them, but it's not mandatory
     * since the hooks already have default (but empty) implementation. Hooks
     * provide additional extension points in some crucial places of the
     * algorithm.
     */
    protected hook1(): void { }

    protected hook2(): void { }
}

/**
* Concrete classes have to implement all abstract operations of the base class.
* They can also override some operations with a default implementation.
*/
class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass1 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass1 says: Implemented Operation2');
    }
}

/**
* Usually, concrete classes override only a fraction of base class' operations.
*/
class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('ConcreteClass2 says: Implemented Operation1');
    }

    protected requiredOperation2(): void {
        console.log('ConcreteClass2 says: Implemented Operation2');
    }

    protected hook1(): void {
        console.log('ConcreteClass2 says: Overridden Hook1');
    }
}

/**
* The client code calls the template method to execute the algorithm. Client
* code does not have to know the concrete class of an object it works with, as
* long as it works with objects through the interface of their base class.
*/
function clientCode(abstractClass: AbstractClass) {
    abstractClass.templateMethod();
}
console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass1());
console.log('');

console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass2());

// === Example ====================================================================
/*AbstractClass*/
abstract class MathematicalOperation {
    result: number;

    public performMathematicalOperation(): void {
        const number1 = this.getFirstOperand();
        const number2 = this.getSecondOperand();
        this.result = this.performOperation(number1, number2);
        this.result = this.hookOperation(this.result);
        this.showResult(this.result);
    }

    protected getFirstOperand(): number {
        return Math.floor(Math.random() * (100/*max*/ - 10/*min*/ + 1) + 10/*min*/);
    }

    protected getSecondOperand(): number {
        return Math.floor(Math.random() * (1000/*max*/ - 100/*min*/ + 1) + 100/*min*/);
    }

    protected showResult(result: number): void {
        console.log(`The result is: ${this.result}`);
    }

    protected abstract performOperation(number1: number, number2: number): number;
    protected hookOperation(result: number): number { return result/*default behavior*/; }; 

}

/*ConcreteClass*/
class Sum extends MathematicalOperation {
    protected performOperation(number1: number, number2: number): number { return number1 + number2; }
    protected hookOperation(result: number): number {
        console.log(`Sum record has been added to Database with result: ${result}`);
        return result;
    }
}

class Rest extends MathematicalOperation {
    protected performOperation(number1: number, number2: number): number { return number1 - number2; }
    protected hookOperation(result: number): number {
        console.log(`Rest record has been added to Database with result: ${result}`);
        return result;
    }
}

/*ClientCode*/
const mathematicalOperationClientCode = (mathematicalOperation: MathematicalOperation) => {
    mathematicalOperation.performMathematicalOperation();
}
mathematicalOperationClientCode(new Sum());
mathematicalOperationClientCode(new Rest());

