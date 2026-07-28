class TargetGame {
  private canvas: SVGSVGElement;
  private playerCircle: PlayerCircle;
  private goalCircle: GoalCircle;
  private score = 0;
  private dragging = false;
  constructor(canvasId = 'canvas') {
    this.canvas = document.getElementById(canvasId) as unknown as SVGSVGElement;
    this.goalCircle = new GoalCircle(0, 0, 100);
    this.playerCircle = new PlayerCircle(this.getRandom(500, 50), this.getRandom(400, 50), 50);
    this.updateGoalPos();

    this.canvas.addEventListener('mousedown', (event) => {
      this.handleMouseDown(event);
    });

    this.canvas.addEventListener('mousemove', (event) => {
      this.handleMouseMove(event);
    });

    this.canvas.addEventListener('mouseup', () => {
      this.handleMouseUp();
    });
  }
  private updateGoalPos() {
    let newX: number;
    let newY: number;
    do {
      newX = this.getRandom(400, 100);
      newY = this.getRandom(300, 100);
    } while (this.playerCircle.isCirclePartiallyInside(newX, newY, 100));
    this.goalCircle.changePos(newX, newY);
  }

  private getRandom(range: number, d: number) {
    return Math.random() * range + d;
  }

  private handleMouseMove(event: MouseEvent) {
    const point = this.getSVGCoordinates(event);

    if (this.dragging) {
      this.playerCircle.changePos(point.x, point.y);
    }
  }

  private handleMouseDown(event: MouseEvent) {
    const point = this.getSVGCoordinates(event);
    if (this.playerCircle.isPointInside(point.x, point.y)) {
      this.dragging = true;
      this.playerCircle.addClass('dragging');
    }
  }

  private handleMouseUp() {
    this.dragging = false;
    this.playerCircle.addClass('normal');

    if (this.goalCircle.isCircleFullyInside(this.playerCircle)) {
      this.score++;
      this.updateGoalPos();
    }
  }

  private getSVGCoordinates(event: MouseEvent): { x: number; y: number } {
    // This method converts mouse event coordinates to SVG coordinates
    // (position relative to the SVG's left/top, taking viewBox into account)
    // ⚠️ This method is a little bit tricky due to SVG coordinate systems.
    // Don't worry about the details for now. Just use it as a template
    // whenever you need to convert mouse event coordinates to SVG coordinates.
    // If you want to fully understand it, use your favorite AI assistant
    // to explain.

    // Mouse events give us screen coordinates (pixels from window edge)
    // But we need SVG coordinates (units from viewBox origin)
    const svgPoint = this.canvas.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;

    // Transform: screen space → SVG user space
    const transformed = svgPoint.matrixTransform(this.canvas.getScreenCTM()?.inverse());

    return {
      x: transformed?.x || 0,
      y: transformed?.y || 0,
    };
  }
}

export { TargetGame };
import { PlayerCircle, GoalCircle } from './Circle';
