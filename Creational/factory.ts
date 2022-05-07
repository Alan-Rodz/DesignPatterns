/**
 * The factory pattern gives the responsibility of instantiating an object from 
 * a class to a Factory class
 */

class IOSButton {/*some code*/}
class AndroidButton {/*some code*/}

class ButtonFactory {
  createButton(os: string): IOSButton | AndroidButton {
    if(os === 'ios') {
      return new IOSButton();
    } else {
      return new AndroidButton();
    }
  }
}

const factory = new ButtonFactory();
const btn1 = factory.createButton('ios');
const btn2 = factory.createButton('android');