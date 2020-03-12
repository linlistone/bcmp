function Imworldcloud (canvas, options) {
  var that = this;
  this.renderWords = [];
  this.unRenderWords = [];
  options.hover = function (item, dimension, event) {
    if (options.tooltip.show === false) {
      return;
    }
    var _this = this;
    if (options.tooltip && options.tooltip.show === true) {
      if (!this.tooltip) {
        this.tooltip = document.createElement('div');
        this.tooltip.style.backgroundColor = options.tooltip.backgroundColor || 'rgba(0, 0, 0, 0.6)';
        this.tooltip.style.color = '#fff';
        this.tooltip.style.padding = '5px';
        this.tooltip.style.borderRadius = '5px';
        this.tooltip.style.fontSize = '12px';
        this.tooltip.style.fontFamily = options.fontFamily || 'Microsoft YaHei';
        this.tooltip.style.lineHeight = 1.4;
        this.tooltip.style.webkitTransition = 'left 0.2s, top 0.2s';
        this.tooltip.style.mozTransition = 'left 0.2s, top 0.2s';
        this.tooltip.style.transition = 'left 0.2s, top 0.2s';
        this.tooltip.style.position = 'absolute';
        this.tooltip.style.whiteSpace = 'nowrap';
        this.tooltip.style.zIndex = 999;
        this.tooltip.style.display = 'none';
        canvas.parentElement.appendChild(this.tooltip);
        this.onmouseout = function () {
          _this.tooltip.style.display = 'none';
        };
      }
    }
    if (item && this.tooltip) {
      var html = item[0];
      if (typeof options.tooltip.formatter === 'function') {
        html = options.tooltip.formatter(item);
      }
      _this.tooltip.innerHTML = html;
      _this.tooltip.style.top = event.offsetY + 10 + 'px';
      _this.tooltip.style.left = event.offsetX + 15 + 'px';
      _this.tooltip.style.display = 'block';
    } else {
      _this.tooltip.style.display = 'none';
    }
  };
  maskCanvas = null;
  if (options.shape.indexOf('.png') >= 0) {
    var img = new Image();
    img.src = options.shape;
    img.crossOrigin = '';
    img.onload = function readPixels () {
      maskCanvas = document.createElement('canvas');
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;

      var ctx = maskCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      var imageData = ctx.getImageData(
        0, 0, maskCanvas.width, maskCanvas.height);
      var newImageData = ctx.createImageData(imageData);

      for (var i = 0; i < imageData.data.length; i += 4) {
        var tone = imageData.data[i] +
          imageData.data[i + 1] +
          imageData.data[i + 2];
        var alpha = imageData.data[i + 3];

        if (alpha < 128 || tone > 128 * 3) {
          // Area not to draw
          newImageData.data[i] =
            newImageData.data[i + 1] =
            newImageData.data[i + 2] = 255;
          newImageData.data[i + 3] = 0;
        } else {
          // Area to draw
          newImageData.data[i] =
            newImageData.data[i + 1] =
            newImageData.data[i + 2] = 0;
          newImageData.data[i + 3] = 255;
        }
      }

      ctx.putImageData(newImageData, 0, 0);
      run();
    };
  }

  var run = function () {
    var width = canvas.width;
    var height = Math.floor(width * 0.65);
    var pixelWidth = width;
    var pixelHeight = height;

    if (devicePixelRatio !== 1) {
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      pixelWidth *= devicePixelRatio;
      pixelHeight *= devicePixelRatio;
    } else {
      canvas.style.width = '';
      canvas.style.height = '';
    }

    canvas.setAttribute('width', pixelWidth);
    canvas.setAttribute('height', pixelHeight);

    // Set the options object

    // Set devicePixelRatio options
    if (devicePixelRatio !== 1) {
      if (!('gridSize' in options)) {
        options.gridSize = 8;
      }
      options.gridSize *= devicePixelRatio;

      if (options.origin) {
        if (typeof options.origin[0] == 'number') {
          options.origin[0] *= devicePixelRatio;
        }
        if (typeof options.origin[1] == 'number') {
          options.origin[1] *= devicePixelRatio
          ;
        }
      }

      if (!('weightFactor' in options)) {
        options.weightFactor = 1;
      }
      if (typeof options.weightFactor == 'function') {
        var origWeightFactor = options.weightFactor;
        options.weightFactor =
          function weightFactorDevicePixelRatioWrap () {
            return origWeightFactor.apply(this, arguments) * devicePixelRatio;
          };
      } else {
        options.weightFactor *= devicePixelRatio;
      }
    }

    if (maskCanvas) {
      options.clearCanvas = false;

      /* Determine bgPixel by creating
         another canvas and fill the specified background color. */
      var bctx = document.createElement('canvas').getContext('2d');

      bctx.fillStyle = options.backgroundColor || '#fff';
      bctx.fillRect(0, 0, 1, 1);
      var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

      var maskCanvasScaled =
        document.createElement('canvas');
      maskCanvasScaled.width = canvas.width;
      maskCanvasScaled.height = canvas.height;
      var ctx = maskCanvasScaled.getContext('2d');

      ctx.drawImage(maskCanvas,
        0, 0, maskCanvas.width, maskCanvas.height,
        0, 0, maskCanvasScaled.width, maskCanvasScaled.height);

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var newImageData = ctx.createImageData(imageData);
      for (var i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] > 128) {
          newImageData.data[i] = bgPixel[0];
          newImageData.data[i + 1] = bgPixel[1];
          newImageData.data[i + 2] = bgPixel[2];
          newImageData.data[i + 3] = bgPixel[3];
        } else {
          // This color must not be the same w/ the bgPixel.
          newImageData.data[i] = bgPixel[0];
          newImageData.data[i + 1] = bgPixel[1];
          newImageData.data[i + 2] = bgPixel[2];
          newImageData.data[i + 3] = bgPixel[3] ? bgPixel[3] - 1 : 0;
        }
      }

      ctx.putImageData(newImageData, 0, 0);

      ctx = canvas.getContext('2d');
      ctx.drawImage(maskCanvasScaled, 0, 0);

      maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = undefined;
    }

    WordCloud(canvas, options);
  };
  canvas.addEventListener('wordclouddrawn', function (e) {
    var item = e.detail.item;
    if (e.detail.drawn) {
      that.renderWords.push(item[0]);
    } else {
      that.unRenderWords.push(item[0]);
    }
  });
}