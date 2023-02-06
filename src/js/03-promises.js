import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.getElementsByName('delay'),
  stepInput: document.getElementsByName('step'),
  amountInput: document.getElementsByName('amount'),
  submitBtn: document.querySelector('button'),
};

refs.submitBtn.addEventListener('click', onSubmit);


function onSubmit(e) {
  e.preventDefault();
   
   const qtyOfCreatedPromise = refs.amountInput[0].value;
   const step = refs.stepInput[0].value;
   const delayFirst = refs.delayInput[0].value; 
  let delay = 0;
  
  for (let i = 1; i <= qtyOfCreatedPromise; i += 1) {  
    let position = i;
    let delay = Number(delayFirst) + Number(step) * (position - 1);

   createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });  
  }
  refs.form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


