'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_Y_BOTTOM = CLOUD_Y + CLOUD_HEIGHT;
var GAP = 20;
var BAR_GAP = 50;
var FONT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function(ctx, x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    };
  };
  return maxElement;
};
window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

 ctx.font = '16px PT Mono';
 ctx.fillStyle = '#000';
 ctx.fillText('Ура вы победили!', CLOUD_X + GAP, 40);
 ctx.fillText('Список результатов:', CLOUD_X + GAP, 60);
 ctx.fillStyle = '#000';

var maxTime = getMaxElement(times);

for (var i = 0; i < players.length; i++) {
  ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y_BOTTOM - GAP);
  ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y_BOTTOM - GAP - FONT_GAP, BAR_WIDTH, - (BAR_HEIGHT * times[i] / maxTime));
  ctx.fillText('times[i]', CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y_BOTTOM - GAP - (BAR_HEIGHT * times[i] / maxTime) - FONT_GAP); //пока непонятно как настроить отступы//
};
};
