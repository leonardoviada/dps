type Caratteristica = string | number;

class Albero {
  constructor(public x: number, public y: number, public modello: ModelloAlbero) {}

  renderizza() {
    console.log(`[${ this.x },${ this.y }] renderizzo albero`);
  }
}

class ModelloAlbero {
  constructor(public nome: string, public caratteristica: Caratteristica, public textureInOttoK: string) {}
}

class FabbricaDiAlberi {
  modelli: ModelloAlbero[] = [];

  addModel(model: ModelloAlbero): void {
    this.modelli.push(model);
  }

  getModelByCaratteristica(caratteristica: Caratteristica): ModelloAlbero {
    for (let modello of this.modelli) {
      if (modello.caratteristica === caratteristica) return modello;
    }

    return new ModelloAlbero('', -1, '');
    /* @todo aggiungere return in caso di modello non trovato */
  }
}


class Foresta {
  alberi: Albero[] = [];

  piantaAlbero(albero: Albero): void {
    this.alberi.push(albero);
  }

  renderizzaCampoDiGioco(): void {
    this.alberi.forEach(albero => albero.renderizza());
  }
}

/* --- */

/*
* @todo Formattare le enum
* @body le enum dovrebbero essere capitalized e i valori TUTTI UPPERCASE
*/
enum Caratteristiche {
  altissimo,
  faOmbra,
  potrebbeCadere
}

const fbrAlberi = new FabbricaDiAlberi();
fbrAlberi.addModel(new ModelloAlbero('Pino', Caratteristiche.faOmbra, 'una texture pesantissima'));
fbrAlberi.addModel(new ModelloAlbero('Sequoia', Caratteristiche.altissimo, 'altri miliardi di pixel'));

const frst = new Foresta();

for (let i = 0; i < 100; i++)
  frst.piantaAlbero(new Albero(i, Math.pow(i, 2) + 3 * i, fbrAlberi.getModelByCaratteristica(Caratteristiche.faOmbra)));

frst.renderizzaCampoDiGioco();
console.log('---\nalberi renderizzati: 100');
console.log(`texture pesantissime in memoria: ${ fbrAlberi.modelli.length }`);






























