import { Dog } from "./animal";
import { Cat } from "./animal";
import { Animal } from "./animal";

export class Game{
    private messages:Animal[] = [];
    constructor(protected readonly canvas:HTMLDivElement,){
    }

    public createDog(){
        const dog = new Dog(this.canvas);
        this.messages.push(dog);
    }

    public createCat(){
        const cat = new Cat(this.canvas);
        this.messages.push(cat)
    }
    public start(){
        for(let i = 0;i<this.messages.length;i++){
            const message = this.messages[i]
            const messageelement = message!.getElement();
            messageelement.style.left="50px"
            messageelement.style.top =`${i*25}`
            message!.appendChild();
        }
    }
}