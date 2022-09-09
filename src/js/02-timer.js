import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '330px',
        borderRadius: '50px',
        fontSize: '16px',
        clickToClose: true,
        timeout: 4000,
        failure: {
          background: '#FF7B08',
          textColor: '#000',
        },
      });
      return;
    }
    refs.startBtn.disabled = false;
    return (selectedDate = selectedDates[0].getTime());
  },
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const refs = {
  startBtn: document.querySelector('[data-start-timer]'),
  timerField: document.querySelector('.timer'),
};
let selectedDate = null;
refs.startBtn.disabled = true;

flatpickr('input#datetime-picker', options);

refs.startBtn.addEventListener(
  'click',
  () => {
    let intID = setInterval(() => {
      let diff = selectedDate - Date.now();

      if (diff < 0) {
        clearInterval(intID);
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(diff);

      refs.timerField.querySelector('[data-days]').textContent =
        addLeadingZero(days);
      refs.timerField.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      refs.timerField.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      refs.timerField.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
      refs.timerField.querySelector('[data-seconds]').style.color =
        getRandomHexColor();
    }, 1000);
  },
  { once: true }
);
