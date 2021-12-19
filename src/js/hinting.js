const hintElm = document.querySelector("#hint");

/**
 *
 * @param {*} hintCountElm The element to display hint count
 * @param {*} showHintBtn The button to trigger showing hint
 * @param {*} maxHints Number of max hints
 * @param {*} toggleHintElm The element to toggle hint
 */
function addHinting(
  hintCountElm,
  showHintBtn,
  maxHints,
  toggleHintElm,
  opt,
  keyCode
) {
  if (!opt) opt = {};
  let setHintCount = (value) => {
    opt.hintCount = value;
    hintCountElm.innerHTML = opt.hintCount;
  };
  setHintCount(maxHints);
  let closeHint = () => {
    toggleHintElm.setAttribute("class", "d-hidden");
    let arr = globalThis.bitChangedListeners;
    arr.splice(arr.indexOf(closeHint), 1);
  };
  let showHint = () => {
    if (opt.hintCount > 0) {
      setHintCount(opt.hintCount - 1);
      toggleHintElm.setAttribute("class", "");
      globalThis.bitChangedListeners.push(closeHint);
    }
  };
  showHintBtn.addEventListener("click", showHint);
  if (typeof keyCode == "string") {
    document.addEventListener("keypress", (event) => {
      if (event.code === keyCode) {
        showHint();
      }
    });
  }
}
