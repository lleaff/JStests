interface INamed {
  name: string;
}

interface IFelin extends INamed {
  jumpHeight: number;
}

class Cat implements INamed, IFelin {
  constructor(name: string) {
    this.name = name
  }

  name: string;
  jumpHeight: number;
}

function sayHello(namedThing: INamed) {
  console.log(`Hello ${namedThing.name}!`);
}


const myCat: Cat = new Cat("George");

sayHello(myCat);
