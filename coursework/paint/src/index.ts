import { ShapeManager } from './ShapeManager';
import './styles.css';
import { ToolSelection,ToolType } from './ToolSelection';
export const ToolSelectionWidget = new ToolSelection((toolType)=>1+1);
const shapeManager = new ShapeManager();