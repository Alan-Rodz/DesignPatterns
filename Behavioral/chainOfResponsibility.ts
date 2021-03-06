/**
 * The chain of responsibility design pattern is used to achieve loose coupling
 * in software design, where a request from the client is passed to a chain of 
 * objects to process it
 */

// === Explanation ================================================================

/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 */
interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string;
}

/**
* The default chaining behavior can be implemented inside a base handler class.
*/
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    // Returning a handler from here will let us link handlers in a
    // convenient way like this:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

/**
* All Concrete Handlers either handle a request or pass it to the next handler
* in the chain.
*/
class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Banana') {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);

  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === 'MeatBall') {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

/**
* The client code is usually suited to work with a single handler. In most
* cases, it is not even aware that the handler is part of a chain.
*/
function clientCode(handler: Handler) {
  const foods = ['Nut', 'Banana', 'Cup of coffee'];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${food} was left untouched.`);
    }
  }
}

/**
* The other part of the client code constructs the actual chain.
*/
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

/**
* The client should be able to send a request to any handler, not just the
* first one in the chain.
*/
console.log('Chain: Monkey > Squirrel > Dog\n');
clientCode(monkey);
console.log('');

console.log('Subchain: Squirrel > Dog\n');
clientCode(squirrel);

// === Example ====================================================================
/*Handler*/
interface Buffet {
  passToNextBuffet(buffet: Buffet): Buffet;
  addToMenu(foodType: string): string;
}
/*Abstract Handler*/
abstract class AbstractBuffet implements Buffet {
  private nextBuffet: Buffet;
  public menu: string[];
  
  constructor(menu: string[]) {
    this.menu = menu;
  }

  public passToNextBuffet(nextBuffet: Buffet): Buffet {
    this.nextBuffet = nextBuffet;
    return nextBuffet;
  }

  public addToMenu(foodType: string): string {
    if (this.nextBuffet) {
      return this.nextBuffet.addToMenu(foodType);
    }

    return null;
  }
}

/*Concrete Handler*/
class JapaneseFoodBuffet extends AbstractBuffet {
  public addToMenu(foodType: string): string {
    if (foodType === 'Sushi' || foodType === 'Yakimeshi' && !this.menu.includes(foodType)) {
      this.menu.push(foodType);
      return `JapaneseFoodBuffet: I'll add the ${foodType} to my menu.`;
    }
    return super.addToMenu(foodType);
  }
}

/*Concrete Handler*/
class MexicanFoodBuffet extends AbstractBuffet {
  public menu: string[];
  public addToMenu(foodType: string): string {
    if (foodType === 'Tacos' || foodType === 'Enchiladas' && !this.menu.includes(foodType)) {
      this.menu.push(foodType);
      return `MexicanFoodBuffet: I'll add the ${foodType} to my menu.`;
    }
    return super.addToMenu(foodType);
  }
}

/*ClientCode*/
const buffetClientCode = (buffet: Buffet) => {
  const foods = ['Sushi', 'Yakimeshi', 'Tacos', 'Enchiladas', 'Hamburger'];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = buffet.addToMenu(food);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${food} was left untouched.`);
    }
  }
}

const japaneseFoodBuffet = new JapaneseFoodBuffet([]);
const mexicanFoodBuffet = new MexicanFoodBuffet([]);
japaneseFoodBuffet.passToNextBuffet(mexicanFoodBuffet);

buffetClientCode(japaneseFoodBuffet);
buffetClientCode(mexicanFoodBuffet);