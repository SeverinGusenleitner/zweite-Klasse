export abstract class Shape{
    private shapeStack: HTMLDivElement;
    protected shape: HTMLDivElement;
    constructor(shapeStackId:string = "shape-stack"){
        this.shapeStack = document.getElementById(shapeStackId) as HTMLDivElement;
        this.shape = document.createElement("div") as HTMLDivElement;
        this.shape.style.width = "100px";
        this.shape.style.height = "100px";
        this.shapeStack.appendChild(this.shape);
    }
}
export class Circle extends Shape{
    constructor(){
        super();
        this.shape.className = "circle"
    }
}
export class Square extends Shape{
    constructor(){
        super();
        this.shape.className = "square"
    }
}