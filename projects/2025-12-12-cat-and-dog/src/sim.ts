import { Animal } from './animal';
import { Cat } from './animal';
import { Dog } from './animal';

import dogimg from '../assets/dog.png';
import catimg from '../assets/cat.png';


export class Simulation {
  private animals: Animal[] = [];
  public createDog() {
    const x = Math.random() * 300;
    const y = Math.random() * 300;
    const cat = new Dog(x, y, dogimg, 1);
    this.animals.push(cat);
  }
  public createCat() {
    const x = Math.random() * 300;
    const y = Math.random() * 300;
    const dog = new Cat(x, y, catimg, 1);
    this.animals.push(dog);
  }
  private animate() {
    for (const animal of this.animals) {
      animal.draw();
      animal.update();
    }
    requestAnimationFrame(() => this.animate()!);
  }
  public start(){
    this.animate();
  }
}
