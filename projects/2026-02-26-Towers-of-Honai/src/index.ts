import './styles.css';
import { Game } from './game';
const button1 = document.getElementById("btn-1") as HTMLButtonElement;
const button2 = document.getElementById("btn-2") as HTMLButtonElement;
const button3 = document.getElementById("btn-3") as HTMLButtonElement;
const reset = document.getElementById("reset") as HTMLButtonElement;

const game = new Game();
reset.addEventListener("click",()=>{
    game.reset();
})

button1.addEventListener("click", ()=>{
    game.handleInput(0);
})
button2.addEventListener("click", ()=>{
    game.handleInput(1);
})
button3.addEventListener("click",()=>{
    game.handleInput(2);
})