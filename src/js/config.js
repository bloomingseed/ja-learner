globalThis.config = {
  /**
   * Level configs
   */
  mode: "hira", // select mode: "hira" for hiragana characters, "kana" for katankana characters
  speed: 2, // px/frame; normal text speed
  slowModeSpeed: 0.5, // px/frame; text speed in slow mode
  fastModeSpeed: 10, // px/frame; text speed in fast mode
  textColor: "white", // color of the falling text
  backgroundColor: "#76ba27", // color of the falling text canvas background
  font: "44px Otsutome", // font of the text
  vanishingLineRatio: 1, // percentage of canvas height where a text is considered out of canvas
  marginRight: -132, // px; the space from the right of canvas that text won't appear
  marginLeft: 44, // px; the space from the left of canvas that text won't appear
  minSpacingRatio: 0.5, // percentage of min distance between 2 consecutive word relative to canvas height
  maxSpacingRatio: 2, // percentage of max distance between 2 consecutive word relative to canvas height
  fps: 30, // game repainting speed
  /**
   * Drawing canvas config
   */
  lineWidth: 4, // px; pen width
  strokeStyle: "#333", // color of pen
  shadowColor: "#333", // color of pen shadow
  shadowBlur: 3 / 4, // size of pen color blur
  /**
   * Compare images config
   */
  penalty_ratio: 0.4, // the propotion of penalty score to keep
  baseScore: 10, // base score means the minimum bonus score
  threshold: 60, // px; number of different pixels to be a correct answer
};
