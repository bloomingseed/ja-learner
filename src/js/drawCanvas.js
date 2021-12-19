if (globalThis.config == undefined) globalThis.config = {};
addedConfig = {
  lineWidth: 4,
  strokeStyle: "#333",
  shadowColor: "#333",
  shadowBlur: 3 / 4,
};
for (let key in addedConfig) config[key] = addedConfig[key];
class DrawCanvas {
  constructor(drawCanvas) {
    this.canvas = drawCanvas;
    this.ctx = drawCanvas.getContext("2d");
    this.coord = { x: 0, y: 0 };
    this.painting = false;
  }
  addClearButton(parent) {
    let btn = document.createElement("button");
    btn.innerText = "clear";
    btn.setAttribute("id", "clearBtn");
    let clearCanvas = () =>
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    btn.addEventListener("click", clearCanvas);
    parent.appendChild(btn);
    return this;
  }
  addSubmitButton(parent, cb) {
    let btn = document.createElement("button");
    btn.innerText = "submit";
    btn.setAttribute("id", "submitBtn");
    btn.addEventListener("click", cb);
    parent.appendChild(btn);
    return this;
  }
  begin() {
    let handleDrawingStart = (event) => {
      event.preventDefault();

      const mousePos = getPenPosition(event);

      this.ctx.beginPath();

      this.ctx.moveTo(mousePos.x, mousePos.y);

      this.ctx.lineWidth = config.lineWidth;
      this.ctx.strokeStyle = config.strokeStyle;
      this.ctx.shadowColor = config.shadowColor;
      this.ctx.shadowBlur = config.shadowBlur;

      this.ctx.fill();

      this.painting = true;
    };

    let handleDrawingInProgress = (event) => {
      event.preventDefault();

      if (this.painting) {
        const mousePos = getPenPosition(event);

        this.ctx.lineTo(mousePos.x, mousePos.y);
        this.ctx.stroke();
      }
    };

    let handleDrawingStop = (event) => {
      event.preventDefault();

      if (this.painting) {
        this.ctx.shadowColor = config.shadowColor;
        this.ctx.shadowBlur = config.shadowBlur;

        this.ctx.stroke();
      }

      this.painting = false;
    };
    let getPenPosition = (event) => {
      var rect = this.canvas.getBoundingClientRect();
      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;
      const canvasX = clientX - rect.left;
      const canvasY = clientY - rect.top;

      return { x: canvasX, y: canvasY };
    };

    // add listeners
    this.canvas.addEventListener("mousedown", handleDrawingStart);
    this.canvas.addEventListener("mouseup", handleDrawingStop);
    this.canvas.addEventListener("mouseleave", handleDrawingStop);
    this.canvas.addEventListener("mousemove", handleDrawingInProgress);

    this.canvas.addEventListener("touchstart", handleDrawingStart);
    this.canvas.addEventListener("touchend", handleDrawingStop);
    this.canvas.addEventListener("touchmove", handleDrawingInProgress);
  }
}
