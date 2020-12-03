type IndiceBorsa = [number, string]
type IndiceComprensibile = { nomeTitolo: string, valore: number }

interface RestituisceDatiFinanziariComprensibili {
  getAggiornamentoIndici(): IndiceComprensibile[];
}

class FornitoreDatiFinanziari {
  getAggiornamentoIndici(): IndiceBorsa[] {
    let ret = [];
    for (let i = 1; i <= 25; i++) {
      ret.push([i * Math.random() * 10, FornitoreDatiFinanziari.generaId()]);
    }
    console.log('indici brutti');
    console.log(ret);
    return ret;
  };

  static generaId = () => {
    return '' + Math.random().toString(36).substr(2, 4).toUpperCase();
  };
}

class AdapterDatiFinanziari implements RestituisceDatiFinanziariComprensibili {
  constructor(public adattato: FornitoreDatiFinanziari) {};

  getAggiornamentoIndici(): IndiceComprensibile[] {
    let indici = this.adattato.getAggiornamentoIndici();
    return indici.map(indice => {
      return { nomeTitolo: indice[1], valore: indice[0] };
    });
  }
}

class LibreriaInfografica {
  dati: IndiceComprensibile[];

  constructor(public fornitoreDati: RestituisceDatiFinanziariComprensibili) {}

  fetchDati() {
    this.dati = this.fornitoreDati.getAggiornamentoIndici();
  }

  print() {
    this.dati.forEach(dato => console.log(dato));
  }
}

/* --- */

const frntrDt = new FornitoreDatiFinanziari();
const adapter = new AdapterDatiFinanziari(frntrDt);

const laMiaLibreria = new LibreriaInfografica(adapter);
laMiaLibreria.fetchDati();
laMiaLibreria.print();