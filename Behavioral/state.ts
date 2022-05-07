/**
 * The State design pattern makes it so that an object behaves differently
 * based on a finite number of states
 */

interface State { think(): string; }

class HappyState implements State {
  think(): string { return 'Im Happy!'; }
}

class SadState implements State {
  think(): string { return 'Im Sad!'; }
}

class Human {
  state: State;
  constructor() { this.state = new HappyState(); }
  think() { return this.state.think(); }
}