import { ShapeType } from "./shapeselector";
import { Shape,Circle,Square } from "./shape";
export class ShapeStack{
    private shapeStack:HTMLDivElement;
    constructor(shapeStackId:string = "shape-stack"){
        this.shapeStack = document.getElementById(shapeStackId) as HTMLDivElement;
    }
    public createNewShape(shape:ShapeType){
        if(shape === ShapeType.CIRCLE){
            const shape = new Circle();
        }else{
            const shape = new Square();
        }
    }
}