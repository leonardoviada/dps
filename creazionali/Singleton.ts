class PresidenteRepubblica {
  private static instance: PresidenteRepubblica;

  protected constructor() {}

  private _nome: string;
  private _inizioMandato: number;
  private _segniParticolari: string;

  static getInstance(): PresidenteRepubblica {
    if (!this.instance)
      this.instance = new PresidenteRepubblica();

    return this.instance;
  }


  set nome(value: string) {
    this._nome = value;
  }

  set inizioMandato(value: number) {
    this._inizioMandato = value;
  }

  set segniParticolari(value: string) {
    this._segniParticolari = value;
  }
}

/* --- */

const presidente = PresidenteRepubblica.getInstance();
presidente.nome = 'Sergio Mattarella';
presidente.inizioMandato = 2015;
presidente.segniParticolari = 'ineludibile';

const altroPresidente = PresidenteRepubblica.getInstance();

/* const golpe = new PresidenteRepubblica();  Constructor of class 'PresidenteRepubblica' is protected and only accessible within the class declaration. */

console.log(presidente);
console.log(altroPresidente);