import { Animal } from "./animal";
import {Cat} from "./animal";
import { Dog } from "./animal";
import dogimg from '../assets/dog.png';
import catimg from '../assets/cat.png';
export class Simulation{
    private animals:Animal[] = [];
    public createCat(){
        const x = Math.random()*400;
        const y = Math.random()*400;
        const cat = new Dog(x,y,catimg);
        this.animals.push(cat);
    }
    public createDog(){
        const x = Math.random()*400;
        const y = Math.random()*400;
        const dog = new Cat(x,y,dogimg);
        this.animals.push(dog);
    }
    public animate(){
        for(const animal of this.animals){
            animal.draw();
        }
        requestAnimationFrame(()=>this.animate()!);
    }
}