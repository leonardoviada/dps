interface State {
  foo: string;
  bar: string;
  baz: string;
}

class Originator {
  state: State = {
    foo: 'hello',
    bar: 'world',
    baz: 'chuck norris'
  };

  setState(state: State): void {
    this.state = state;
  }

  foo(content: string): void {
    console.log(content);
  }

  bar(content: string): void {
    console.log(content);
  }

  baz(content: string): void {
    console.log(content);
  }

  createMemento(): Memento {
    return new Memento(this.state);
  }

  restoreMemento(memento: Memento) {
    this.setState(memento.state);
  }

  print(): void {
    console.log(JSON.stringify(this.state));
  }
}

class Memento {
  constructor(public state: State) {}
}

const or = new Originator();
or.print();
const mem0 = or.createMemento();

or.setState({ foo: 'jesse', bar: 'walter', baz: 'skyler' });
or.print();
const mem1 = or.createMemento();

or.setState({ foo: 'mike', bar: 'gustavo', baz: 'victor' });
or.print();
const mem2 = or.createMemento();

console.log('ripristino stato originale...');
or.restoreMemento(mem0);
or.print();