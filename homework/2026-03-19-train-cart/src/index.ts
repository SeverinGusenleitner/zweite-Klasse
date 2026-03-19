import './index.css';
import { Train } from './train';
const PART_OPTIONS = [
    { label: 'Add locomotive (2400 kW)', value: 'locomotive' },
    { label: 'Add passenger wagon (48 seats)', value: 'passenger' },
    { label: 'Add cargo wagon (35 t)', value: 'cargo' },
    { label: 'Add dining wagon (8 tables)', value: 'dining' },
    { label: 'Add caboose (2 crew)', value: 'caboose' }
];

const train = new Train();
buildPartGrid('partGrid');
document.getElementById('undoBtn')!.addEventListener('click', () => train.removeLast());
function buildPartGrid(parentId: string): void {
    const grid = document.getElementById(parentId)!;

    for (const option of PART_OPTIONS) {
        const button = document.createElement('button');
        button.textContent = option.label;
        button.addEventListener('click', () => {
            if(train.checkErrors(option.value)){
                return
            }
            switch(option.value){
                case "locomotive":train.createLocomotive(); break;
                case "passenger": train.createPassenger(); break;
                case "cargo": train.createCargo(); break;
                case "dining": train.createDining();break;
                case "caboose": train.createCaboose();break;
                default: break;
            }
            train.checkWarnings();
        }
        );
        grid.appendChild(button);
    }
}
