const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let setIntervalId = null;

startBtn.addEventListener('click', onStartChangeRandomColor);
stopBtn.addEventListener('click', onStopChangeRandomColor);

function onStartChangeRandomColor(event) {
  const isDisabled = false;

  if (!isDisabled) {
    event.target.setAttribute('disabled', '');
  }

  stopBtn.removeAttribute('disabled');

  setIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopChangeRandomColor() {
  clearInterval(setIntervalId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
