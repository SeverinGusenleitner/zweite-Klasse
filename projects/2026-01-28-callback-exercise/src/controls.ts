
type CallBack = (tooltype:Tooltype) => void;
export enum Tooltype{
    CIRCLE,
    SQUARE,

}
export class ControlMenu{
    private controlMenu: HTMLDivElement
    constructor( private callBack:CallBack, controlMenuId:string = "controls"){
        this.controlMenu = document.getElementById(controlMenuId) as HTMLDivElement;

        this.controlMenu.appendChild(this.addNewButton(Tooltype.CIRCLE,"Circle"));
        this.controlMenu.appendChild(this.addNewButton(Tooltype.SQUARE,"Square"));
        
    }
    private addNewButton(tooltype:Tooltype,text:string){
        const button = document.createElement("button") as HTMLButtonElement;
        button.textContent = text;
        button.addEventListener("click", ()=>{
            this.callBack(tooltype);
        })
        return button;
    }
}