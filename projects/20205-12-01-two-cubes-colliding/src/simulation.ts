import { Cube } from "./cube"

export class Simulation{

    private readonly box:HTMLDivElement;
    private cubes: Cube[] = [];
    constructor(boxId:string){
        this.box = document.getElementById(boxId) as HTMLDivElement;
    }

    public createNewCubes(){
        const cube = new Cube(100,360,40,10,this.box);
        this.cubes.push(cube);

    }

    private gameLoop = ():void =>{
        for(let i = 0; i<this.cubes.length;i++){
            this.cubes[i]?.update();
        }
    
        requestAnimationFrame(this.gameLoop);
    }

    public start():void{
        requestAnimationFrame(this.gameLoop);
    }
}