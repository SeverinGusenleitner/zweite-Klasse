import "./styles.css";
import { ControlMenu, Tooltype } from "./controls";
import { ShapeManager } from "./shapemanager";


const shapeManager = new ShapeManager();
const menu = new ControlMenu((tooltype:Tooltype)=>shapeManager.createNewShape(tooltype));