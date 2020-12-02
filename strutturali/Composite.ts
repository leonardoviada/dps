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


  seed(coefficienteStrano: number): ComponenteAlberoso {

    /*    °     nNodi=1 */
    /*   ° °    nNodi=3 */
    /* ° ° ° °  nNodi=7 */
    if (!coefficienteStrano) return new Foglia();

    for (let i = coefficienteStrano; i >= 1; i--) {
      this.add(new Nodo().seed(i - 1));
    }
    return this;
  }

  print(): void {
    this.children.forEach(child => {
      child.print();
    });
  }
}

class Foglia extends ComponenteAlberoso {
  print(): void {
    console.log(`[${ this.id }] foglia!`);
  }
}

/* --- */

const ilMioAlbero = new Nodo();
ilMioAlbero.seed(5);

ilMioAlbero.print();