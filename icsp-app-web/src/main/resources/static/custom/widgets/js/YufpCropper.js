/* eslint no-console: 0 */
/* eslint no-undef:0  */
/* eslint no-mixed-operators:0 */
/* eslint no-useless-call:0 */
/**
 * yufp-cropper
 * @created by qfkong 2018-10-17
 * @description 图片裁剪
 */

var Exif = {};
/**
 * 获取图片数据
 * @param {String | Blob | File} img 图片对象，可以是路径或blob值
 * @param {Boolean} mockModel 是否加载了mock
 */
Exif.getData = function (img, mockModel, res, rej) {
  this.mockModel = mockModel;
  return window.Promise ? new Promise(function (reslove, reject) {
    var obj = {};
    getImageData(img).then(function (data) {
      obj.arrayBuffer = data;
      obj.orientation = getOrientation(data);
      reslove(obj);
    }).catch(function (error) {
      reject(error);
    });
  }) : getImageData(img, function (data) {
    var obj = {};
    obj.arrayBuffer = data;
    obj.orientation = undefined; // getOrientation(data);
    res(obj);
  }, function (error) {
    rej(error);
  });
};
/**
 * 此处需要使用原生的XMLHttpRequest对象，在添加Mock后，XMLHttpRequest被拦截修改了
 */
Exif.xhr = function () {
  return new (this.mockModel ? _XMLHttpRequest : XMLHttpRequest)();
};
function getImageBlobData (reslove, reject) {
  var img = this.img;
  if (img.src) {
    if (/^data\\:/i.test(img.src)) { // Data URI
      data = base64ToArrayBuffer(img.src);
      reslove(data);
    } else if (/^blob\\:/i.test(img.src)) { // Object URL
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        data = e.target.result;
        reslove(data);
      };
      objectURLToBlob(img.src, function (blob) {
        fileReader.readAsArrayBuffer(blob);
      });
    } else {
      var xhr = Exif.xhr();
      xhr.open('GET', img.src);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        if (this.status == 200 || this.status === 0) {
          data = xhr.response;
          reslove(data);
        } else {
          throw new Error('Could not load image');
        }
        xhr = null;
      };
      xhr.send();
    }
  } else {
    reject('img error');
  }
}
/**
 * 这里的获取exif要将图片转ArrayBuffer对象，这里假设获取了图片的baes64
 * 步骤一 base64转ArrayBuffer对象
 * @param {String | Blob | File} img 图片对象
 */
function getImageData (img, reslove, reject) {
  this.img = img;
  return window.Promise ? new Promise(getImageBlobData.bind(this)) : getImageBlobData.call(this, reslove, reject);
}
/**
 * 将对象路径转换成Blob对象值
 * @param {String} url 请求url路径
 * @param {Boolean} mockModel 是否加载了mock
 * @param {Function} callback 回调函数
 */
function objectURLToBlob (url, callback) {
  var xhr = Exif.xhr();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    if (this.status == 200 || this.status === 0) {
      callback(this.response);
    }
    xhr = null;
  };
  xhr.send();
}
/**
 * 将base64字符串转换成ArrayBuffer对象
 * @param {String} base64 base64字符串
 */
function base64ToArrayBuffer (base64) {
  base64 = base64.replace(/^data\\:([^\\;]+)\\;base64,/gmi, '');
  var binary = atob(base64),
    len = binary.length,
    buffer = new ArrayBuffer(len),
    view = new Uint8Array(buffer);
  for (var i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}
/**
 * 步骤二，Unicode码转字符串,ArrayBuffer对象 Unicode码转字符串
 * @param {DataView} dataView 数据视图
 * @param {Number} start 开始位置
 * @param {Number} len 总长度
 */
function getStringFromCharCode (dataView, start, len) {
  var str = '', i;
  for (i = start, len += start; i < len; i++) {
    str += String.fromCharCode(dataView.getUint8(i));
  }
  return str;
}
/**
 * 步骤三，获取jpg图片的exif的角度（在ios体现最明显）
 * @param {ArrayBuffer} arrayBuffer 图片文件内存数组
 */
function getOrientation (arrayBuffer) {
  var dataView = new DataView(arrayBuffer),
    length = dataView.byteLength,
    orientation,
    exifIDCode,
    tiffOffset,
    firstIFDOffset,
    littleEndian,
    endianness,
    app1Start,
    ifdStart,
    offset,
    i;
  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    offset = 2;
    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }
      offset++;
    }
  }
  if (app1Start) {
    exifIDCode = app1Start + 4;
    tiffOffset = app1Start + 10;
    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      endianness = dataView.getUint16(tiffOffset);
      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
        if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
          firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

          if (firstIFDOffset >= 0x00000008) {
            ifdStart = tiffOffset + firstIFDOffset;
          }
        }
      }
    }
  }
  if (ifdStart) {
    length = dataView.getUint16(ifdStart, littleEndian);
    for (i = 0; i < length; i++) {
      offset = ifdStart + i * 12 + 2;
      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
        // 8 is the offset of the current tag's value
        offset += 8;

        // Get the original orientation value
        orientation = dataView.getUint16(offset, littleEndian);

        // Override the orientation with its default value for Safari (#120)
        // if (IS_SAFARI_OR_UIWEBVIEW) {
        //   dataView.setUint16(offset, 1, littleEndian);
        // }
        break;
      }
    }
  }
  return orientation;
};
/**
 * 将blob数据转化成base64
 * @param {Blob} blob 待转换数据
 * @param {Function} callback 回调函数
 */
function blobToDataURL (blob, callback) {
  var a = new FileReader();
  a.readAsDataURL(blob);// 读取文件保存在result中
  a.onload = function (e) {
    callback(e.target.result);// 读取的结果在result中
  };
}

