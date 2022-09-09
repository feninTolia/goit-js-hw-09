import Notiflix from 'notiflix';
Notiflix.Notify.init({
  useIcon: false,

  borderRadius: '20px',
  timeout: 4000,
  fontSize: '16px',
  clickToClose: true,
});

const refs = {
  form: document.querySelector('.form'),
  amount: document.querySelector('[name="amount"]'),
  step: document.querySelector('[name="step"]'),
  delay: document.querySelector('[name="delay"]'),
};

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

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);

  for (let i = 1; i <= Number(refs.amount.value); i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.success(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
});

// ! Майже правильне вирішення через 2 проміса
// let firstDelay = null;
// let step = null;
// let position = null;
// let notifyTimerDelay = 0;
// let promiseMessageDelay = 0;

// function fristDelayPromise() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, firstDelay);
//   });
// }

// function createPromise(position, step) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve({ position, step });
//     } else {
//       reject({ position, step });
//     }
//   });
// }

// refs.form.addEventListener('input', e => {
//   position = refs.form.amount.value;
//   step = Number(refs.form.step.value);
//   firstDelay = Number(refs.form.delay.value);
// });

// refs.form.addEventListener('submit', e => {
//   e.preventDefault();

//   fristDelayPromise().then(() => {
//     promiseMessageDelay = firstDelay;
//     notifyTimerDelay -= step;

//     for (let i = 1; i <= position; i++) {
//       setTimeout(() => {
//         createPromise(i, promiseMessageDelay)
//           .then(({ position, step }) => {
//             Notiflix.Notify.success(
//               `✅ Fulfilled promise ${position} in ${step}ms`
//             );
//           })

//           .catch(({ position, step }) => {
//             Notiflix.Notify.success(
//               `❌ Rejected promise ${position} in ${step}ms`
//             );
//           });

//         promiseMessageDelay += step;
//       }, (notifyTimerDelay += step));
//     }
//   });

//   // refs.form.reset();
// });
