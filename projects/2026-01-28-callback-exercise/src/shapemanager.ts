import { Tooltype } from "./controls";
import { Shape, Square, Circle } from "./shapes";
export class ShapeManager{
    private shapes:Shape[] = []
    public createNewShape(button:Tooltype){
        let shape:Shape
        const randnum = Math.random()*99+1
        if(button === Tooltype.CIRCLE){
            shape = new Circle(randnum);
        }
        else{
            shape = new Square(randnum);
        }
        this.shapes.push(shape);
    }

}