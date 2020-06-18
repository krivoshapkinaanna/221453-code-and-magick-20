'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var TOTALWIZARDS = 4;
var FIREBALL_WRAP = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupForm = setup.querySelector('.setup-wizard-form');
var userNameInput = document.querySelector('.setup-user-name');

// Задали переменную обработчика Escape
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== userNameInput) {
    evt.preventDefault();
    setup.classList.add('hidden');
  }
};

// Объявили функцию открытия и закрытия.
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Повесили обработчик на открытие и закрытие. (Согласно лекции по критериям обработчики нужно отделять от функций, которые несут какую-то логику)
setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

// Добавлен обработчик на форму. (Пока оставили в таком виде, позже добавить evt в функцию.
setupForm.addEventListener('submit', function () {
  // evt.preventDefault();
  closePopup();
});

document.querySelector('.setup-similar').classList.remove('hidden');

// Список, куда добавляем магов, и шаблон.
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Функция для получения целого случайного числа включительно
var getRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция создания свойств мага
var generateWizard = function () {
  var wizard = {
    name: NAMES[getRandom(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandom(0, SURNAMES.length - 1)],
    coatColor: COAT_COLOR[getRandom(0, COAT_COLOR.length - 1)],
    eyesColor: EYES_COLOR[getRandom(0, EYES_COLOR.length - 1)],
  };
  return wizard;
};

// Функция для создания массива магов
var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < TOTALWIZARDS; i++) {
    wizards.push(generateWizard());
  }
  return wizards;
};

var wizards = generateWizards();

// Функция для отрисовки мага.
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Добавление магов в список.
var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < TOTALWIZARDS; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};
renderWizards();


// Смена цвета фаербола по клику
var setupFireball = setup.querySelector('.setup-fireball-wrap');
setupFireball.addEventListener('click', function () {
  var fireballColor = FIREBALL_WRAP[getRandom(0, FIREBALL_WRAP.length - 1)];
  setupFireball.style.background = fireballColor;
  setupFireball.querySelector('input').value = fireballColor;
});

// Смена цвета пальто по клику
var setupCoat = setup.querySelector('.setup-wizard .wizard-coat');
setupCoat.addEventListener('click', function () {
  var setupCoatColor = COAT_COLOR[getRandom(0, COAT_COLOR.length - 1)];
  setupCoat.style.fill = setupCoatColor;
  setupCoat.querySelector('input .coat-color').value = setupCoatColor;
});

// Смена цвета глаз по клику
var setupEyes = setup.querySelector('.setup-wizard .wizard-eyes');
setupEyes.addEventListener('click', function () {
  var setupEyesColor = EYES_COLOR[getRandom(0, EYES_COLOR.length - 1)];
  setupEyes.style.fill = setupEyesColor;
  setupEyes.querySelector('input .eyes-color').value = setupEyesColor;
});

// Валидация формы имени


userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Вывод кастомного сообщения при вводу в форму
userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

