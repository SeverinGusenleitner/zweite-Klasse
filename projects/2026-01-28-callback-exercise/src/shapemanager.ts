import { Tooltype } from "./controls";
import { Shape, Square, Circle } from "./shapes";
export class ShapeManager{
    private shapes:Shape[] = []
    public createNewShape(button:Tooltype){
        let shape:Shape
        const randNum = Math.random()*99+1
        if(button === Tooltype.CIRCLE){
            shape = new Circle(randNum);
        }
        else{
            shape = new Square(randNum);
        }
        this.shapes.push(shape);
    }

}