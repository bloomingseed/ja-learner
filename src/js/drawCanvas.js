class DrawCanvas {
  constructor(drawCanvas) {
    this.canvas = drawCanvas;
    this.ctx = drawCanvas.getContext("2d");
    this.coord = { x: 0, y: 0 };
    this.paint = false;
  }
  addClearButton() {
    let btn = document.createElement("button");
    btn.innerText = "clear";
    btn.setAttribute("id", "clearBtn");
    let clearCanvas = () =>
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    btn.addEventListener("click", clearCanvas);
    document.body.appendChild(btn);
    return this;
  }
  begin() {
    // Updates the coordianates of the cursor when
    // an event e is triggered to the coordinates where
    // the said event is triggered.
    let getPosition = (event) => {
      // this.coord.x = event.clientX - this.canvas.offsetLeft;
      // this.coord.y = event.clientY - this.canvas.offsetTop;
      this.coord.x = event.offsetX;
      this.coord.y = event.offsetY;
    };

    // The following functions toggle the flag to start
    // and stop drawing
    let startPainting = (event) => {
      this.paint = true;
      getPosition(event);
    };
    let stopPainting = () => {
      this.paint = false;
    };

    let sketch = (event) => {
      if (!this.paint) return;

      let ctx = this.ctx;
      let coord = this.coord;
      ctx.beginPath();

      ctx.lineWidth = 5;

      // Sets the end of the lines drawn
      // to a round shape.
      ctx.lineCap = "round";

      ctx.strokeStyle = "green";

      // The cursor to start drawing
      // moves to this coordinate
      ctx.moveTo(coord.x, coord.y);

      // The position of the cursor
      // gets updated as we move the
      // mouse around.
      getPosition(event);

      // A line is traced from start
      // coordinate to this coordinate
      ctx.lineTo(coord.x, coord.y);

      // Draws the line.
      ctx.stroke();
    };

    // add listeners
    this.canvas.addEventListener("mousedown", startPainting);
    this.canvas.addEventListener("mouseup", stopPainting);
    this.canvas.addEventListener("mousemove", sketch);
  }
}
