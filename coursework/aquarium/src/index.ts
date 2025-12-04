import './styles.css';
import { FishManager, HorizontalFish, CrissCrossFish, SinusFish, StandingFish,CircleFish, SquareFish } from './fish';

// Note that we can import images as strings. The result will be the path to the image.
import fish1 from '../assets/fish1.png';
import fish2 from '../assets/fish2.png';
import fish3 from '../assets/fish3.png';
import fish4 from '../assets/fish4.png';
import fish5 from '../assets/fish5.png';
import fish6 from '../assets/fish6.png';

const aquarium = document.getElementById('aquarium')!;

const manager = new FishManager(aquarium);

// Add sample fish
// Horizontal Fish
manager.addFish(new HorizontalFish(aquarium, fish6, 100, 100, 1.5, 0));
manager.addFish(new HorizontalFish(aquarium, fish6, 500, 200, -2, 0));

// Random Fish
manager.addFish(new CrissCrossFish(aquarium, fish6, 200, 300, 1.5, 1.5));
manager.addFish(new CrissCrossFish(aquarium, fish6, 400, 400, -1.5, 2));
// Sinus Fish
manager.addFish(new SinusFish(aquarium, fish6, 50, 150, 1.5));
manager.addFish(new SinusFish(aquarium, fish6, 600, 350, -1.5,));
manager.addFish(new StandingFish(aquarium,fish1,500,200,0,0))
manager.addFish(new CircleFish(aquarium,fish2,500,200))
manager.addFish(new SquareFish(aquarium,fish3,500,200,1,0))
function animate() {
  manager.update();

  // Check: Can you remember what `requestAnimationFrame` does?
  requestAnimationFrame(animate);
}

animate();  