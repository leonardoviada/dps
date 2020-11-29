abstract class Prototype {
  abstract clone(): Object;
}

class Zombie extends Prototype {
  constructor(public colore: string | number, public armato: boolean, public caratteristica: string | number) {super();}

  clone(): Zombie {
    return this;
  }
}

class VideogiocoBanale {
  listaZombies: Zombie[] = [];

  add = (zombie: Zombie): void => {
    this.listaZombies.push(zombie);
  };

  getZombieByCaratteristica = (caratteristica: string | number): Zombie => {
    for (let zombie of this.listaZombies) {
      if (zombie.caratteristica == caratteristica) {
        return zombie;
      }
    }

    return new Zombie(colori.default, true, caratteristiche.default);
  };

  generaOrda = (nZombies: number, caratteristica: string | number): Zombie[] => {
    let orda = [];
    const target = this.getZombieByCaratteristica(caratteristica);
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
  verde,
  verdeScuro,
  marrone
}

const vdgcbnl = new VideogiocoBanale();

vdgcbnl.add(new Zombie(colori.verde, false, caratteristiche.brutto));
vdgcbnl.add(new Zombie(colori.verdeScuro, true, caratteristiche.vomitaAcido));
vdgcbnl.add(new Zombie(colori.marrone, true, caratteristiche.nazista));

const ordaVomitante = vdgcbnl.generaOrda(10, caratteristiche.vomitaAcido);
console.log(ordaVomitante);

const ordaNazista = vdgcbnl.generaOrda(5, caratteristiche.nazista);
console.log(ordaNazista);