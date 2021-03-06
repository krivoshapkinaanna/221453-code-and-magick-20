'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var TOTALWIZARDS = 4;

// Покажет блок с похожими магами.
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

// Список, куда добавляем магов, и шаблон.
var similarListElement = userDialog.querySelector('.setup-similar-list');
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
