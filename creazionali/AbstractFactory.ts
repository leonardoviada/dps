1;
type Color = string | number;

enum colors {
  primary,
  secondary,
  light
}

abstract class Factory {
  abstract createModal(title: string, content: string);

  abstract createButton(content: string, color: Color);
}

abstract class Button {
  protected constructor(public content: string, public color: Color) {}

  abstract click(): void;
}

abstract class Modal {
  protected constructor(public title: string, public content: string) {}

  abstract open(): void;

  abstract close(): void;
}

/* --- */

class JSXButton extends Button {

  constructor(public props: Object, content, color: Color = colors.primary) {super(content, color);}

  click(): void {
    console.log('cliccato! (però in React)');
  }

  render(): string {
    return `...qualcosa in JSX... ${ this.content }, colorato di ${ this.color }`;
  }
}

class JSXModal extends Modal {
  constructor(public props: Object, title, content) {super(title, content);}

  close(): void {
    console.log('apro!');
  }

  open(): void {
    console.log('chiudo!');
  }

  render(): string {
    return 'elements in JSX';
  }
}

class PlainHtmlButton extends Button {

  constructor(content, color) {super(content, color);}

  click(): void {
    console.log('cliccato! (tristemente in HTML)');
  }
}

class PlainHtmlModal extends Modal {

  constructor(title, content) {super(title, content);}

  close(): void {
    console.log('chiudo (con un "linguaggio di progr.")');
  }

  open(): void {
    console.log('apro! hackeriamo la NASA con l\'HTML');
  }
}

class JSXFactory extends Factory {
  createButton(content, color): JSXButton {
    return new JSXButton({ onSubmit: () => console.log('submit') }, content, '#3373ef');
  }

  createModal(title, content): JSXModal {
    return new JSXModal({ onDismiss: () => console.log('dismiss') }, title, content);
  }
}

class PlainHtmlFactory extends Factory {
  createButton(content, color): PlainHtmlButton {
    return new PlainHtmlButton(content, '#ddcf55');
  }

  createModal(title, content): PlainHtmlModal {
    return new PlainHtmlModal(title, content);
  }
}

/* --- */

/* lavoro solo su questa linea */
const ftr = new PlainHtmlFactory();

const btn = ftr.createButton('/ilmiopath', 'Invia');
btn.click();

const modal = ftr.createModal('Il Mio Titolo', 'lorem ipsum dolor');
modal.open();
modal.close();