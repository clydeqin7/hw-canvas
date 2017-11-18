
        var canvas = document.getElementById('zzzz');
        var context = canvas.getContext('2d');

        // 获取当前的size变化
        var currentSize = toolSize.value
        toolSize.onchange = function () {
            currentSize = toolSize.value
        }

        autoSetCanvasSize()

        listenToMouse(canvas)

        var eraserEnabled = false
        eraser.onclick = function () {
            eraserEnabled = true
            tools.className = "tools x"
        }
        brush.onclick = function () {
            eraserEnabled = false
            tools.className = "tools"
        }

        /***************/
        function listenToMouse(canvas) {
            var using = false;
            var lastPoint = { x: 0, y: 0 }
            canvas.onmousedown = function (dff) {
                var x = dff.clientX;
                var y = dff.clientY;
                using = true
                if (eraserEnabled) {
                    setClearRect(x, y, currentSize)
                } else {
                    if (using) {
                        lastPoint.x = x;
                        lastPoint.y = y;
                    }
                }
            }



            canvas.onmousemove = function (dff) {
                var x2 = dff.clientX;
                var y2 = dff.clientY;
                if (using) {
                    if (eraserEnabled) {
                        setClearRect(x2, y2, currentSize)
                    } else {
                        drawLine(lastPoint.x, lastPoint.y, x2, y2)
                        lastPoint.x = x2
                        lastPoint.y = y2
                    }
                }
            }

            canvas.onmouseup = function () {
                using = false;
            }
        }

        /*根据size大小设置清除范围*/
        function setClearRect(x, y, size){
            var sizeX = size * 5
            context.clearRect(x-sizeX/2, y-sizeX/2, sizeX, sizeX)
        }        

        /*划圆*/
        function drawCircle(x, y, radius) {
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
        }

        /*划线*/
        function drawLine(x1, y1, x2, y2) {
            context.beginPath()
            context.strokeStyle = 'black'
            context.lineWidth = currentSize
            context.moveTo(x1, y1)
            context.lineTo(x2, y2)
            context.stroke()
        }

        function autoSetCanvasSize() {
            setCanvasSize()

            window.onresize = function () {
                setCanvasSize()
            }

            function setCanvasSize() {
                var pageWidth = document.documentElement.clientWidth
                var pageHeight = document.documentElement.clientHeight
                canvas.width = pageWidth
                canvas.height = pageHeight
            }
        }    