import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';

const startTimer = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      startTimer.removeAttribute('disabled');
    }

    startTimer.addEventListener('click', onStartTimer);

    function onStartTimer() {
      let intervalId = null;

      intervalId = setInterval(() => {
        const isActive = false;
        const startTime = selectedDates[0].getTime();
        const currentTime = Date.now();
        const delta = startTime - currentTime;

        const { days, hours, minutes, seconds } = convertMs(delta);

        if (isActive) {
          return;
        }

        daysField.textContent = `${days}`;
        hoursField.textContent = `${hours}`;
        minutesField.textContent = `${minutes}`;
        secondsField.textContent = `${seconds}`;

        if (
          Number(`${seconds}`) === 0 &&
          Number(`${minutes}`) === 0 &&
          Number(`${hours}`) === 0 &&
          Number(`${days}`) === 0
        ) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
