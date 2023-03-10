import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const disableBtn = startBtn.setAttribute('disabled', 'true');

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

startBtn.addEventListener('click', onTimerStart);

Notify.init({
  width: '280px',
  position: 'center-top',
}); 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
   minuteIncrement: 1,

  onClose(selectedDates) {
    const startTime = selectedDates[0].getTime(); 
    const currentTime = Date.now();
    
    if (startTime < currentTime) {
    Notify.failure("Please choose a date in the future")
      } else {
      Notify.success("Thank you for correct choose")
      startBtn.removeAttribute('disabled');
    };
    },
};
const myCalendar = flatpickr(input, options);

function onTimerStart(e) {  
 const startTime = myCalendar.selectedDates[0].getTime();

  setInterval(() => {   
       
       const currentTime = Date.now();
      const deltaTime = startTime - currentTime;

      updateClockFace(convertMs(deltaTime));
    }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
};

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
   refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
     refs.seconds.textContent = `${seconds}`;
}

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
