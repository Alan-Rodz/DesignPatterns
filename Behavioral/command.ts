/**
 * The command design pattern is used to implement loose coupling
 * in a request-response model
 */

// === Explanation ================================================================
/**
 * The Command interface declares a method for executing a command.
 */
interface Command {
  execute(): void;
}

/**
* Some commands can implement simple operations on their own.
*/
class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
  }
}

/**
* However, some commands can delegate more complex operations to other objects,
* called "receivers."
*/
class ComplexCommand implements Command {
  private receiver: Receiver;

  /**
   * Context data, required for launching the receiver's methods.
   */
  private a: string;

  private b: string;

  /**
   * Complex commands can accept one or several receiver objects along with
   * any context data via the constructor.
   */
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  /**
   * Commands can delegate to any methods of a receiver.
   */
  public execute(): void {
    console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

/**
* The Receiver classes contain some important business logic. They know how to
* perform all kinds of operations, associated with carrying out a request. In
* fact, any class may serve as a Receiver.
*/
class Receiver {
  public doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`);
  }

  public doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

/**
* The Invoker is associated with one or several commands. It sends a request to
* the command.
*/
class Invoker {
  private onStart: Command;

  private onFinish: Command;

  /**
   * Initialize commands.
   */
  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  /**
   * The Invoker does not depend on concrete command or receiver classes. The
   * Invoker passes a request to a receiver indirectly, by executing a
   * command.
   */
  public doSomethingImportant(): void {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.isCommand(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object): object is Command {
    return object.execute !== undefined;
  }
}

/**
* The client code can parameterize an invoker with any commands.
*/
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));
invoker.doSomethingImportant();


// === Example ====================================================================
/*Command*/
interface AdministrativeAction {
  performAdministrativeAction(): void;
}

/*SimpleCommand*/
class ReceiveItems implements AdministrativeAction {
  private items: string[];

  constructor(items: string[]) {
    this.items = items;
  }

  public performAdministrativeAction(): void {
    console.log('Receiving items...');
    console.log('Items received.');
    console.log('Adding items to DB.');
    this.items.forEach(item => {
      console.log(`Item: ${item} has been added to the DB`);
    });
  }
}

/*ComplexCommand*/
class SendItem implements AdministrativeAction {
  private client: Client;

  private clientSpecificActions: string[];
  private clientAddress: string;

  constructor(client: Client, clientSpecificActions: string[], clientAddress: string) {
    this.client = client;
    this.clientSpecificActions = clientSpecificActions;
    this.clientAddress = clientAddress;
  }

  public performAdministrativeAction(): void {
    console.log('ComplexCommand: Complex stuff should be done by a client object.');
    this.client.performSpecificClientActions(this.clientSpecificActions);
    this.client.notifyAboutPackageDelivery(this.clientAddress);
    console.log('Sending Item...');
    console.log(`Item has been sent to client: ${this.client}`);
  }
}

/*Receiver*/
class Client {
  public performSpecificClientActions(clientSpecificActions: string[]): void {
    clientSpecificActions.forEach(action => {
      console.log(`Action: ${action} has been performed`);
    });
  }

  public notifyAboutPackageDelivery(clientAddress: string): void {
    console.log(`Client with address ${clientAddress} has been notified about the delivery`);
  }
}

/*Invoker*/
class SalesDepartment {
  private receiveItems: AdministrativeAction;
  private sendItem: AdministrativeAction;

  public setReceiveItems(adminAction: AdministrativeAction): void {
    this.receiveItems = adminAction;
  }

  public setSendItem(adminAction: AdministrativeAction): void {
    this.sendItem = adminAction;
  }

  public receiveABunchOfItems(): void {
    if (this.isCommand(this.receiveItems)) {
      this.receiveItems.performAdministrativeAction();
    }
  }

  public sendAnItem(): void {
    if (this.isCommand(this.sendItem)) {
      this.sendItem.performAdministrativeAction();
    }
  }

  private isCommand(adminAction): adminAction is AdministrativeAction {
    return adminAction.performAdministrativeAction !== undefined;
  }
}

/*ClientCode*/
/*Simple Command*/
const salesDepartment = new SalesDepartment();
salesDepartment.setReceiveItems(new ReceiveItems(['item1', 'item2', 'item3']));

/*Complex Command*/
const mainClient = new Client();
salesDepartment.setReceiveItems(new SendItem(mainClient, ['Notify through Email', 'Add special gift card'], 'Some Address in NY'));
salesDepartment.receiveABunchOfItems();
salesDepartment.sendAnItem();

