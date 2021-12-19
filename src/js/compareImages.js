const APP_NAME = "ja-learner";
if (globalThis.config == undefined) globalThis.config = {};
moreConfig = {
  penalty_ratio: 0.4,
  baseScore: 10,
  threshold: 60, // px
};
for (let key in moreConfig) config[key] = moreConfig[key];

const BLANK_CANVAS = document.createElement("canvas");

function loadImageToCanvas(uri, canvas, cb) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas
  let image = new Image();
  image.src = uri;
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    if (cb) cb(image);
  };
}

function compareCanvases(modelCanvas, drawCanvas) {
  const modelCtx = modelCanvas.getContext("2d");
  const submittedCtx = drawCanvas.getContext("2d");
  const width = modelCanvas.width,
    height = modelCanvas.height;

  const modelImage = modelCtx.getImageData(0, 0, width, height);
  const submittedImage = submittedCtx.getImageData(0, 0, width, height);
  const diffCount = Number.parseFloat(
    pixelmatch(modelImage.data, submittedImage.data, null, width, height, {
      threshold: 0.1,
    })
  );
  return diffCount;
}

function compareStrokes(modelCanvas, drawCanvas) {
  BLANK_CANVAS.width = modelCanvas.width;
  BLANK_CANVAS.height = modelCanvas.height;
  let expected = compareCanvases(BLANK_CANVAS, modelCanvas);
  let actual = compareCanvases(BLANK_CANVAS, drawCanvas);
  let delta = Math.abs(expected - actual);
  let score = calculateScore(delta);
  return score;
}

function calculateScore(delta) {
  let S = config.baseScore,
    T = config.threshold,
    p = config.penalty_ratio;
  if (delta < T) {
    return (S * T) / delta;
  }
  return -((S * delta) / T) * p;
}

function submitCanvas(modelCanvas, drawCanvas, cb) {
  let delta = compareStrokes(modelCanvas, drawCanvas);
  let score = calculateScore(delta);
  if (cb) cb(score);
}

function addSubmitCanvas(keyCode, modelCanvas, drawCanvas, cb) {
  document.addEventListener("keypress", (event) => {
    if (event.code === keyCode) {
      submitCanvas(modelCanvas, drawCanvas, cb);
    }
  });
}
