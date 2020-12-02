type Colore = string | number;

class Automobile {
  constructor(public colore: Colore, public potenzaKw: number, public nPorte: number, public rProduzione: string, public codTelaio: string) {}
}

abstract class BuilderDiAuto {
  colore: Colore;
  potenzaKw: number;
  nPorte: number;
  rProduzione: string;
  codTelaio: string;

  abstract build(): Automobile | number;
}

abstract class GestoreProduzione {
  abstract avviaBuild(params: Object): number;
}

/* --- */

class BuilderDiFerrari extends BuilderDiAuto {
  build(): Automobile | number {
    if (this.nPorte === 2 && this.colore === colori.rosso) {
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

enum colori {
  verde,
  bianco,
  rosso
}

const builder = new BuilderDiFerrari();
const gstrPrdznFrr = new GestoreProduzioneFerrari(builder);

if (gstrPrdznFrr.avviaBuild({
  rProduzione: 'Mario Rossi',
  codTelaio: 'FR124ZN#001'
})) console.log('costruzione avviata');

/*
* @todo concatenazione chiamate
* @body restituire istanza dopo chiamata a qualsiasi setter
*/
builder.colore = colori.rosso;
builder.potenzaKw = 465;

const nuovaFerrari = builder.build();

console.log(nuovaFerrari);