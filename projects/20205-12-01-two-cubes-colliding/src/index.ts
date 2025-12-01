import './styles.css'
import { Simulation } from './simulation';
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const x = new Simulation("simDiv");
x.start();
startBtn.addEventListener("click", ()=>{
    x.createNewCubes();

})