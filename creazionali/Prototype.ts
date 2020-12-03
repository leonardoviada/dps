// @ts-ignore
type Caratteristica = string | number;
// @ts-ignore
type Colore = string | number;

abstract class Prototype {
  abstract clone(): Object;
}

class Zombie extends Prototype {
  constructor(public colore: Colore, public armato: boolean, public caratteristica: Caratteristica) {super();}

  clone(): Zombie {
    return this;
  }
}

class VideogiocoBanale {
  zombieModels: Zombie[] = [];

  addZombieModel = (zombie: Zombie): void => {
    this.zombieModels.push(zombie);
  };

  getModelByCaratteristica = (caratteristica: Caratteristica): Zombie => {
    for (let zombie of this.zombieModels) {
      if (zombie.caratteristica == caratteristica) {
        return zombie;
      }
    }
    return new Zombie(colori.default, true, caratteristiche.default);
  };

  generaOrda = (nZombies: number, caratteristica: Caratteristica): Zombie[] => {
    let orda = [];
    const target = this.getModelByCaratteristica(caratteristica);

    for (let i = 0; i < nZombies; i++) {
      orda.push(target.clone());
    }

    return orda;
  };
}

/* --- */

enum caratteristiche {
  default,
  vomitaAcido,
  brutto,
  nazista
}

enum colori {
  default,
  // @ts-ignore
  verde,
  verdeScuro,
  marrone
}

const vdgcbnl = new VideogiocoBanale();

vdgcbnl.addZombieModel(new Zombie(colori.verde, false, caratteristiche.brutto));
vdgcbnl.addZombieModel(new Zombie(colori.verdeScuro, true, caratteristiche.vomitaAcido));
vdgcbnl.addZombieModel(new Zombie(colori.marrone, true, caratteristiche.nazista));

const ordaVomitante = vdgcbnl.generaOrda(10, caratteristiche.vomitaAcido);
console.log(ordaVomitante);

const ordaNazista = vdgcbnl.generaOrda(5, caratteristiche.nazista);
console.log(ordaNazista);