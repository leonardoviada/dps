/* chain of responsibility */
abstract class Operator {
  private successor: Operator | null;

  setSuccessor(o: Operator | null): void {
    this.successor = o;
  }

  handle(rqst: ChainRequest): number {
    if (!this.canHandle(rqst) && this.successor !== null) {
      return this.successor.handle(rqst);
    }
    return this.operate(rqst);
  }

  abstract canHandle(rqst: ChainRequest): boolean;

  abstract operate(rqst: ChainRequest): number;
}

class ChainRequest {
  constructor(public amount: number) {}
}

class Usciere extends Operator {
  canHandle(rqst: ChainRequest): boolean {
    return false;
  }

  operate(rqst: ChainRequest): number {
    return 0;
  }
}

class Cassiere extends Operator {
  canHandle(rqst: ChainRequest): boolean {
    return (rqst.amount < 1000);
  }

  operate(rqst: ChainRequest): number {
    console.log(`Sono il cassiere sfigato :( | Eccoti ${ rqst.amount } euri`);
    return 0;
  }
}

class Funzionario extends Operator {
  canHandle(rqst: ChainRequest): boolean {
    return true;
  }

  operate(rqst: ChainRequest): number {
    console.log(`Sono il funzionario potentissimo | Eccoti ${ rqst.amount } euro che nessuno prima di me ti ha dato`);
    return 0;
  }
}

const f = new Funzionario();
const c = new Cassiere();
const u = new Usciere();

f.setSuccessor(null);
c.setSuccessor(f);
u.setSuccessor(c);

const rqst = new ChainRequest(12343);

let rc = c.handle(rqst);
if (rc)
  console.log('fai schifo');
else console.log('tutto funziona!');