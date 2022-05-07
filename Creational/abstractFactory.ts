/**
 * The abstract factory pattern permits the creation of a factory class for 
 * factory classes 
 */

// === Enemies ====================================================================
enum AlienEnemyEnum { Ship, Boss }
class AlienShip {/*some code*/}
class AlienBoss {/*some code*/}
class AlienEnemyFactory {
  createAlienEnemy(type: AlienEnemyEnum): AlienShip | AlienBoss {
    if(type === AlienEnemyEnum.Ship) { return new AlienShip(); } 
    else { return new AlienBoss(); }
  }
}

enum ZombieEnemyEnum { Pawn, Boss }
class PawnZombie {/*some code*/}
class ZombieBoss {/*some code*/}
class ZombieEnemyFactory {
  createZombieEnemy(type: ZombieEnemyEnum): PawnZombie | ZombieBoss {
    if(type === ZombieEnemyEnum.Pawn) { return new PawnZombie(); } 
    else { return new ZombieBoss(); }
  }
}

// === Factory ====================================================================
interface AbstractEnemyFactory {
  createAlienEnemyFactory(): AlienEnemyFactory;
  createZombieEnemyFactory(): ZombieEnemyFactory;
}
class ConcreteEnemyFactory implements AbstractEnemyFactory {
  createAlienEnemyFactory(): AlienEnemyFactory { return new AlienEnemyFactory(); }
  createZombieEnemyFactory(): ZombieEnemyFactory { return new ZombieEnemyFactory(); }
}

// === Program ====================================================================
const enemyFactory = new ConcreteEnemyFactory();

const alienEnemyFactory = enemyFactory.createAlienEnemyFactory();
const alienShip = alienEnemyFactory.createAlienEnemy(AlienEnemyEnum.Ship);
const alienBoss = alienEnemyFactory.createAlienEnemy(AlienEnemyEnum.Boss);

const zombieEnemyFactory = enemyFactory.createZombieEnemyFactory();
const zombieShip = zombieEnemyFactory.createZombieEnemy(ZombieEnemyEnum.Pawn);
const zombieBoss = zombieEnemyFactory.createZombieEnemy(ZombieEnemyEnum.Boss);
