import './styles.css';
import { Chart } from './Chart';
const chart = new Chart();
const setBtn = document.getElementById("set-btn") as HTMLButtonElement;
const sortBtn = document.getElementById("sort-btn") as HTMLButtonElement;
const randomizeBtn = document.getElementById("randomize-btn") as HTMLButtonElement;

const slider = document.getElementById("slider") as HTMLInputElement;
setBtn.addEventListener("click", ()=>{
    chart.set(slider.valueAsNumber);
})
sortBtn.addEventListener("click" , ()=>{
    chart.sort("bubble-sort");
})
randomizeBtn.addEventListener("click", ()=>{
    chart.randomize();
})