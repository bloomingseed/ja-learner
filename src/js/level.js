function Bit(text) {
  // x and y positions are randomized
  this.xpos = Math.random() * canvas.width;
  this.ypos = -Math.random() * canvas.height;

  // this draw the text for current frame
  this.draw = function () {
    // Formatting the text to display
    context.fillStyle = "green";

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
    if (this.ypos > canvas.height) {
      // if text crosses the bottom of the screen then reset
      this.ypos = -Math.random() * canvas.height;
      this.xpos = Math.random() * canvas.width;
    } else this.ypos += 2; // drop text by 2 pixels down
  };
}

function reDraw() {
  // before drawing clear entire screen
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // draw every text elements
  for (var bit in bits) {
    bits[bit].draw();
    bits[bit].tick();
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

function levelStart(canvas, textGenerator) {
  globalThis.canvas = canvas;
  var context = (globalThis.context = canvas.getContext("2d"));
  context.font = "14pt Otsutome";
  var bits = (globalThis.bits = new Array());
  for (let txt = textGenerator.next(); txt != null; txt = textGenerator.next())
    bits.push(new Bit(txt));

  // This will call 'reDraw' at every 33 milliseconds.
  // So, our animation will run at 30fps (1000/33 ≈ 30).
  setInterval(reDraw, 33);
}
