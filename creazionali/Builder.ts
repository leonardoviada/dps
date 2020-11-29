class Automobile {
  constructor(public colore: string, public potenzaKw: number, public nPorte: number, public rProduzione: string, public codTelaio: string) {}
}

abstract class BuilderDiAuto {
  colore: string;
  potenzaKw: number;
  nPorte: number;
  rProduzione: string;
  codTelaio: string;

  abstract build(): Automobile | number;
}

abstract class GestoreProduzione {
  abstract avviaBuild(params: any): number;
}

class BuilderDiFerrari extends BuilderDiAuto {
  build(): Automobile | number {
    if (this.nPorte === 2 && this.colore === 'rosso') {
      console.log('costruzione completata');
      return new Automobile(this.colore, this.potenzaKw, this.nPorte, this.rProduzione, this.codTelaio);
    }

    console.error('non stai costruendo una Ferrari');
    return -1;
  }
}

class GestoreProduzioneFerrari extends GestoreProduzione {
  constructor(public builder: BuilderDiAuto) {super();}

  avviaBuild({ rProduzione, codTelaio }): number {
    this.builder.nPorte = 2;
    this.builder.rProduzione = rProduzione;
    this.builder.codTelaio = codTelaio;

    return 1;
  }
}

/* --- */

const builder = new BuilderDiFerrari();
const gstrPrdzn = new GestoreProduzioneFerrari(builder);

if (gstrPrdzn.avviaBuild({ rProduzione: 'Mario Rossi', codTelaio: 'FR124ZN#001' })) console.log('costruzione avviata');

builder.colore = 'rosso';
builder.potenzaKw = 465;

const nuovaFerrari = builder.build();

console.log(nuovaFerrari);