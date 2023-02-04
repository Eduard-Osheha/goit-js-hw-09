const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;
startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

let intervalId = 0;


function onStartClick(e) { 
    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled');

   intervalId = setInterval(() => {
       body.style.backgroundColor = `${getRandomHexColor()}`;
   }, 700);  
    
    return intervalId;
}

function onStopClick(e) {
     startBtn.removeAttribute('disabled');
     stopBtn.setAttribute('disabled', 'true');
    clearInterval(intervalId);
   
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
