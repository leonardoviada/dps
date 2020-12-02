abstract class ComponenteAlberoso {

  protected constructor(public id?: string) {
    if (!id) this.id = ComponenteAlberoso.generateId();
  }

  abstract print(): void;

  static generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 4);
  };
}

/* --- */

class Nodo extends ComponenteAlberoso {

  public children: ComponenteAlberoso[] = [];

  constructor(id?: string) {super(id);}

  add(child: ComponenteAlberoso): void {
    this.children.push(child);
  }

  remove(id: string): void {
    for (let child of this.children) {
      if (child.id === id) {
        child = null;
        this.children.sort();
        this.children.shift();
      }
    }
  }

  getChild(id: string): ComponenteAlberoso {
    for (let child of this.children) {
      if (child.id === id) return child;
    }
  }


  seed(nNodi: number): ComponenteAlberoso {

    /*    °     nNodi=1 */
    /*   ° °    nNodi=3 */
    /* ° ° ° °  nNodi=7 */
    if (!nNodi) return new Foglia();

    for (let i = 0; i < nNodi; i++) {
      this.add(new Nodo().seed(i - 1));
    }
    return this;
  }

  print(): void {
    this.children.forEach(child => {
      console.group();
      console.dir(this);
      child.print();
    });
  }
}

class Foglia extends ComponenteAlberoso {
  print(): void {
    console.groupEnd();
    console.log(`[${ this.id }] foglia!`);
  }
}

/* --- */

const ilMioAlbero = new Nodo();
ilMioAlbero.seed(5);

ilMioAlbero.print();