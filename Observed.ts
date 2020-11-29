interface State {
  field1: string;
  field2: boolean;
}

class Observer {
  foo(state: State) {
    console.log('[obsr] state updated', state);
  }
}

class Observed {
  state: State;
  observers: Observer[] = [];

  add(ob: Observer): void {
    this.observers.push(ob);
  }

  setState(state: State): void {
    this.state = state;
    this.observers.forEach((ob) => {
      ob.foo(this.state);
    });
  }
}

const obsr = new Observer();
const obsd = new Observed();

obsd.add(obsr);
obsd.setState({ field1: 'hello world', field2: true });

/*
  $ ts-node observed.ts
  state updated { field1: 'hello world', field2: true }
*/
