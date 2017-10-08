
  var windowTemplate = document.createElement('div');
      windowTemplate.className = 'window';
      windowTemplate.innerHTML =  '<div class="window-header">' +
                                    '<span>Шапка</span>' +
                                    '<button type="button" class="btn-window-header btn-window-close">х</button>' +
                                  '</div>' +
                                  '<div class="window-body">' +
                                    '<ul class="list">' +
                                      '<li class="list-item">1</li>' +
                                      '<li class="list-item">2</li>' +
                                      '<li class="list-item">3</li>' +
                                      '<li class="list-item">4</li>' +
                                    '</ul>' +
                                  '</div>';

  var  openWindowElem = document.getElementById('btnOpenWindow');

  var windows = [];

  openWindowElem.onclick = function(e) {
    e.preventDefault();
    createWindow();
  }

  function createWindow() {
    var windowEl = windowTemplate.cloneNode(true);

    document.body.appendChild(windowEl);

    windows.push(windowEl);
    setActiveWindow(windowEl, windows);

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    windowEl.style.top = 170 + 'px';
    windowEl.style.left = windowWidth / 2 - windowEl.offsetWidth / 2 + 'px';

    var header = windowEl.children[0];
    var closeBtn = header.lastChild;

    header.onmousedown = function(e) {

      function moveAt(e, element) {
        element.style.left = e.pageX - shiftX + 'px';
        element.style.top = e.pageY - shiftY + 'px';
      }

      var coords = getCoords(windowEl);

      var shiftX = e.pageX - coords.left;
      var shiftY = e.pageY - coords.top;

      moveAt(e, windowEl);

      setActiveWindow(windowEl, windows);

      document.onmousemove = function(e) {
        moveAt(e, windowEl);
      };

      document.onmouseup = function(e) {        
        document.onmousemove = null;
        document.onmouseup = null;
        if (e.pageY - shiftY < 0) {
            windowEl.style.top = 0;
        }
      };

    }

    closeBtn.onclick = function(e) {
      header.onmousedown = null;
      closeBtn.onclick = null;
      removeElementFromArray(windowEl, windows);
      document.body.removeChild(windowEl);
    }

  }

  function setActiveWindow(element, array) {
    var arrLength = array.length;
    for (var i = 0; i < arrLength; i++){
      array[i].style.zIndex = '';
    }
    element.style.zIndex = 1000;
  }

  function removeElementFromArray(element ,array) {

    Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) {
        var a;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var c = Object(this),
            b = c.length >>> 0;
        if (0 === b) return -1;
        a = +e || 0;
        Infinity === Math.abs(a) && (a = 0);
        if (a >= b) return -1;
        for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
            if (a in c && c[a] === d) return a;
            a++
        }
        return -1
    });

    var index = array.indexOf(element);
    array.splice(index, 1);
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
      top: top,
      left: left
    };
  }

  document.body.ondragstart = function() {
    return false;
  };
