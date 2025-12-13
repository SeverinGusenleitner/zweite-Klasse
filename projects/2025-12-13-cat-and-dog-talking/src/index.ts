import './styles.css';
import { Game } from './game';

const catBtn = document.getElementById("cat-btn") as HTMLDivElement;
const dogBtn = document.getElementById("dog-btn") as HTMLDivElement;
const startBtn = document.getElementById("start-btn") as HTMLDivElement;

const game = new Game(document.getElementById("canvas") as HTMLDivElement);

catBtn.addEventListener("click", ()=>{
    game.createCat();
})
dogBtn.addEventListener("click", ()=>{
    game.createDog();
})
startBtn.addEventListener("click", ()=>{
    game.start();
})