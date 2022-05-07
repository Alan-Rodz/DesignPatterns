/**
 * The builder pattern allows the creation of an object step by step and then
 * delivers the build object
 */
class Hamburger {
  constructor(
    public bread: string,
    public ketchup?: boolean,
    public mustard?: boolean,
    public doubleMeat?: boolean
  ){ }

  addKetchup() { 
    this.ketchup = true;
    return this;
  }

  addMustard() { 
    this.mustard = true; 
    return this;
  }

  addDoubleMeat() { 
    this.doubleMeat = true; 
    return this;
  }
}

const lunch = new Hamburger('Some Bread');
lunch.addKetchup().addMustard().addDoubleMeat();