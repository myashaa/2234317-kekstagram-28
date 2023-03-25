import {
  MIN_SCALE_VALUE,
  MAX_SCALE_VALUE,
  SCALING_STEP_VALUE
} from '/js/setup.js';

const decreasingScaleBtn = document.querySelector('.scale__control--smaller');
const increasingScaleBtn = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const changeScale = (currScaleValue, scaleCoefficient) => {
  currScaleValue += scaleCoefficient * SCALING_STEP_VALUE;

  const pointScaleValue = currScaleValue / MAX_SCALE_VALUE;
  imgPreview.style.transform = `scale(${pointScaleValue})`;

  currScaleValue = String(currScaleValue);
  currScaleValue += '%';
  scaleValueElement.value = currScaleValue;
};

const decreaseScale = () => {
  const scaleValue = Number(scaleValueElement.value.slice(0, -1));
  if (scaleValue - SCALING_STEP_VALUE >= MIN_SCALE_VALUE) {
    changeScale(scaleValue, -1);
  }
};

const increaseScale = () => {
  const scaleValue = Number(scaleValueElement.value.slice(0, -1));
  if (scaleValue + SCALING_STEP_VALUE <= MAX_SCALE_VALUE) {
    changeScale(scaleValue, 1);
  }
};

const setScale = () => {
  decreasingScaleBtn.addEventListener('click', decreaseScale);
  increasingScaleBtn.addEventListener('click', increaseScale);
};

const resetScale = () => {
  imgPreview.style.transform = 'scale(1)';

  decreasingScaleBtn.removeEventListener('click', decreaseScale);
  increasingScaleBtn.removeEventListener('click', increaseScale);
};

export {
  setScale,
  resetScale
};