(function (vue, $, name) {
  vue.component(name, {
    template: '<div v-if="errorMsg" class="cropper-error-msg">{{errorMsg}}</div><div v-else class="el-row vue-cropper" ref="refCropper">\
      <div class="el-col el-col-18 cropper-container" ref="refCropperContainer" @mouseover="scaleImg" @mouseout="cancleScale">\
        <div class="cropper-box">\
          <div class="cropper-box-canvas" v-show="!loading"\
            :style="{\
              \'width\': trueWidth + \'px\',\
              \'height\': trueHeight + \'px\',\
              \'transform\': \'scale(\' + scale + \',\' + scale + \') \' + \'translate3d(\'+ x / scale + \'px,\' + y / scale + \'px,\' + \'0)\'\
              + \'rotateZ(\'+ rotate * 90 +\'deg)\'\
              }"\
            >\
          <img :src="imgs" alt="cropper-img" ref="refCropperImg" />\
          </div>\
        </div>\
        <div class="el-col-18 cropper-drag-box"\
          :class="{\'cropper-move\': move && !crop, \'cropper-crop\': crop, \'cropper-modal\': cropping}"\
          @mousedown="startMove" @touchstart="startMove">\
        </div>\
        <div v-show="cropping" class="cropper-crop-box"\
          :style="{\
            \'width\': cropW + \'px\',\
            \'height\': cropH + \'px\',\
            \'transform\': \'translate3d(\'+ cropOffsertX + \'px,\' + cropOffsertY + \'px,\' + \'0)\'\
          }">\
        <span class="cropper-view-box">\
          <img\
            :style="{\
              \'width\': trueWidth + \'px\',\
              \'height\': trueHeight + \'px\',\
              \'transform\': \'scale(\' + scale + \',\' + scale + \') \' + \'translate3d(\'+ (x - cropOffsertX) / scale  + \'px,\' + (y - cropOffsertY) / scale + \'px,\' + \'0)\'\
              + \'rotateZ(\'+ rotate * 90 +\'deg)\'\
              }"\
              :src="imgs"\
              alt="cropper-img"/>\
        </span>\
        <span class="cropper-face cropper-move"\
          @mousedown="cropMove"\
          @touchstart="cropMove"></span>\
        <span class="crop-info" v-if="info" :style="{\'top\': cropInfo.top}">\
          {{  this.cropInfo.width }} × {{ this.cropInfo.height }}\
        </span>\
        <span v-if="!fixedBox">\
          <span class="crop-line line-w" @mousedown="changeCropSize($event, false, true, 0, 1)" @touchstart="changeCropSize($event, false, true, 0, 1)"></span>\
          <span class="crop-line line-a" @mousedown="changeCropSize($event, true, false, 1, 0)" @touchstart="changeCropSize($event, true, false, 1, 0)"></span>\
          <span class="crop-line line-s" @mousedown="changeCropSize($event, false, true, 0, 2)" @touchstart="changeCropSize($event, false, true, 0, 2)"></span>\
          <span class="crop-line line-d" @mousedown="changeCropSize($event, true, false, 2, 0)" @touchstart="changeCropSize($event, true, false, 2, 0)"></span>\
          <span class="crop-point point1" @mousedown="changeCropSize($event, true, true, 1, 1)" @touchstart="changeCropSize($event, true, true, 1, 1)"></span>\
          <span class="crop-point point2" @mousedown="changeCropSize($event, false, true, 0, 1)" @touchstart="changeCropSize($event, false, true, 0, 1)"></span>\
          <span class="crop-point point3" @mousedown="changeCropSize($event, true, true, 2, 1)" @touchstart="changeCropSize($event, true, true, 2, 1)"></span>\
          <span class="crop-point point4" @mousedown="changeCropSize($event, true, false, 1, 0)" @touchstart="changeCropSize($event, true, false, 1, 0)"></span>\
          <span class="crop-point point5" @mousedown="changeCropSize($event, true, false, 2, 0)" @touchstart="changeCropSize($event, true, false, 2, 0)"></span>\
          <span class="crop-point point6" @mousedown="changeCropSize($event, true, true, 1, 2)" @touchstart="changeCropSize($event, true, true, 1, 2)"></span>\
          <span class="crop-point point7" @mousedown="changeCropSize($event, false, true, 0, 2)" @touchstart="changeCropSize($event, false, true, 0, 2)"></span>\
          <span class="crop-point point8" @mousedown="changeCropSize($event, true, true, 2, 2)" @touchstart="changeCropSize($event, true, true, 2, 2)"></span>\
        </span>\
      </div>\
    </div>\
    <div v-if="preview && previewUrl" class="el-col el-col-6 show-preview">\
      <img :src="previewUrl" :style="{\'width\':cropW+\'px\',\'height\':cropH+\'px\',\'border-radius\':head?\'50%\':\'\'}"/>\
    </div>\
  </div>',
    data: function () {
      return {
        // 容器高宽
        w: 0,
        h: 0,
        // 图片缩放比例
        scale: 1,
        // 图片偏移x轴
        x: 0,
        // 图片偏移y轴
        y: 0,
        // 图片加载
        loading: true,
        // 图片真实宽度
        trueWidth: 0,
        // 图片真实高度
        trueHeight: 0,
        move: true,
        // 移动的x
        moveX: 0,
        // 移动的y
        moveY: 0,
        // 开启截图
        crop: false,
        // 正在截图
        cropping: false,
        // 裁剪框大小
        cropW: 0,
        cropH: 0,
        cropOldW: 0,
        cropOldH: 0,
        // 判断是否能够改变
        canChangeX: false,
        canChangeY: false,
        // 改变的基准点
        changeCropTypeX: 1,
        changeCropTypeY: 1,
        // 裁剪框的坐标轴
        cropX: 0,
        cropY: 0,
        cropChangeX: 0,
        cropChangeY: 0,
        cropOffsertX: 0,
        cropOffsertY: 0,
        // 支持的滚动事件
        support: '',
        // 移动端手指缩放
        touches: [],
        touchNow: false,
        // 图片旋转
        rotate: 0,
        isIos: false,
        orientation: 0,
        imgs: '',
        // 图片缩放系数
        coe: 0.2,
        // 是否正在多次缩放
        scaling: false,
        scalingSet: '',
        coeStatus: '',
        // 原始文件名，用于上传下载使用
        fileName: '',
        // 标注是否使用了mock，参数从配置文件中传递过来
        mockModel: false,
        // 是否移动端，在移动端部分操作被禁用
        mobile: false,
        // 预览图片路径
        previewUrl: '',
        // 是否头像，头像采用圆形显示
        head: false,
        // 显示错误信息
        errorMsg: ''
      };
    },
    props: {
      img: {
        type: [String, Blob, null, File],
        default: ''
      },
      // 输出图片压缩比
      outputSize: {
        type: Number,
        default: 1
      },
      outputType: {
        type: String,
        default: 'jpeg'
      },
      info: {
        type: Boolean,
        default: true
      },
      // 是否开启滚轮放大缩小
      canScale: {
        type: Boolean,
        default: true
      },
      // 是否自成截图框
      autoCrop: {
        type: Boolean,
        default: false
      },
      autoCropWidth: {
        type: Number,
        default: 0
      },
      autoCropHeight: {
        type: Number,
        default: 0
      },
      // 是否开启固定宽高比
      fixed: {
        type: Boolean,
        default: false
      },
      // 宽高比 w/h
      fixedNumber: {
        type: Array,
        default: function () {
          return [1, 1];
        }
      },
      // 固定大小 禁止改变截图框大小
      fixedBox: {
        type: Boolean,
        default: false
      },
      // 输出截图是否缩放
      full: {
        type: Boolean,
        default: false
      },
      // 是否可以拖动图片
      canMove: {
        type: Boolean,
        default: false
      },
      // 是否可以拖动截图框
      canMoveBox: {
        type: Boolean,
        default: true
      },
      // 上传图片按照原始比例显示
      original: {
        type: Boolean,
        default: false
      },
      // 截图框能否超过图片
      centerBox: {
        type: Boolean,
        default: false
      },
      // 是否根据dpr输出高清图片
      high: {
        type: Boolean,
        default: true
      },
      // 截图框展示宽高类型
      infoTrue: {
        type: Boolean,
        default: false
      },
      // 可以压缩图片宽高  默认不超过200
      maxImgSize: {
        type: Number,
        default: 2000
      },
      // 是否显示图片预览框,程序会自动判断当前为移动端时，默认不显示预览窗口
      preview: {
        type: Boolean,
        default: true
      },
      // 是否开启mock
      isMock: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      cropInfo: function () {
        var obj = {};
        obj.top = this.cropOffsertY > 21 ? '-21px' : '0px';
        obj.width = this.cropW > 0 ? this.cropW : 0;
        obj.height = this.cropH > 0 ? this.cropH : 0;
        if (this.infoTrue) {
          if (this.high && !this.full) {
            var dpr = window.devicePixelRatio;
            obj.width = obj.width * dpr;
            obj.height = obj.height * dpr;
          }
          if (this.full) {
            obj.width = obj.width / this.scale;
            obj.height = obj.height / this.scale;
          }
        }
        obj.width = obj.width.toFixed(0);
        obj.height = obj.height.toFixed(0);
        return obj;
      },
      isIE: function () {
        var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE浏览器
        return isIE;
      }
    },
    watch: {
      // 如果图片改变， 重新布局
      img: function () {
        // 当传入图片时, 读取图片信息同时展示
        this.checkedImg();
      },
      imgs: function (val) {
        if (val === '') {
          return;
        }
        this.reload();
      },
      cropW: function () {
        this.cropW = this.cropW;
        this.showPreview();
      },
      cropH: function () {
        this.cropH = this.cropH;
        this.showPreview();
      },
      cropOffsertX: function () {
        this.showPreview();
      },
      cropOffsertY: function () {
        this.showPreview();
      },
      scale: function (val, oldVal) {
        this.showPreview();
      },
      x: function () {
        this.showPreview();
      },
      y: function () {
        this.showPreview();
      },
      autoCrop: function (val) {
        if (val) {
          this.goAutoCrop();
        }
      },
      rotate: function () {
        this.showPreview();
        if (this.autoCrop) {
          this.goAutoCrop(this.cropW, this.cropH);
        }
      }
    },
    methods: {
      /**
       * 修正显示图片角度
       */
      checkOrientationImage: function (img, orientation, width, height) {
        var _this = this,
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');
        ctx.save();

        canvas.width = width;
        canvas.height = height;

        switch (orientation) {
        case 2:
          // horizontal flip
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
          break;
        case 3:
          // 180 graus
          ctx.translate(width / 2, height / 2);
          ctx.rotate((180 * Math.PI) / 180);
          ctx.translate(-width / 2, -height / 2);
          break;
        case 4:
          // vertical flip
          ctx.translate(0, height);
          ctx.scale(1, -1);
          break;
        case 5:
          // vertical flip + 90 rotate right
          ctx.rotate(0.5 * Math.PI);
          ctx.scale(1, -1);
          break;
        case 6:
          // 90 graus
          ctx.translate(height / 2, width / 2);
          ctx.rotate((90 * Math.PI) / 180);
          ctx.translate(-width / 2, -height / 2);
          break;
        case 7:
          // horizontal flip + 90 rotate right
          ctx.rotate(0.5 * Math.PI);
          ctx.translate(width, -height);
          ctx.scale(-1, 1);
          break;
        case 8:
          // -90 graus
          ctx.translate(height / 2, width / 2);
          ctx.rotate((-90 * Math.PI) / 180);
          ctx.translate(-width / 2, -height / 2);
          break;
        default:
        }

        ctx.drawImage(img, 0, 0, width, height);
        ctx.restore();
        canvas.toBlob(
          function (blob) {
            if (_this.isIE) {
              blobToDataURL(blob, function (bs64) {
                _this.imgs = bs64;
              });
            } else {
              var data = URL.createObjectURL(blob);
              _this.imgs = data;
            }
          },
          'image/' + _this.outputType,
          1
        );
      },
      /**
       * checkout img
       */
      checkedImg: function () {
        var _this = this;
        if (this.img === '') {
          return;
        }
        this.loading = true;
        this.scale = 1;
        this.clearCrop();
        var img = new Image();
        img.onload = function () {
          if (_this.img === '') {
            _this.$emit('imgLoad', 'error');
            return false;
          }
          var width = img.width;
          var height = img.height;
          window.Promise ? Exif.getData(img, _this.mockModel).then(function (data) {
            _this._getImageDataCallBack.call(_this, img, data, width, height);
          }) : Exif.getData.call(null, img, _this.mockModel, function (data) {
            _this._getImageDataCallBack.call(_this, img, data, width, height);
          });
        };

        img.onerror = function () {
          _this.$emit('imgLoad', 'error');
        };

        img.crossOrigin = '';
        if (_this.isIE) {
          var xhr = _this.getXmlHttpRequest();
          xhr.onload = function () {
            var url = URL.createObjectURL(this.response);
            img.src = url;
            xhr = null;
          };
          xhr.open('GET', _this.img, true);
          xhr.responseType = 'blob';
          xhr.send();
        } else {
          img.src = _this.img;
        }
      },
      /**
       * 获取图片数据回调函数
       */
      _getImageDataCallBack: function (img, data, width, height) {
        var _this = this;
        _this.orientation = data.orientation || 1;
        var max = _this.maxImgSize;
        if (!_this.orientation && (width < max) & (height < max)) {
          _this.imgs = _this.img;
          return;
        }
        if (width > max) {
          height = (height / width) * max;
          width = max;
        }
        if (height > max) {
          width = (width / height) * max;
          height = max;
        }
        // 获取图片名称
        _this.checkOrientationImage(img, _this.orientation, width, height);
        window.URL.revokeObjectURL(img.src);
      },
      /**
       * 从文件路径中获取图片名称
       */
      getImgFileName: function (path) {
        return this.img.src.replace(/(.*\/)*([^.]+).*/ig, '$2');
      },
      /**
       * 当按下鼠标键
       */
      startMove: function (e) {
        var _this = this;
        e.preventDefault();
        // 如果move 为true 表示当前可以拖动
        if (this.move && !this.crop) {
          if (!this.canMove) {
            return false;
          }
          // 开始移动
          this.moveX = (e.clientX ? e.clientX : e.touches[0].clientX) - this.x;
          this.moveY = (e.clientY ? e.clientY : e.touches[0].clientY) - this.y;
          if (e.touches) {
            window.addEventListener('touchmove', this.moveImg);
            window.addEventListener('touchend', this.leaveImg);
            if (e.touches.length == 2) {
              // 记录手指刚刚放上去
              this.touches = e.touches;
              window.addEventListener('touchmove', this.touchScale);
              window.addEventListener('touchend', this.cancleTouchScale);
            }
          } else {
            window.addEventListener('mousemove', this.moveImg);
            window.addEventListener('mouseup', this.leaveImg);
          }
          // 触发图片移动事件
          this.$emit('imgMoving', {
            moving: true,
            axis: _this.getImgAxis()
          });
        } else {
          // 截图ing
          this.cropping = true;
          // 绑定截图事件
          window.addEventListener('mousemove', this.createCrop);
          window.addEventListener('mouseup', this.endCrop);
          window.addEventListener('touchmove', this.createCrop);
          window.addEventListener('touchend', this.endCrop);
          this.cropOffsertX = e.offsetX
            ? e.offsetX
            : e.touches[0].pageX - this.$refs.refCropper.offsetLeft;
          this.cropOffsertY = e.offsetY
            ? e.offsetY
            : e.touches[0].pageY - this.$refs.refCropper.offsetTop;
          this.cropX = e.clientX ? e.clientX : e.touches[0].clientX;
          this.cropY = e.clientY ? e.clientY : e.touches[0].clientY;
          this.cropChangeX = this.cropOffsertX;
          this.cropChangeY = this.cropOffsertY;
          this.cropW = 0;
          this.cropH = 0;
        }
      },
      /**
       * 移动端缩放
       */
      touchScale: function (e) {
        e.preventDefault();
        var _this = this, scale = this.scale;
        // 记录变化量
        // 第一根手指
        var oldTouch1 = {
          x: this.touches[0].clientX,
          y: this.touches[0].clientY
        };
        var newTouch1 = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        // 第二根手指
        var oldTouch2 = {
          x: this.touches[1].clientX,
          y: this.touches[1].clientY
        };
        var newTouch2 = {
          x: e.touches[1].clientX,
          y: e.touches[1].clientY
        };
        var oldL = Math.sqrt(
          Math.pow(oldTouch1.x - oldTouch2.x, 2) +
          Math.pow(oldTouch1.y - oldTouch2.y, 2)
        );
        var newL = Math.sqrt(
          Math.pow(newTouch1.x - newTouch2.x, 2) +
          Math.pow(newTouch1.y - newTouch2.y, 2)
        );
        var cha = newL - oldL;
        // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
        // 1px - 0.2
        var coe = 1;
        coe =
          coe / this.trueWidth > coe / this.trueHeight
            ? coe / this.trueHeight
            : coe / this.trueWidth;
        coe = coe > 0.1 ? 0.1 : coe;
        var num = coe * cha;
        if (!this.touchNow) {
          this.touchNow = true;
          if (cha > 0) {
            scale += Math.abs(num);
          } else if (cha < 0) {
            scale > Math.abs(num) ? scale -= Math.abs(num) : scale;
          }
          this.touches = e.touches;
          setTimeout(function () {
            _this.touchNow = false;
          }, 8);
          if (!this.checkoutImgAxis(this.x, this.y, scale)) {
            return false;
          }
          this.scale = scale;
        }
      },
      /**
       * 取消touch缩放
       */
      cancleTouchScale: function (e) {
        window.removeEventListener('touchmove', this.touchScale);
      },
      /**
       * 移动图片
       */
      moveImg: function (e) {
        e.preventDefault();
        var _this = this;
        if (e.touches && e.touches.length === 2) {
          this.touches = e.touches;
          window.addEventListener('touchmove', this.touchScale);
          window.addEventListener('touchend', this.cancleTouchScale);
          window.removeEventListener('touchmove', this.moveImg);
          return false;
        }
        var nowX = e.clientX ? e.clientX : e.touches[0].clientX;
        var nowY = e.clientY ? e.clientY : e.touches[0].clientY;

        var changeX, changeY;
        changeX = nowX - this.moveX;
        changeY = nowY - this.moveY;

        _this.$nextTick(function () {
          if (_this.centerBox) {
            var axis = _this.getImgAxis(changeX, changeY, _this.scale);
            var cropAxis = _this.getCropAxis();
            var imgW = _this.trueHeight * _this.scale;
            var imgH = _this.trueWidth * _this.scale;
            var maxLeft, maxTop, maxRight, maxBottom;
            switch (_this.rotate) {
            case 1:
            case -1:
            case 3:
            case -3:
              maxLeft =
                  _this.cropOffsertX - (_this.trueWidth * (1 - _this.scale)) / 2 + (imgW - imgH) / 2;
              maxTop =
                  _this.cropOffsertY - (_this.trueHeight * (1 - _this.scale)) / 2 + (imgH - imgW) / 2;
              maxRight = maxLeft - imgW + _this.cropW;
              maxBottom = maxTop - imgH + _this.cropH;
              break;
            default:
              maxLeft = _this.cropOffsertX - (_this.trueWidth * (1 - _this.scale)) / 2;
              maxTop = _this.cropOffsertY - (_this.trueHeight * (1 - _this.scale)) / 2;
              maxRight = maxLeft - imgH + _this.cropW;
              maxBottom = maxTop - imgW + _this.cropH;
              break;
            }

            // 图片左边 图片不能超过截图框
            if (axis.x1 >= cropAxis.x1) {
              changeX = maxLeft;
            }

            // 图片上边 图片不能超过截图框
            if (axis.y1 >= cropAxis.y1) {
              changeY = maxTop;
            }

            // 图片右边
            if (axis.x2 <= cropAxis.x2) {
              changeX = maxRight;
            }

            // 图片下边
            if (axis.y2 <= cropAxis.y2) {
              changeY = maxBottom;
            }
          }
          this.x = changeX;
          this.y = changeY;
          // 触发图片移动事件
          this.$emit('imgMoving', {
            moving: true,
            axis: this.getImgAxis()
          });
        });
      },
      /**
       * 移动图片结束
       */
      leaveImg: function (e) {
        window.removeEventListener('mousemove', this.moveImg);
        window.removeEventListener('touchmove', this.moveImg);
        window.removeEventListener('mouseup', this.leaveImg);
        window.removeEventListener('touchend', this.leaveImg);
        // 触发图片移动事件
        this.$emit('imgMoving', {
          moving: false,
          axis: this.getImgAxis()
        });
      },
      /**
       * 缩放图片
       */
      scaleImg: function () {
        if (this.canScale) {
          window.addEventListener(this.support, this.changeSize);
        }
      },
      /**
       * 取消缩放事件
       */
      cancleScale: function () {
        if (this.canScale) {
          window.removeEventListener(this.support, this.changeSize);
        }
      },
      /**
       * 改变大小函数
       */
      changeSize: function (e) {
        e.preventDefault();
        var _this = this, scale = this.scale;
        var change = e.deltaY || e.wheelDelta;
        // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
        var isFirefox = navigator.userAgent.indexOf('Firefox');
        change = isFirefox > 0 ? change * 30 : change;
        // 修复ie的滚动缩放
        if (this.isIE) {
          change = -change;
        }
        // 1px - 0.2
        var coe = this.coe;
        coe =
          coe / this.trueWidth > coe / this.trueHeight
            ? coe / this.trueHeight
            : coe / this.trueWidth;
        var num = coe * change;
        num < 0
          ? scale += Math.abs(num)
          : scale > Math.abs(num)
            ? scale -= Math.abs(num)
            : scale;
        // 延迟0.1s 每次放大大或者缩小的范围
        var status = num < 0 ? 'add' : 'reduce';
        if (status !== this.coeStatus) {
          this.coeStatus = status;
          this.coe = 0.2;
        }
        if (!this.scaling) {
          this.scalingSet = setTimeout(function () {
            _this.scaling = false;
            _this.coe = _this.coe += 0.01;
          }, 50);
        }
        this.scaling = true;
        if (!this.checkoutImgAxis(this.x, this.y, scale)) {
          return false;
        }
        this.scale = scale;
      },
      /**
       * 修改图片大小函数
       */
      changeScale: function (num) {
        var scale = this.scale;
        num = num || 1;
        var coe = 20;
        coe =
          coe / this.trueWidth > coe / this.trueHeight
            ? coe / this.trueHeight
            : coe / this.trueWidth;
        num = num * coe;
        num > 0
          ? scale += Math.abs(num)
          : scale > Math.abs(num)
            ? scale -= Math.abs(num)
            : scale;
        if (!this.checkoutImgAxis(this.x, this.y, scale)) {
          return false;
        }
        this.scale = scale;
        this.updateImgPreview();
      },
      /**
       * 创建截图框
       */
      createCrop: function (e) {
        e.preventDefault();
        // 移动生成大小
        var _this = this, nowX = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0;
        var nowY = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0;
        this.$nextTick(function () {
          var fw = nowX - _this.cropX;
          var fh = nowY - _this.cropY;
          if (fw > 0) {
            _this.cropW =
              fw + _this.cropChangeX > _this.w ? _this.w - _this.cropChangeX : fw;
            _this.cropOffsertX = _this.cropChangeX;
          } else {
            _this.cropW =
              _this.w - _this.cropChangeX + Math.abs(fw) > _this.w
                ? _this.cropChangeX
                : Math.abs(fw);
            _this.cropOffsertX =
              _this.cropChangeX + fw > 0 ? _this.cropChangeX + fw : 0;
          }

          if (!_this.fixed) {
            if (fh > 0) {
              _this.cropH =
                fh + _this.cropChangeY > _this.h ? _this.h - _this.cropChangeY : fh;
              _this.cropOffsertY = _this.cropChangeY;
            } else {
              _this.cropH =
                _this.h - _this.cropChangeY + Math.abs(fh) > _this.h
                  ? _this.cropChangeY
                  : Math.abs(fh);
              _this.cropOffsertY =
                _this.cropChangeY + fh > 0 ? _this.cropChangeY + fh : 0;
            }
          } else {
            var fixedHeight =
              (_this.cropW / _this.fixedNumber[0]) *
              _this.fixedNumber[1];
            if (fixedHeight + _this.cropOffsertY > _this.h) {
              _this.cropH = _this.h - _this.cropOffsertY;
              _this.cropW =
                (_this.cropH / _this.fixedNumber[1]) *
                _this.fixedNumber[0];
              if (fw > 0) {
                _this.cropOffsertX = _this.cropChangeX;
              } else {
                _this.cropOffsertX = _this.cropChangeX - _this.cropW;
              }
            } else {
              _this.cropH = fixedHeight;
            }
            _this.cropOffsertY = _this.cropOffsertY;
          }
        });
      },
      /**
       * 改变截图框大小
       */
      changeCropSize: function (e, w, h, typeW, typeH) {
        e.preventDefault();
        window.addEventListener('mousemove', this.changeCropNow);
        window.addEventListener('mouseup', this.changeCropEnd);
        window.addEventListener('touchmove', this.changeCropNow);
        window.addEventListener('touchend', this.changeCropEnd);
        this.canChangeX = w;
        this.canChangeY = h;
        this.changeCropTypeX = typeW;
        this.changeCropTypeY = typeH;
        this.cropX = e.clientX ? e.clientX : e.touches[0].clientX;
        this.cropY = e.clientY ? e.clientY : e.touches[0].clientY;
        this.cropOldW = this.cropW;
        this.cropOldH = this.cropH;
        this.cropChangeX = this.cropOffsertX;
        this.cropChangeY = this.cropOffsertY;
        if (this.fixed) {
          if (this.canChangeX && this.canChangeY) {
            this.canChangeY = 0;
          }
        }
      },
      /**
       * 正在改变
       */
      changeCropNow: function (e) {
        e.preventDefault();
        var _this = this, nowX = e.clientX ? e.clientX : e.touches ? e.touches[0].clientX : 0;
        var nowY = e.clientY ? e.clientY : e.touches ? e.touches[0].clientY : 0;
        // 容器的宽高
        var wrapperW = this.w;
        var wrapperH = this.h;

        // 不能超过的坐标轴
        var minX = 0;
        var minY = 0;

        if (this.centerBox) {
          var axis = this.getImgAxis();
          var imgW = axis.x2;
          var imgH = axis.y2;
          minX = axis.x1 > 0 ? axis.x1 : 0;
          minY = axis.y1 > 0 ? axis.y1 : 0;
          if (wrapperW > imgW) {
            wrapperW = imgW;
          }

          if (wrapperH > imgH) {
            wrapperH = imgH;
          }
        }

        this.$nextTick(function () {
          var fw = nowX - _this.cropX;
          var fh = nowY - _this.cropY;
          if (_this.canChangeX) {
            if (_this.changeCropTypeX === 1) {
              if (_this.cropOldW - fw > 0) {
                _this.cropW =
                  wrapperW - _this.cropChangeX - fw <= wrapperW - minX
                    ? _this.cropOldW - fw
                    : _this.cropOldW + _this.cropChangeX - minX;
                _this.cropOffsertX =
                  wrapperW - _this.cropChangeX - fw <= wrapperW - minX
                    ? _this.cropChangeX + fw
                    : minX;
              } else {
                _this.cropW =
                  Math.abs(fw) + _this.cropChangeX <= wrapperW
                    ? Math.abs(fw) - _this.cropOldW
                    : wrapperW - _this.cropOldW - _this.cropChangeX;
                _this.cropOffsertX = _this.cropChangeX + _this.cropOldW;
              }
            } else if (_this.changeCropTypeX === 2) {
              if (_this.cropOldW + fw > 0) {
                _this.cropW =
                  _this.cropOldW + fw + _this.cropOffsertX <= wrapperW
                    ? _this.cropOldW + fw
                    : wrapperW - _this.cropOffsertX;
                _this.cropOffsertX = _this.cropChangeX;
              } else {
                // 右侧坐标抽 超过左侧
                _this.cropW =
                  wrapperW - _this.cropChangeX + Math.abs(fw + _this.cropOldW) <=
                    wrapperW - minX
                    ? Math.abs(fw + _this.cropOldW)
                    : _this.cropChangeX - minX;
                _this.cropOffsertX =
                  wrapperW - _this.cropChangeX + Math.abs(fw + _this.cropOldW) <=
                    wrapperW - minX
                    ? _this.cropChangeX - Math.abs(fw + _this.cropOldW)
                    : minX;
              }
            }
          }

          if (this.canChangeY) {
            if (this.changeCropTypeY === 1) {
              if (this.cropOldH - fh > 0) {
                this.cropH =
                  wrapperH - this.cropChangeY - fh <= wrapperH - minY
                    ? this.cropOldH - fh
                    : this.cropOldH + this.cropChangeY - minY;
                this.cropOffsertY =
                  wrapperH - this.cropChangeY - fh <= wrapperH - minY
                    ? this.cropChangeY + fh
                    : minY;
              } else {
                this.cropH =
                  Math.abs(fh) + this.cropChangeY <= wrapperH
                    ? Math.abs(fh) - this.cropOldH
                    : wrapperH - this.cropOldH - this.cropChangeY;
                this.cropOffsertY = this.cropChangeY + this.cropOldH;
              }
            } else if (this.changeCropTypeY === 2) {
              if (this.cropOldH + fh > 0) {
                this.cropH =
                  this.cropOldH + fh + this.cropOffsertY <= wrapperH
                    ? this.cropOldH + fh
                    : wrapperH - this.cropOffsertY;
                this.cropOffsertY = this.cropChangeY;
              } else {
                this.cropH =
                  wrapperH - this.cropChangeY + Math.abs(fh + this.cropOldH) <=
                    wrapperH - minY
                    ? Math.abs(fh + this.cropOldH)
                    : this.cropChangeY - minY;
                this.cropOffsertY =
                  wrapperH - this.cropChangeY + Math.abs(fh + this.cropOldH) <=
                    wrapperH - minY
                    ? this.cropChangeY - Math.abs(fh + this.cropOldH)
                    : minY;
              }
            }
          }

          if (this.canChangeX && this.fixed) {
            var fixedHeight =
              (this.cropW / this.fixedNumber[0]) *
              this.fixedNumber[1];
            if (fixedHeight + this.cropOffsertY > wrapperH) {
              this.cropH = wrapperH - this.cropOffsertY;
              this.cropW =
                (this.cropH / this.fixedNumber[1]) *
                this.fixedNumber[0];
            } else {
              this.cropH = fixedHeight;
            }
          }

          if (this.canChangeY && this.fixed) {
            var fixedWidth =
              (this.cropH / this.fixedNumber[1]) *
              this.fixedNumber[0];
            if (fixedWidth + this.cropOffsertX > wrapperW) {
              this.cropW = wrapperW - this.cropOffsertX;
              this.cropH =
                (this.cropW / this.fixedNumber[0]) *
                this.fixedNumber[1];
            } else {
              this.cropW = fixedWidth;
            }
          }
        });
      },
      /**
       * 结束改变
       */
      changeCropEnd: function (e) {
        window.removeEventListener('mousemove', this.changeCropNow);
        window.removeEventListener('mouseup', this.changeCropEnd);
        window.removeEventListener('touchmove', this.changeCropNow);
        window.removeEventListener('touchend', this.changeCropEnd);
        this.updateImgPreview();
      },
      /**
       * 创建完成
       */
      endCrop: function () {
        if (this.cropW === 0 && this.cropH === 0) {
          this.cropping = false;
        }
        window.removeEventListener('mousemove', this.createCrop);
        window.removeEventListener('mouseup', this.endCrop);
        window.removeEventListener('touchmove', this.createCrop);
        window.removeEventListener('touchend', this.endCrop);
      },
      /**
       * 开始截图
       */
      startCrop: function () {
        this.crop = true;
        this.cropping = true;
      },
      /**
       * 停止截图
       */
      stopCrop: function () {
        this.crop = false;
      },
      /**
       * 清除截图
       */
      clearCrop: function () {
        this.cropping = false;
        this.cropW = 0;
        this.cropH = 0;
      },
      /**
       * 截图移动
       */
      cropMove: function (e) {
        e.preventDefault();
        if (!this.canMoveBox) {
          this.crop = false;
          this.startMove(e);
          return false;
        }

        if (e.touches && e.touches.length === 2) {
          this.crop = false;
          this.startMove(e);
          this.leaveCrop();
          return false;
        }
        window.addEventListener('mousemove', this.moveCrop);
        window.addEventListener('mouseup', this.leaveCrop);
        window.addEventListener('touchmove', this.moveCrop);
        window.addEventListener('touchend', this.leaveCrop);
        var x = e.clientX ? e.clientX : e.touches[0].clientX;
        var y = e.clientY ? e.clientY : e.touches[0].clientY;
        var newX, newY;
        newX = x - this.cropOffsertX;
        newY = y - this.cropOffsertY;
        this.cropX = newX;
        this.cropY = newY;
        // 触发截图框移动事件
        this.$emit('cropMoving', {
          moving: true,
          axis: this.getCropAxis()
        });
      },
      /**
       * 判断移动中边值
       */
      moveCrop: function (e, isMove) {
        var _this = this, nowX = 0;
        var nowY = 0;
        if (e) {
          e.preventDefault();
          nowX = e.clientX ? e.clientX : e.touches[0].clientX;
          nowY = e.clientY ? e.clientY : e.touches[0].clientY;
        }
        this.$nextTick(function () {
          var cx, cy;
          var fw = nowX - _this.cropX;
          var fh = nowY - _this.cropY;
          if (isMove) {
            fw = _this.cropOffsertX;
            fh = _this.cropOffsertY;
          }
          // 不能超过外层容器
          if (fw <= 0) {
            cx = 0;
          } else if ((fw + _this.cropW) > _this.w) {
            cx = _this.w - _this.cropW;
          } else {
            cx = fw;
          }

          if (fh <= 0) {
            cy = 0;
          } else if ((fh + _this.cropH) > _this.h) {
            cy = _this.h - _this.cropH;
          } else {
            cy = fh;
          }

          // 不能超过图片
          if (_this.centerBox) {
            var axis = _this.getImgAxis();
            // 横坐标判断
            if (cx <= axis.x1) {
              cx = axis.x1;
            }

            if (cx + _this.cropW > axis.x2) {
              cx = axis.x2 - _this.cropW;
            }

            // 纵坐标纵轴
            if (cy <= axis.y1) {
              cy = axis.y1;
            }

            if (cy + _this.cropH > axis.y2) {
              cy = axis.y2 - _this.cropH;
            }
          }

          _this.cropOffsertX = cx;
          _this.cropOffsertY = cy;

          // 触发截图框移动事件
          _this.$emit('cropMoving', {
            moving: true,
            axis: _this.getCropAxis()
          });
        });
      },
      /**
       * 算出不同场景下面 图片相对于外层容器的坐标轴
       */
      getImgAxis: function (x, y, scale) {
        x = x || this.x;
        y = y || this.y;
        scale = scale || this.scale;
        // 如果设置了截图框在图片内， 那么限制截图框不能超过图片的坐标
        // 图片的坐标
        var obj = {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0
        };
        var imgW = this.trueWidth * scale;
        var imgH = this.trueHeight * scale;
        switch (this.rotate) {
        case 0:
          obj.x1 = x + (this.trueWidth * (1 - scale)) / 2;
          obj.x2 = obj.x1 + this.trueWidth * scale;
          obj.y1 = y + (this.trueHeight * (1 - scale)) / 2;
          obj.y2 = obj.y1 + this.trueHeight * scale;
          break;
        case 1:
        case -1:
        case 3:
        case -3:
          obj.x1 =
              (x + (this.trueWidth * (1 - scale)) / 2) + (imgW - imgH) / 2;
          obj.x2 = obj.x1 + this.trueHeight * scale;
          obj.y1 =
              (y + (this.trueHeight * (1 - scale)) / 2) + (imgH - imgW) / 2;
          obj.y2 = obj.y1 + this.trueWidth * scale;
          break;
        default:
          obj.x1 = x + (this.trueWidth * (1 - scale)) / 2;
          obj.x2 = obj.x1 + this.trueWidth * scale;
          obj.y1 = y + (this.trueHeight * (1 - scale)) / 2;
          obj.y2 = obj.y1 + this.trueHeight * scale;
          break;
        }
        return obj;
      },
      /**
       * 获取截图框的坐标轴
       */
      getCropAxis: function () {
        var obj = {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 0
        };
        obj.x1 = this.cropOffsertX;
        obj.x2 = obj.x1 + this.cropW;
        obj.y1 = this.cropOffsertY;
        obj.y2 = obj.y1 + this.cropH;
        return obj;
      },
      /**
       * 离开截图框
       */
      leaveCrop: function (e) {
        window.removeEventListener('mousemove', this.moveCrop);
        window.removeEventListener('mouseup', this.leaveCrop);
        window.removeEventListener('touchmove', this.moveCrop);
        window.removeEventListener('touchend', this.leaveCrop);
        // 触发截图框移动事件
        this.$emit('cropMoving', {
          moving: false,
          axis: this.getCropAxis()
        });
        this.updateImgPreview();
      },
      /**
       * 将图片画到canvas画布上
       * @param {Function} cb 处理完成回调函数
       * @param {Boolean} isCut 是否进行裁剪，默认为true
       */
      getCropChecked: function (cb, isCut) {
        var _this = this,
          canvas = document.createElement('canvas'),
          img = new Image(),
          rotate = this.rotate,
          trueWidth = this.trueWidth,
          trueHeight = this.trueHeight,
          cropOffsertX = this.cropOffsertX,
          cropOffsertY = this.cropOffsertY,
          isCut = isCut !== false;

        img.onload = function () {
          if (_this.cropW !== 0) {
            var ctx = canvas.getContext('2d');
            var dpr = 1;
            if (_this.high & !_this.full) {
              // ie下window.devicePixelRatio==undefined,会导致canvas宽高为0，导出的数据为空的问题
              dpr = window.devicePixelRatio || 1;
            }
            var width = _this.cropW * dpr,
              height = _this.cropH * dpr,
              imgW = trueWidth * _this.scale * dpr,
              imgH = trueHeight * _this.scale * dpr,
              // 图片x轴偏移
              dx = (_this.x - cropOffsertX + (_this.trueWidth * (1 - _this.scale)) / 2) * dpr,
              // 图片y轴偏移
              dy = (_this.y - cropOffsertY + (_this.trueHeight * (1 - _this.scale)) / 2) * dpr;
            // 保存状态
            canvas.width = width;
            canvas.height = height;
            ctx.save();
            switch (rotate) {
            case 0:
              if (!isCut) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, img.x, img.y, img.width, img.height);
              } else if (!_this.full) {
                ctx.drawImage(img, dx, dy, imgW, imgH);
              } else {
                // 输出原图比例截图
                canvas.width = width / _this.scale;
                canvas.height = height / _this.scale;
                ctx.drawImage(
                  img,
                  dx / _this.scale,
                  dy / _this.scale,
                  imgW / _this.scale,
                  imgH / _this.scale
                );
              }
              break;
            case 1:
            case -3:
              if (!isCut) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(img, img.x, img.y, img.width, img.height);
              } else if (!_this.full) {
                // 换算图片旋转后的坐标弥补
                dx = dx + (imgW - imgH) / 2;
                dy = dy + (imgH - imgW) / 2;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(img, dy, -dx - imgH, imgW, imgH);
              } else {
                canvas.width = width / _this.scale;
                canvas.height = height / _this.scale;
                // 换算图片旋转后的坐标弥补
                dx = dx / _this.scale + (imgW / _this.scale - imgH / _this.scale) / 2;
                dy = dy / _this.scale + (imgH / _this.scale - imgW / _this.scale) / 2;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(
                  img,
                  dy,
                  -dx - imgH / _this.scale,
                  imgW / _this.scale,
                  imgH / _this.scale
                );
              }
              break;
            case 2:
            case -2:
              if (!isCut) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(img, img.x, img.y, img.width, img.height);
              } else if (!_this.full) {
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(img, -dx - imgW, -dy - imgH, imgW, imgH);
              } else {
                canvas.width = width / _this.scale;
                canvas.height = height / _this.scale;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                dx = dx / _this.scale;
                dy = dy / _this.scale;
                ctx.drawImage(
                  img,
                  -dx - imgW / _this.scale,
                  -dy - imgH / _this.scale,
                  imgW / _this.scale,
                  imgH / _this.scale
                );
              }
              break;
            case 3:
            case -1:
              if (!isCut) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(img, img.x, img.y, img.width, img.height);
              } else if (!_this.full) {
                // 换算图片旋转后的坐标弥补
                dx = dx + (imgW - imgH) / 2;
                dy = dy + (imgH - imgW) / 2;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(img, -dy - imgW, dx, imgW, imgH);
              } else {
                canvas.width = width / _this.scale;
                canvas.height = height / _this.scale;
                // 换算图片旋转后的坐标弥补
                dx = dx / _this.scale + (imgW / _this.scale - imgH / _this.scale) / 2;
                dy = dy / _this.scale + (imgH / _this.scale - imgW / _this.scale) / 2;
                ctx.rotate((rotate * 90 * Math.PI) / 180);
                ctx.drawImage(
                  img,
                  -dy - imgW / _this.scale,
                  dx,
                  imgW / _this.scale,
                  imgH / _this.scale
                );
              }
              break;
            default:
              if (!isCut) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, img.x, img.y, img.width, img.height);
              } else if (!_this.full) {
                ctx.drawImage(img, dx, dy, imgW, imgH);
              } else {
                // 输出原图比例截图
                canvas.width = width / _this.scale;
                canvas.height = height / _this.scale;
                ctx.drawImage(
                  img,
                  dx / _this.scale,
                  dy / _this.scale,
                  imgW / _this.scale,
                  imgH / _this.scale
                );
              }
            }
            ctx.restore();
          } else {
            var width = trueWidth * _this.scale;
            var height = trueHeight * _this.scale;
            var ctx = canvas.getContext('2d');
            ctx.save();
            switch (rotate) {
            case 0:
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              break;
            case 1:
            case -3:
              // 旋转90度 或者-270度 宽度和高度对调
              canvas.width = height;
              canvas.height = width;
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(img, 0, -height, width, height);
              break;
            case 2:
            case -2:
              canvas.width = width;
              canvas.height = height;
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(img, -width, -height, width, height);
              break;
            case 3:
            case -1:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate((rotate * 90 * Math.PI) / 180);
              ctx.drawImage(img, -width, 0, width, height);
              break;
            default:
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
            }
            ctx.restore();
          }
          cb(canvas);
        };
        // 判断图片是否是base64
        var s = _this.img.substr(0, 4);
        if (s !== 'data') {
          img.crossOrigin = 'Anonymous';
        }
        img.src = _this.imgs;
      },
      /**
       * 获取转换成base64 的图片信息
       * @param {Function} cb 处理完成回调函数
       * @param {String} outType 输出文件类型
       * @param {Boolean} isCut 是否进行裁剪，默认为true
       * @param {Number} quality 图片质量，值在0~1之间
       */
      getCropData: function (cb, outType, isCut, quality) {
        var _this = this, ot = outType || _this.outputType, quality = quality || _this.outputSize;
        this.getCropChecked(function (data) {
          cb(data.toDataURL('image/' + ot, quality));
        }, isCut);
      },
      /**
       * 转化base64 为blob对象
       * @param {Function} cb 处理完成回调函数
       * @param {String} outType 输出文件类型
       * @param {Boolean} isCut 是否进行裁剪，默认为true
       * @param {Number} quality 图片质量，值在0~1之间
       */
      getCropBlob: function (cb, outType, isCut, quality) {
        var _this = this, ot = outType || _this.outputType, quality = quality || _this.outputSize;
        this.getCropChecked(function (data) {
          data.toBlob(
            function (blob) {
              return cb(blob);
            },
            'image/' + ot,
            quality
          );
        }, isCut);
      },
      /**
       * 自动预览函数
       */
      showPreview: function () {
        var obj = {};
        obj.div = {
          width: this.cropW + 'px',
          height: this.cropH + 'px'
        };
        obj.img = {
          width: this.trueWidth + 'px',
          height: this.trueHeight + 'px',
          transform:
            'scale(' +
            this.scale +
            ',' +
            this.scale +
            ') ' +
            'translate3d(' +
            (this.x - this.cropOffsertX) / this.scale +
            'px,' +
            (this.y - this.cropOffsertY) / this.scale +
            'px,' +
            '0)' +
            'rotateZ(' +
            this.rotate * 90 +
            'deg)'
        };
        obj.w = this.cropW;
        obj.h = this.cropH;
        obj.url = this.imgs;
        // this.$emit('realTime', obj);
      },
      /**
       * reload 图片布局函数
       */
      reload: function () {
        var _this = this, img = new Image();
        img.onload = function () {
          // 读取图片的信息原始信息， 解析是否需要旋转
          // 读取图片的旋转信息
          // 得到外层容器的宽度高度
          _this.w = window.getComputedStyle(_this.$refs.refCropperContainer).width.replace('px', '');
          _this.h = window.getComputedStyle(_this.$refs.refCropper).height.replace('px', '');
          // 存入图片真实高度
          _this.trueWidth = img.width;
          _this.trueHeight = img.height;
          // 判断是否需要压缩大图
          if (!_this.original) {
            if (_this.trueWidth > _this.w) {
              // 如果图片宽度大于容器宽度
              _this.scale = _this.w / _this.trueWidth;
            }

            if (_this.trueHeight * _this.scale > _this.h) {
              _this.scale = _this.h / _this.trueHeight;
            }
          } else {
            _this.scale = 1;
          }

          _this.$nextTick(function () {
            _this.x =
              -(_this.trueWidth - _this.trueWidth * _this.scale) / 2 +
              (_this.w - _this.trueWidth * _this.scale) / 2;
            _this.y =
              -(_this.trueHeight - _this.trueHeight * _this.scale) / 2 +
              (_this.h - _this.trueHeight * _this.scale) / 2;
            _this.loading = false;
            // // 获取是否开启了自动截图
            if (_this.autoCrop) {
              _this.goAutoCrop();
            }
            // // 图片加载成功的回调
            _this.$emit('imgLoad', 'success');
            _this.updateImgPreview();
          });
        };
        img.onerror = function () {
          _this.$emit('imgLoad', 'error');
        };
        img.src = _this.imgs;
      },
      /**
       * 自动截图函数
       */
      goAutoCrop: function (cw, ch) {
        this.clearCrop();
        this.cropping = true;
        var maxWidth = this.w;
        var maxHeight = this.h;
        if (this.centerBox) {
          var imgW = this.trueWidth * this.scale;
          var imgH = this.trueHeight * this.scale;
          maxWidth = imgW < maxWidth ? imgW : maxWidth;
          maxHeight = imgH < maxHeight ? imgH : maxHeight;
        }
        // 截图框默认大小
        // 如果为0 那么计算容器大小 默认为80%
        var w = cw ? cw : this.autoCropWidth;
        var h = ch ? ch : this.autoCropHeight;
        if (w === 0 || h === 0) {
          w = maxWidth * 0.8;
          h = maxHeight * 0.8;
        }
        w = w > maxWidth ? maxWidth : w;
        h = h > maxHeight ? maxHeight : h;
        if (this.fixed) {
          h = (w / this.fixedNumber[0]) * this.fixedNumber[1];
        }
        // 如果比例之后 高度大于h
        if (h > this.h) {
          h = this.h;
          w = (h / this.fixedNumber[1]) * this.fixedNumber[0];
        }
        this.changeCrop(w, h);
      },
      /**
       * 手动改变截图框大小函数
       */
      changeCrop: function (w, h) {
        // 判断是否大于容器
        this.cropW = w;
        this.cropH = h;
        // 居中走一走
        this.cropOffsertX = (this.w - w) / 2;
        this.cropOffsertY = (this.h - h) / 2;
        if (this.centerBox) {
          this.$nextTick(function () {
            this.moveCrop(null, true);
          });
        }
      },
      /**
       * 重置函数， 恢复组件置初始状态
       */
      refresh: function () {
        this.imgs = '';
        this.scale = 1;
        this.crop = false;
        this.rotate = 0;
        this.w = 0;
        this.h = 0;
        this.trueWidth = 0;
        this.trueHeight = 0;
        this.clearCrop();
        this.$nextTick(function () {
          this.checkedImg();
        });
      },
      /**
       * 向左边旋转
       */
      rotateLeft: function () {
        this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1;
        this.updateImgPreview();
      },
      /**
       * 向右边旋转
       */
      rotateRight: function () {
        this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1;
        this.updateImgPreview();
      },
      /**
       * 清除旋转
       */
      rotateClear: function () {
        this.rotate = 0;
      },
      /**
       * 图片坐标点校验
       */
      checkoutImgAxis: function (x, y, scale) {
        x = x || this.x;
        y = y || this.y;
        scale = scale || this.scale;
        var canGo = true;
        // 开始校验 如果说缩放之后的坐标在截图框外 则阻止缩放
        if (this.centerBox) {
          var axis = this.getImgAxis(x, y, scale);
          var cropAxis = this.getCropAxis();
          // 左边的横坐标 图片不能超过截图框
          if (axis.x1 >= cropAxis.x1) {
            canGo = false;
          }
          // 右边横坐标
          if (axis.x2 <= cropAxis.x2) {
            canGo = false;
          }
          // 纵坐标上面
          if (axis.y1 >= cropAxis.y1) {
            canGo = false;
          }
          // 纵坐标下面
          if (axis.y2 <= cropAxis.y2) {
            canGo = false;
          }
        }
        return canGo;
      },
      /**
       * 获取xmlhttprequest对象
       */
      getXmlHttpRequest: function () {
        return new (this.mockModel ? _XMLHttpRequest : XMLHttpRequest)();
      },
      /**
       * 更新图片预览,预览使用png格式图片
       */
      updateImgPreview: function () {
        var _this = this;
        this.isIE ? _this.getCropData(function (data) {
          _this.previewUrl = data;
        }, 'png') : _this.getCropBlob(function (data) {
          _this.previewUrl.indexOf('blob:') > -1 ? window.URL.revokeObjectURL(_this.previewUrl) : '';
          _this.previewUrl = window.URL.createObjectURL(data);
        }, 'png');
      }
    },
    mounted: function () {
      var _this = this;
      _this.support =
        'onwheel' in document.createElement('div')
          ? 'wheel'
          : document.onmousewheel !== undefined
            ? 'mousewheel'
            : 'DOMMouseScroll';

      var u = navigator.userAgent;
      if (_this._data['_INIT_CFG_']) {
        var _initCfg_ = this._data['_INIT_CFG_'];
        _this.mockModel = _initCfg_.mockModel;
      }
      _this.mockModel = _this.isMock;
      _this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // 判断windows safari浏览器
      var isSafari = /Windows/.test(u) && /Safari/.test(u) && !/Chrome/.test(u);
      if (isSafari) {
        _this.errorMsg = '暂不支持Windows safari浏览器!';
        throw new Error(_this.errorMsg);
      }
      // 兼容blob
      if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value: function (callback, type, quality) {
            var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
              len = binStr.length,
              arr = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }
            callback(new Blob([arr], { type: _this.type || 'image/png' }));
          }
        });
      }
      _this.showPreview();
      _this.checkedImg();
    },
    created: function () {
      // 移动端就不显示预览窗口
      this.mobile = /Android|webOS|iPhone|iPod|BlackBerry|MicroMessenger/i.test(navigator.userAgent);
      this.preview = !this.mobile;
      this.canMoveBox = !this.mobile;
    },
    destroyed: function () {
      window.removeEventListener('mousemove', this.moveCrop);
      window.removeEventListener('mouseup', this.leaveCrop);
      window.removeEventListener('touchmove', this.moveCrop);
      window.removeEventListener('touchend', this.leaveCrop);
    }
  });
}(Vue, yufp.$, 'yu-cropper'));


