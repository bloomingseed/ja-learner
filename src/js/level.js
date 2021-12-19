const config = {
  speed: 5, // px
  textColor: "green",
  backgroundColor: "white",
  font: "14pt Otsutome",
};
function Bit(text, opt) {
  // x and y positions are randomized
  this.xpos = Math.random() * canvas.width;
  this.ypos = opt.maxHeight - Math.random() * canvas.height;
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
  if (bits[i].ypos > canvas.height * 0.7) {
    ++i;
    changeFocusedBitOffset(i, focusedBitOffsetChanged);
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
  setInterval(reDraw, 33);
}
