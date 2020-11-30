abstract class Prodotto {
  protected constructor(public prezzo: number) {}

  abstract vendi(): void;
}

abstract class Fabbrica {
  abstract produci(params: Object): Prodotto;
}

/* --- */

class Panettone extends Prodotto {
  constructor(public peso: number, public senzaCanditi: boolean, prezzo: number) {super(prezzo);}

  vendi(): void {
    console.log(`Panettone venduto per €${ this.prezzo }`);
  }
}

class FabbricaDiPanettoni extends Fabbrica {
  produci = ({ peso, senzaCanditi, prezzo }): Panettone => {
    console.log('Ho prodotto un panettone');
    return new Panettone(peso, senzaCanditi, prezzo);
  };
}

/* --- */

const maina = new FabbricaDiPanettoni();
const panettone = maina.produci({ peso: 1, senzaCanditi: false, prezzo: 2.99 });
panettone.vendi();
