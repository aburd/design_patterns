interface Prototype<T> {
  clone(): T
}

class Foo implements Prototype<Foo> {
  constructor(
    public bar: string,
    public baz: string,
    public buz: Buz,
  ) {}

  clone(): Foo {
    return new Foo(this.bar.toString(), this.baz.toString(), this.buz.clone())
  }
}

class Buz implements Prototype<Buz> {
  constructor(
    public bam: string,
  ) {}

  clone(): Buz {
    return new Buz(this.bam.toString())
  }
}

export default function main(_argv: string[]) {
  console.log('Prototype Example');

  const foo = new Foo('hey', 'you', new Buz('there'));

  const bar = foo.clone();

  console.log({'foo === foo': foo === foo})
  console.log({'foo === bar': foo === bar})

  console.log({foo, bar})
}
