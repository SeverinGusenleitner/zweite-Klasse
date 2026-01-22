import { Shape, Circle, Rectangle } from './shapes';
import { ToolSelection, ToolType } from './ToolSelection';
import { Point } from './shapes';
// import { ToolSelectionWidget } from ".";
type DrawingState = {
  currentTempShape: Shape;
  start: Point;
};
export class ShapeManager {
  private currentTool?: DrawingState | undefined = undefined;
  public currentToolType: ToolType = ToolType.CIRCLE;
  private shapes: Shape[] = [];
  private container: SVGSVGElement;

  constructor(svgContainerId: string = 'drawing-canvas') {
    this.container = document.getElementById(svgContainerId) as unknown as SVGSVGElement;
    this.container?.addEventListener('mousedown', (event) => {
      this.handleMouseDown(event);
    });
    this.container?.addEventListener('mouseup', (event) => {
      this.handleMouseUp(event);
    });
    this.container?.addEventListener('mousemove', (event) => {
      this.handleMouseMove(event);
    });
    this.container?.addEventListener('mouseleave', (event) => {
      this.handleMouseLeave(event);
    });
  }

  private handleMouseDown(event: MouseEvent): void {
    if (this.currentToolType === ToolType.POINTER) {
      for (let i = this.shapes.length - 1; i >= 0; i--) {
        const start = this.getSVGCoordinates(event);
        if (this.shapes[i]!.contains(start)) {
          this.unselectAll();
          this.shapes[i]!.selected = true;
        }
      }
    } else {
      const start = this.getSVGCoordinates(event);
      let newShape: Shape;
      if (this.currentToolType === ToolType.CIRCLE) {
        newShape = new Circle(this.container, start);
      } else {
        newShape = new Rectangle(this.container, start);
      }
      newShape.tempMode = true;
      this.shapes.push(newShape);
      this.currentTool = {
        currentTempShape: newShape,
        start: start,
      };
    }
  }
  private handleMouseUp(event: MouseEvent): void {
    if (this.currentTool) {
      this.currentTool!.currentTempShape.tempMode = false;
      this.currentTool = undefined;
    }
  }
  private handleMouseMove(event: MouseEvent): void {
    if (this.currentTool) {
      this.currentTool.currentTempShape.updatePosition(this.currentTool.start, this.getSVGCoordinates(event));
    }
  }
  private handleMouseLeave(event: MouseEvent): void {
    if (this.currentTool) {
      this.currentTool!.currentTempShape.tempMode = false;
      this.currentTool = undefined;
    }
  }

  private getSVGCoordinates(event: MouseEvent): Point {
    // This method converts mouse event coordinates to SVG coordinates
    // (position relative to the SVG's left/top, taking viewBox into account)
    // ⚠️ This method is a little bit tricky due to SVG coordinate systems.
    // Don't worry about the details for now. Just use it as a template
    // whenever you need to convert mouse event coordinates to SVG coordinates.
    // If you want to fully understand it, use your favorite AI assistant
    // to explain.

    // Mouse events give us screen coordinates (pixels from window edge)
    // But we need SVG coordinates (units from viewBox origin)
    const svgPoint = this.container.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;

    // Transform: screen space → SVG user space
    const transformed = svgPoint.matrixTransform(this.container.getScreenCTM()?.inverse());

    return {
      x: transformed?.x || 0,
      y: transformed?.y || 0,
    };
  }
  private unselectAll() {
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i]?.unselect();
    }
  }
}
