import './styles.css';
import { BouncingBallGame } from './game';
const game = new BouncingBallGame('box');
game.start();
document.getElementById('addGummy')!.addEventListener('click', () => {
    game.addGummyBall();
});
document.getElementById('addSteel')!.addEventListener('click', () => {
    game.addSteelBall();
});
document.getElementById('addSwitch')!.addEventListener('click', () => {
    game.addSwitchBall();
});
document.getElementById('addEgg')!.addEventListener('click', () => {
    game.addEgg();
});