class Prodotto {
  id: string;

  constructor(public nome: string, public prezzo: number, public confezionato: boolean) {
    this.id = Prodotto.generaId();
  }

  static generaId = () => {
    return '_' + Math.random().toString(36).substr(2, 4);
  };

}

class Magazzino {
  elencoProdotti: Prodotto[] = [];

  scaricaProdotto(id: number): Prodotto | number {
    for (let prodotto of this.elencoProdotti) {
      if (prodotto[0] === id) return prodotto;
    }

    console.log('prodotto non trovato');
    return -1;
  }

  caricaProdotto(prodotto: Prodotto): void {
    this.elencoProdotti.push(prodotto);
  }
}

class RepartoConfezionamento {

  /*
  * @todo implementare meccanica più seria con eventuale singoletto
  */
  confeziona(prodotto: Prodotto): Prodotto {
    prodotto.confezionato = true;
    return prodotto;
  }

}

class Fornitore {
  inviaFornitura(nProdotti: number): Prodotto[] {
    let ret = [];
    for (let i = 0; i < nProdotti; i++) {
      ret.push(new Prodotto(`prodotto${ i }`, Math.random() * 100, false));
    }
    return ret;
  }
}

class GestorePagamento {
  constructor(public metodiDisponibili: string[]) {}

  processaPagamentoConCarta(nCarta, ammontare) {

  };

  processaPagamentoPayPal(username, tokenAutorizzazione, ammontare) {

  };

  pagaFornitore(iban, ammontare) {

  }
}

class UfficioContabilita {
  elencoFatture: string[];
  elencoOrdiniClienti: string[];
  elencoOrdiniAFornitore: string[];

  constructor(public fondiSuConto: number) {}

  emettiFattura(): string {
    return '';
  }

  emettiDocumentiOrdineCliente(): string {

  }

  emettiDocumentiOrdineAFornitore(): string {

  }

  aggiornaFondi(delta: number) {

  }
}


class Corriere {
  consegna(): void {

  }
}

class Ordine {
  public constructor(public carrello: Prodotto[]) {}
}

interface CentroDiCoordinamento {
  fornitori: Fornitore[];
  magazzino: Magazzino;
  repartoConfezionamento: RepartoConfezionamento;
  ufficioContabili: UfficioContabilita;
  gestoriPagamento: GestorePagamento[];
  corriere: Corriere;

  ordini: Ordine[];

  avvia(): void;

  elencoProdottiDisponibili(): Prodotto[];

  nuovoOrdine(): number;

  evadiOrdine(): void;
}

class MegaUfficioAmazon implements CentroDiCoordinamento {
  fornitori: Fornitore[];
  magazzino: Magazzino;
  repartoConfezionamento: RepartoConfezionamento;
  ufficioContabili: UfficioContabilita;
  gestoriPagamento: GestorePagamento[];
  corriere: Corriere;

  ordini: Ordine[];

  evadiOrdine(): number {
    return 0;
  }

  nuovoOrdine(): number {
    return 0;
  }

  avvia(): void {
  }

  elencoProdottiDisponibili(): Prodotto[] {
    return [];
  }
}

/* --- */


