const config = {
  speed: 2, // px
  slowModeSpeed: 0.5, // px
  fastModeSpeed: 10, // px
  textColor: "white",
  backgroundColor: "#76ba27",
  font: "44px Otsutome",
  vanishingLineRatio: 1, // percentage of canvas height
  marginRight: -132, // px
  marginLeft: 44, // px
  minSpacingRatio: 0.5, // percentage of min distance between 2 consecutive word relative to canvas height
  maxSpacingRatio: 2, // percentage of max distance between 2 consecutive word relative to canvas height
  fps: 30, // game repainting speed
};
function Bit(text, opt) {
  // x and y positions are randomized
  this.xpos =
    Math.random() * (canvas.width + config.marginRight) + config.marginLeft;
  let minY = config.minSpacingRatio * canvas.height,
    maxY = config.maxSpacingRatio * canvas.height;
  let distance = Math.random() * (maxY - minY) + minY;
  this.ypos = opt.maxHeight - distance;
  opt.maxHeight = this.ypos;
  this.text = text;

  // this draw the text for current frame
  this.draw = function () {
    // Formatting the text to display
    context.fillStyle = config.textColor;
    context.font = config.font;

    // var text = "a";
    var textWidth = context.measureText("W.").width;

    // we need to draw the characters of the text
    // one by one from top to bottom
    for (var i = 0; i < text.length; i++) {
      var charaterWidth = context.measureText(text[i]).width;
      context.fillText(
        text[i],
        this.xpos - charaterWidth / 2,
        this.ypos + i * textWidth
      );
    }
  };

  // this will update the text for next frame
  this.tick = function () {
    this.ypos += config.speed; // drop text by 2 pixels down
  };
}

function reDraw() {
  // before drawing clear entire screen
  context.fillStyle = config.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // draw every text elements
  for (var bit in bits) {
    bits[bit].draw();
    bits[bit].tick();
  }
  let i = globalThis.focusedBitOffset;
  if (
    i < bits.length &&
    bits[i].ypos > canvas.height * config.vanishingLineRatio
  ) {
    globalThis.focusedBitOffset = ++i;
    if (i == bits.length) alert("Level finished");
    else changeFocusedBitOffset(i, focusedBitOffsetChanged);
  }
}

class TextGenerator {
  constructor(textArray) {
    this.textArray = textArray;
  }
  next() {
    if (this.textArray.length == 0) return null;

    let pos = Number.parseInt(Math.random() * this.textArray.length);
    return this.textArray.splice(pos, 1);
  }
}

function changeFocusedBitOffset(value, cb) {
  globalThis.focusedBitOffset = value;
  if (cb != null) {
    cb(value);
  }
}

function focusedBitOffsetChanged(offset) {
  console.log("Focused bit: ", bits[offset].text);
}

function levelStart(canvas, textGenerator) {
  globalThis.canvas = canvas;
  var context = (globalThis.context = canvas.getContext("2d"));
  var bits = (globalThis.bits = new Array());
  let opt = { maxHeight: 0 };
  for (let txt = textGenerator.next(); txt != null; txt = textGenerator.next())
    bits.push(new Bit(txt, opt));
  changeFocusedBitOffset(0, focusedBitOffsetChanged);
  // This will call 'reDraw' at every 33 milliseconds.
  // So, our animation will run at 30fps (1000/33 ≈ 30).
  setInterval(reDraw, Number.parseInt(1000 / config.fps));
}

function addSlowMode(keyCode) {
  let speed = config.speed;
  let enter = () => {
    config.speed = config.slowModeSpeed;
  };
  let leave = () => {
    config.speed = speed;
  };
  document.addEventListener("keydown", (event) => {
    if (event.code === keyCode) enter();
  });
  document.addEventListener("keyup", (event) => {
    if (event.code === keyCode) leave();
  });
}
function addFastMode(keyCode) {
  let speed = config.speed;
  let enter = () => {
    config.speed = config.fastModeSpeed;
  };
  let leave = () => {
    config.speed = speed;
  };
  document.addEventListener("keydown", (event) => {
    if (event.code === keyCode) enter();
  });
  document.addEventListener("keyup", (event) => {
    if (event.code === keyCode) leave();
  });
}
function clearCanvas(canvas) {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}
function addClearCanvas(keyCode, canvas) {
  document.addEventListener("keypress", (event) => {
    if (event.code === keyCode) clearCanvas(canvas);
  });
}
