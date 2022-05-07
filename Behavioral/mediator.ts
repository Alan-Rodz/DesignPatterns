/**
 * The mediator pattern is used to provide a centralized communication medium
 * between different objects in a system
 */

class Airplane { land() {/*some code*/} }
class Runway { clear: boolean; }
class Tower {
  clearForLanding(runway: Runway, plane: Airplane) {
    if(runway.clear) { console.log(`Plane ${plane} is clear for landing`); } 
    else { console.log(`Plane ${plane} is NOT clear for landing`); }
  }
}

const runway25A = new Runway();
const runway25B = new Runway();
const runway25C = new Runway();

const airplaneA = new Airplane();
const airplaneB = new Airplane();
const airplaneC = new Airplane();

const tower = new Tower();
tower.clearForLanding(runway25A, airplaneA);
tower.clearForLanding(runway25B, airplaneB);
tower.clearForLanding(runway25C, airplaneC);

/**
 * Another example happens in Express, where Middleware intercepts requests and
 * acts as a mediator
 */

import express from 'express';

const app = express();

const logger = (req, res, next) => {
  console.log('Request Type: ', req.method);
  next();
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});