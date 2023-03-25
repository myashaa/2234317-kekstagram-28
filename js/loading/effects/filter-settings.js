import {
  DEFAULT_FILTER,
  FILTER_PARAMS
} from '/js/setup.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');

let currentFilter = '';

const setUiSlider = () => {
  currentFilter = DEFAULT_FILTER;

  noUiSlider.create(sliderElement, {
    range: {
      min: FILTER_PARAMS[DEFAULT_FILTER].min,
      max: FILTER_PARAMS[DEFAULT_FILTER].max,
    },
    start: FILTER_PARAMS[DEFAULT_FILTER].max,
    step: FILTER_PARAMS[DEFAULT_FILTER].step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    const newValue = sliderElement.noUiSlider.get();
    valueElement.value = newValue;

    if (currentFilter !== DEFAULT_FILTER) {
      imgPreview.style.filter = `${FILTER_PARAMS[currentFilter].filter}(${newValue}${FILTER_PARAMS[currentFilter].unitsOfMeasurement})`;
    } else {
      imgPreview.style.removeProperty('filter');
    }
  });
};

const updateUiSlider = (value) => {
  currentFilter = value;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: FILTER_PARAMS[value].min,
      max: FILTER_PARAMS[value].max
    },
    start: FILTER_PARAMS[value].max,
    step: FILTER_PARAMS[value].step
  });
};

const resetUiSlider = () => {
  currentFilter = '';
  valueElement.value = '';
  sliderElement.noUiSlider.destroy();
};

export {
  setUiSlider,
  updateUiSlider,
  resetUiSlider
};
