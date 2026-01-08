import { Shape,Circle, Rectangle } from "./shapes";
import { ToolSelection,ToolType} from "./ToolSelection";
import { ToolSelectionWidget } from ".";
export class ShapeManager{
    private shapes:Shape[] = [];
    private container:SVGSVGElement;

    constructor(svgContainerId:string = "drawing-canvas"){
        this.container = document.getElementById(svgContainerId) as unknown as SVGSVGElement;
        this.container?.addEventListener("mousedown",(event)=>{
            this.handleMouseDown(event);
        })
        this.container?.addEventListener("mouseup",(event)=>{
            console.log("up");
        })
        this.container?.addEventListener("mousemove",(event)=>{
            console.log("move");
        });
        this.container?.addEventListener("mouseleave",(event)=>{
            console.log("leave");
        })
    }

    private handleMouseDown(event:MouseEvent):void{
        const currentTool:ToolType =  ToolSelectionWidget.getCurrentTool();
        if(currentTool === ToolType.CIRCLE){
            const circle = new Circle(this.container,{x:event.x,y:event.y});
            this.shapes.push(circle);
        }else if(currentTool === ToolType.RECTANGLE){
            new Rectangle(this.container,{x:event.x,y:event.y});
        }
    }
}
