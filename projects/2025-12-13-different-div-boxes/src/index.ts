import '/styles.css';
import { simulation } from './simulation';

const sim = new simulation();
sim.start();

sim.createAlertBox(100,100,"Click for alert");
sim.createWarningBox(100,300,"Click for warning");