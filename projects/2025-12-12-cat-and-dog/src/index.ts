import './styles.css';
import { Simulation } from './sim';
const catBtn = document.getElementById("cat-btn")as HTMLDivElement;
const dogBtn = document.getElementById("dog-btn")as HTMLDivElement;

const simulation = new Simulation();
simulation.start();
catBtn.addEventListener("click", ()=>simulation.createCat());
dogBtn.addEventListener("click", ()=>simulation.createDog());
