/**
 * The adapter design pattern provides an interface between two unrelated 
 * entities so that they can work together
 */

// === Explanation ================================================================

/**
 * The Target defines the domain-specific interface used by the client code.
 */
 class Target {
  public request(): string {
      return 'Target: The default target\'s behavior.';
  }
}

/**
* The Adaptee contains some useful behavior, but its interface is incompatible
* with the existing client code. The Adaptee needs some adaptation before the
* client code can use it.
*/
class Adaptee {
  public specificRequest(): string {
      return '.eetpadA eht fo roivaheb laicepS';
  }
}

/**
* The Adapter makes the Adaptee's interface compatible with the Target's
* interface.
*/
class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
      super();
      this.adaptee = adaptee;
  }

  public request(): string {
      const result = this.adaptee.specificRequest().split('').reverse().join('');
      return `Adapter: (TRANSLATED) ${result}`;
  }
}

/**
* The client code supports all classes that follow the Target interface.
*/
function clientCode(target: Target) {
  console.log(target.request());
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);

// === Example ================================================================
/*Target*/
class DocumentoEnEspañol {
  public obtenerDocumento(): string {
    return 'Este es el contenido del documento.';
  }
}

/*Adaptee*/
class DocumentInEnglish {
  public getDocument(): string {
    return 'This is the content of the document.';
  }
}

/*Adapter*/
const traducirAlEspañol = (contenidoEnIngles: string): string => { return 'Los contenidos del documento en inglés han sido traducidos al español'; }
class DocumentoTraducidoAlEspañol extends DocumentoEnEspañol {
  private documentoOriginal: DocumentInEnglish;

  constructor(documentoOriginal: DocumentInEnglish) {
      super();
      this.documentoOriginal = documentoOriginal;
  }

  public obtenerDocumento(): string {
    const resultado = traducirAlEspañol(this.documentoOriginal.getDocument());
    return `Documento traducido: ${resultado}`;
  }
}

const codigoClienteEnEspañol = (documento: DocumentoEnEspañol) => {
  console.log(documento.obtenerDocumento());
}

const documentoEnEspañol = new DocumentoEnEspañol();
codigoClienteEnEspañol(documentoEnEspañol);

const documentoEnIngles = new DocumentInEnglish();
const documentoEnInglesAdaptado = new DocumentoTraducidoAlEspañol(documentoEnIngles);
codigoClienteEnEspañol(documentoEnInglesAdaptado);
