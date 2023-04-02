import {
  MIN_SCALE_VALUE,
  MAX_SCALE_VALUE,
  SCALING_STEP_VALUE
} from 'js/setup.js';

const decreasingScaleBtnClass = 'scale__control--smaller';
const increasingScaleBtnClass = 'scale__control--bigger';
const decreasingScaleBtn = document.querySelector(`.${decreasingScaleBtnClass}`);
const increasingScaleBtn = document.querySelector(`.${increasingScaleBtnClass}`);
const scaleValueElement = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const changeScaleValue = (currScaleValue, scaleCoefficient) => {
  currScaleValue += scaleCoefficient * SCALING_STEP_VALUE;

  const pointScaleValue = currScaleValue / MAX_SCALE_VALUE;
  imgPreview.style.transform = `scale(${pointScaleValue})`;

  scaleValueElement.value = `${ String(currScaleValue) }%`;
};

const changeScale = (evt) => {
  const isDecreasingScaleBtn = evt.target.classList.contains(decreasingScaleBtnClass);
  const isIncreasingScaleBtn = evt.target.classList.contains(increasingScaleBtnClass);

  let scaleCoefficient = 1;
  if (isDecreasingScaleBtn) {
    scaleCoefficient = -1;
  }

  const scaleValue = parseInt(scaleValueElement.value, 10);

  const canDecreaseScale = (scaleValue - SCALING_STEP_VALUE >= MIN_SCALE_VALUE);
  const canIncreaseScale = (scaleValue + SCALING_STEP_VALUE <= MAX_SCALE_VALUE);

  if ((isDecreasingScaleBtn && canDecreaseScale) || (isIncreasingScaleBtn && canIncreaseScale)) {
    changeScaleValue(scaleValue, scaleCoefficient);
  }
};

const setScale = () => {
  decreasingScaleBtn.addEventListener('click', changeScale);
  increasingScaleBtn.addEventListener('click', changeScale);
};

const resetScale = () => {
  imgPreview.style.transform = 'scale(1)';

  decreasingScaleBtn.removeEventListener('click', changeScale);
  increasingScaleBtn.removeEventListener('click', changeScale);
};

export {
  setScale,
  resetScale
};
