import './styles.css';
import { Shapeselector, ShapeType } from './shapeselector';
import { ShapeStack } from './shapeStack';
const shapeStack = new ShapeStack();
const shapeselector = new Shapeselector((shape: ShapeType|string) => shapeStack.createNewShape(shape));