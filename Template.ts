interface Worker {
  compare(item1, item2): number;

  swap(item1, item2): void;
}

class Sorter<T, W> {
  constructor(public collection: Array<T>) {}

  sort(): void {
    const w = new W();
    let max = this.collection.length;
    for (let i = 0; i < max; i++)
      this.collection.forEach((item: T, index) => {
        if (W.compare(item, this.collection[index + 1]))
          W.swap(item, this.collection[index + 1]);
        max--;
      });
  }

  print(): void {
    console.log(this.collection);
  }
}

class NumberWorker implements Worker {
  compare(item1, item2): number {
    if (item1 > item2)
      return 1;
    if (item1 === item2)
      return 0;
    return -1;
  }

  swap(item1, item2): void {
    const j = item1;
    item1 = item2;
    item2 = j;
  }
}

const coll = [1, 8, 78, 48, 33, 214];
const srt = new Sorter<number, NumberWorker>(coll);
srt.sort();
srt.print();