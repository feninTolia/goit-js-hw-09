const refs = {
  // controllBtns: document.querySelector();
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let intervalID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

const onStartBtnClick = e => {
  e.target.classList.add('css-disabled');
  changeColor();
  intervalID = setInterval(changeColor, 1000);
  e.target.disabled = true;
};

const onStopBtnClick = e => {
  clearInterval(intervalID);
  refs.start.disabled = false;
  refs.start.classList.remove('css-disabled');
};

refs.start.addEventListener('click', onStartBtnClick);
refs.stop.addEventListener('click', onStopBtnClick);
