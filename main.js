var canvas = document.getElementById("zzzz");
var context = canvas.getContext("2d");

// 获取当前的画笔大小变化
    var currentSize = 4;
// var currentSize = toolSize.value;
// toolSize.onchange = function() {
//   currentSize = toolSize.value;
// };

autoSetCanvasSize();

listenToUser(canvas);
// 设置默认的画笔颜色
context.strokeStyle = 'black';

//eraser和brush切换
var eraserEnabled = false;
eraser.onclick = function() {
  eraserEnabled = true;
//   tools.className = "tools x";
  eraser.classList.add('active');
  brush.classList.remove('active');
  penSet.classList.add('disEnable');
};
brush.onclick = function() {
  eraserEnabled = false;
  eraser.classList.remove('active');
  brush.classList.add('active');
  penSet.classList.remove('disEnable');
//   tools.className = "tools";
};

//画笔颜色
black.onclick = function(){
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    context.strokeStyle = 'balck';
}
red.onclick = function(){
    red.classList.add('active');
    black.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    context.strokeStyle = 'red';
}
green.onclick = function(){
    green.classList.add('active');
    black.classList.remove('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    context.strokeStyle = 'green';
}
blue.onclick = function(){
    blue.classList.add('active');
    black.classList.remove('active');
    red.classList.remove('active');
    green.classList.remove('active');
    context.strokeStyle = 'blue';
}
//清屏操作
clearDraw.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}
//下载操作
xiazai.onclick = function(){
    //此处必须用""双引号？？？
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '图画';
    a.target = '_blank';
    a.click();
}
//画笔大小
large.onclick = function(){
  large.classList.add('active');
  small.classList.remove('active');
  middle.classList.remove('active');
  currentSize = 7;
}
middle.onclick = function(){
  middle.classList.add('active');
  small.classList.remove('active');
  large.classList.remove('active');
  currentSize = 4;
}
small.onclick = function(){
  small.classList.add('active');
  large.classList.remove('active');
  middle.classList.remove('active');
  currentSize = 1;
}

/***************/
function listenToUser(canvas) {
  var using = false;
  var lastPoint = { x: 0, y: 0 };

  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function(aaa) {
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if (eraserEnabled) {
        setClearRect(x, y, currentSize);
      } else {
        if (using) {
          lastPoint.x = x;
          lastPoint.y = y;
        }
      }  
    };
    canvas.ontouchmove = function(aaa) {
      var x2 = aaa.touches[0].clientX;
      var y2 = aaa.touches[0].clientY;
      if (using) {
        if (eraserEnabled) {
          setClearRect(x2, y2, currentSize);
        } else {
          drawLine(lastPoint.x, lastPoint.y, x2, y2);
          lastPoint.x = x2;
          lastPoint.y = y2;
        }
      } 
    };
    canvas.ontouchend = function() {
      using = false;
    };
  } else {
    // 非触屏设备  
    canvas.onmousedown = function(dff) {
      var x = dff.clientX;
      var y = dff.clientY;
      using = true;
      if (eraserEnabled) {
        setClearRect(x, y, currentSize);
      } else {
        if (using) {
          lastPoint.x = x;
          lastPoint.y = y;
        }
      }
    };

    canvas.onmousemove = function(dff) {
      var x2 = dff.clientX;
      var y2 = dff.clientY;
      if (using) {
        if (eraserEnabled) {
          setClearRect(x2, y2, currentSize);
        } else {
          drawLine(lastPoint.x, lastPoint.y, x2, y2);
          lastPoint.x = x2;
          lastPoint.y = y2;
        }
      }
    };

    canvas.onmouseup = function() {
      using = false;
    };
  }
}

/*根据size大小设置清除范围*/
function setClearRect(x, y, size) {
  var sizeX = size * 5;
  context.clearRect(x - sizeX / 2, y - sizeX / 2, sizeX, sizeX);
}

/*划圆*/
function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

/*划线*/
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
//   context.strokeStyle = "black";
  context.lineWidth = currentSize;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function autoSetCanvasSize() {
  setCanvasSize();

  window.onresize = function() {
    setCanvasSize();
  };

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}
