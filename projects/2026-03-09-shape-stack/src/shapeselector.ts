export enum ShapeType{
    SQUARE,
    CIRCLE
}
type ShapeSpawnCallBack  = (shape:ShapeType|string) => void;

export class Shapeselector{
    private outerDiv:HTMLDivElement;
    constructor(private callBack: ShapeSpawnCallBack, outerDivString: string = "shape-selector"){
        this.outerDiv = document.getElementById(outerDivString) as HTMLDivElement;
        this.outerDiv.appendChild(this.createButton(ShapeType.CIRCLE,"Circle"));
        this.outerDiv.appendChild(this.createButton(ShapeType.SQUARE,"Square"));
        this.outerDiv.appendChild(this.createButton("remove","Remove"));

    }
    private createButton(shapeType: ShapeType|string,label:string):HTMLButtonElement{
        const button = document.createElement("button") as HTMLButtonElement;
        button.textContent = label;
        button.addEventListener("click" , ()=>{
            this.callBack(shapeType);
        })
        return button;
    }

}