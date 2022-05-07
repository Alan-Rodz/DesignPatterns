/**
 * A singleton is a type of object that can only be instantiated once.
 * Thus, the pattern restricts the initialization of a class (or object) to
 * ensure that only one instance of it can be created
 */

class ApplicationSettings {
  static instance: ApplicationSettings;
  public readonly applicationTheme = 'dark';

  /*private constructor so that it cannot be instantiated with 'new'*/
  private constructor () {
     
  }

  static getInstance(): ApplicationSettings {
    if(!ApplicationSettings.instance) {
      ApplicationSettings.instance = new ApplicationSettings(); 
    }
    /* else -- instance already created */

    return ApplicationSettings.instance;
  }
}

const settings = ApplicationSettings.getInstance();