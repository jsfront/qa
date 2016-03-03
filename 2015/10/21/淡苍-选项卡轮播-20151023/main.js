var imgLength = 768;
var show = document.getElementById('show');
var list = show.getElementsByTagName('img');
var isPlay;
var imgSpeed = 1000;

//初始化图片的位置
var init = function() {
  for(var i = 0; i < list.length; i++){
    list[i].style.left = (i * imgLength) + 'px';
  }
}

//移动函数
var moveElement = function(elementID, final_x, final_y, interval) {
  var elem = document.getElementById(elementID);
  if(elem.movement) {
    clearTimeout(elem.movement);
  }

  var x = parseInt(elem.style.left);
  var y = parseInt(elem.style.top);

  if(x == final_x && y == final_y){
    return true;
  }
  if(x < final_x){
    x = x + Math.ceil((final_x - x) / 10);
  }else{
    x = x - Math.ceil((x - final_x) / 10);
  }
  if(y < final_y){
    y = y + Math.ceil((final_y - y) / 10);
  }else{
    y = y - Math.ceil((y - final_y) / 10);
  }
  elem.style.left = x + "px";
  elem.style.top = y + "px";

  var repeat = `moveElement('${elementID}', ${final_x}, ${final_y}, ${interval})`;
  elem.movement = setTimeout(repeat, interval);
}

var clearImgClass = function() {
  var smallList = document.getElementsByTagName('li');
  for(var i = 0; i < smallList.length; i++){
    var imgSelect = smallList[i].getElementsByTagName('img');
    imgSelect[0].setAttribute("class", " ");
  }
}

//为下方缩略图添加事件
var prepareSlideshow = function() {
  var smallList = document.getElementsByTagName('li');
  for(var i = 0; i < smallList.length; i++){
    var imgSelect = smallList[i].getElementsByTagName('img');

    imgSelect[0].onmouseover = function() {
      //先清除list ul li 下的img class
      clearImgClass();
      this.setAttribute("class", "mouseover");
      var number = parseInt(this.getAttribute("id"));
      var dis = -(number * imgLength);
      //取消自动播放
      clearInterval(isPlay);
      moveElement('show', dis, 0, 10);
    }

    imgSelect[0].onmouseout = function() {
      var number = parseInt(this.getAttribute("id"));
      //从当前位置再开始自动播放
      isPlay = setInterval("play()", imgSpeed);
    }
  }
}

//自动轮播
var play = function(){
  var nowPos = document.getElementsByClassName('mouseover')[0];

  //先确定下一个位置
  var next = parseInt(nowPos.getAttribute("id")) + 1;
  nowPos.setAttribute("class", " ");
  if(next == list.length) next = 0;
  document.getElementById(next).setAttribute("class", "mouseover");

  var dis = -(next * imgLength);
  moveElement('show', dis, 0, 10);
}

isPlay = setInterval("play()", imgSpeed);

init();
prepareSlideshow();
