import './styles.css';
import { Shape, Circle, Ellipse, Rectangle, Square, Line } from './shapes';

const ellipseBtn = document.getElementById('ellipse-btn') as HTMLButtonElement;
const circleBtn = document.getElementById('circle-btn') as HTMLButtonElement;
const rectangleBtn = document.getElementById('rectangle-btn') as HTMLButtonElement;
const squareBtn = document.getElementById('square-btn') as HTMLButtonElement;
const lineBtn = document.getElementById('line-btn') as HTMLButtonElement;
const areaHeader = document.getElementById('area-header') as HTMLHeadElement;

let shapeList: Shape[] = [];
let totalArea = 0;

function calculateTotalArea() {
  totalArea = 0;

  for (const shape of shapeList) {
    totalArea += shape.calculateArea();
  }
  areaHeader.textContent = `Total Area: ${totalArea}`;
  
}

ellipseBtn.addEventListener('click', () => {
  const xrad = Math.round(Math.random() * 99 + 1);
  const yrad = Math.round(Math.random() * 99 + 1);
  const ellipse = new Ellipse(xrad, yrad);
  shapeList.push(ellipse);
  calculateTotalArea();
});

circleBtn.addEventListener('click', () => {
  const radius = Math.round(Math.random() * 99 + 1);
  const circle = new Circle(radius);
  shapeList.push(circle);

  calculateTotalArea();
});

rectangleBtn.addEventListener('click', () => {
  const width = Math.round(Math.random() * 99 + 1);
  const height = Math.round(Math.random() * 99 + 1);
  const rect = new Rectangle(width, height);
  shapeList.push(rect);

  calculateTotalArea();
});

squareBtn.addEventListener('click', () => {
  const size = Math.round(Math.random() * 99 + 1);
  const square = new Square(size);
  shapeList.push(square);
  calculateTotalArea();
});

lineBtn.addEventListener('click', () => {
  const length = Math.round(Math.random() * 99 + 1);
  const line = new Line(length);
  shapeList.push(line);
  calculateTotalArea();
});
