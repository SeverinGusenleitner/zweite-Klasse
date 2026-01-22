import { ShapeManager } from './ShapeManager';
import './styles.css';
import { ToolSelection, ToolType } from './ToolSelection';
const shapeManager = new ShapeManager();
const ToolSelectionWidget = new ToolSelection((toolType) => shapeManager.currentToolType = toolType);
