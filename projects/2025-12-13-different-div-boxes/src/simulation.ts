import { Box } from "./box";
import { WarningBox } from "./box";
import { AlertBox } from "./box";

export class simulation{
    private boxes:Box[] = [];
    public createWarningBox(x:number,y:number,text:string){
        const warningbox = new WarningBox(y,x,text);
        this.boxes.push(warningbox)
    }
    public createAlertBox(x:number,y:number,text:string){
        const alertBox = new AlertBox(y,x,text);
        this.boxes.push(alertBox);

    }
    private animate(){
        for(const box of this.boxes){
            box.draw();
        }
        requestAnimationFrame(()=>this.animate());
    }
    public start(){
        this.animate();
    }
}