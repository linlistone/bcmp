/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @updated by luoshun 2018-10-11 更新组件内容及标签
 * @description 模板示例——普通查询
 */
/* eslint no-console: 0 */
/* eslint no-alert: 0 */
define([
  './custom/widgets/js/YufpCropper.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    // yufp.custom.mixin('yu-cropper,yu-xview');
    var isMock = window.YUFP_SYS_CONFIG.mockModel;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          crap: false,
          isMock: isMock,
          previews: {
            div: 'width:200px;height:200px',
            url: 'themes/default/images/cropper2.jpg'
          },
          lists: [
            {
              img: 'themes/default/images/cropper1.png'
            },
            {
              img: 'themes/default/images/cropper2.jpg'
            }
          ],
          option: {
            img: 'themes/default/images/cropper1.png',
            size: 0.5,
            full: false,
            outputType: 'jpeg',
            canMove: true,
            fixedBox: false,
            original: false,
            canMoveBox: true,
            autoCrop: true,
            // 只有自动截图开启 宽度高度才生效
            autoCropWidth: 200,
            autoCropHeight: 150,
            centerBox: false,
            fileName: 'demo',
            high: true,
            // 开启宽度和高度比例
            fixed: false,
            // fixedNumber: [4, 3],
            cropData: {}
          },
          fileList: [],
          downImg: '#',
          outputFileName: '',
          msgBox: null,
          num: 0
        };
      },
      mounted: function () {
        this.outputFileName = this.option.fileName + '.' + this.option.outputType;
      },
      methods: {
        changeImg: function () {
          this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
        },
        startCrop: function () {
          this.crap = true;
          this.$refs.refCropper.startCrop();
        },
        stopCrop: function () {
          this.crap = false;
          this.$refs.refCropper.stopCrop();
        },
        changeScale: function (num) {
          this.$refs.refCropper.changeScale(num);
        },
        rotateLeft: function () {
          this.$refs.refCropper.rotateLeft();
        },
        rotateRight: function () {
          this.$refs.refCropper.rotateRight();
        },
        refreshCrop: function () {
          this.$refs.refCropper.refresh();
        },
        clearCrop: function () {
          this.$refs.refCropper.clearCrop();
        },
        // 实时预览函数
        realTime: function (data) {
          this.previews = data;
        },
        finish: function (type) {
          // 输出
          var _this = this;
          _this.previews.loadingText = '图片生成中..';
          if (type === 'blob') {
            this.$refs.refCropper.getCropBlob(function (data) {
              _this.previews.url = window.URL.createObjectURL(data);
              _this.previews.loadingText = '';
            });
          } else {
            this.$refs.refCropper.getCropData(function (data) {
              _this.previews.url = data;
              _this.previews.loadingText = '';
            });
          }
        },
        down: function (type) {
          // event.preventDefault()
          var _this = this;
          // 输出
          if (type === 'blob') {
            _this.$refs.refCropper.getCropBlob(function (data) {
              _this.downImg = window.URL.createObjectURL(data);
              if (window.navigator.msSaveBlob) {
                var blobObject = new Blob([data]);
                window.navigator.msSaveBlob(blobObject, _this.outputFileName);
              } else {
                _this.$nextTick(function () {
                  _this.$refs.downloadDom.click();
                });
              }
            });
          } else if (type == 'base64') {
            _this.$refs.refCropper.getCropData(function (data) {
              _this.downImg = data;
              if (window.navigator.msSaveBlob) {
                var blobObject = new Blob([data]);
                window.navigator.msSaveBlob(blobObject, _this.outputFileName);
              } else {
                _this.$nextTick(function () {
                  _this.$refs.downloadDom.click();
                });
              }
            });
          } else {
            // _this.$refs.refCropper.getCropBlob(function (data) {
            //   _this.downImg = window.URL.createObjectURL(data);
            //   if (window.navigator.msSaveBlob) {
            //     var blobObject = new Blob([data]);
            //     window.navigator.msSaveBlob(blobObject, _this.outputFileName);
            //   } else {
            //     _this.$nextTick(function () {
            //       _this.$refs.downloadDom.click();
            //     });
            //   }
            // }, false, 1);
            _this.$refs.refCropper.getCropData(function (data) {
              _this.downImg = data;
              if (window.navigator.msSaveBlob) {
                var blobObject = new Blob([data]);
                window.navigator.msSaveBlob(blobObject, _this.outputFileName);
              } else {
                _this.$nextTick(function () {
                  _this.$refs.downloadDom.click();
                });
              }
            }, undefined, false, 0.6);
          }
        },
        uploadImg: function (e, num) {
          // 上传图片
          var _this = this;
          var file = e.target.files[0];
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
            return false;
          }
          var reader = new FileReader();
          reader.onload = function (e) {
            var data;
            if (typeof e.target.result === 'object') {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]));
            } else {
              data = e.target.result;
            }
            if (num === 1) {
              _this.option.img = data;
            } else if (num === 2) {
              _this.example2.img = data;
            }
          };
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
          reader.readAsArrayBuffer(file);
          console.dir(file);
        },
        handleRemove: function (file, fileList) {
          console.log(file, fileList);
        },
        handlePreview: function (file) {
          console.log(file);
        },
        handleTimeout: function () { },
        handleChange: function () {
          console.log('handleChange', arguments);
        },
        handleBeforeUpload: function () {
          console.log('handleBeforeUpload', arguments);
        },
        handleProgress: function () {
          console.log('handleProgress', arguments);
        },
        handleSuccess: function () {
          console.log('handleSuccess', arguments);
        },
        handleStart: function () {
          console.log('handleStart', arguments);
        },
        /**
         * 上传文件到服务器
         */
        uploadToServer: function () {
          var _this = this;
          this.$refs.refCropper.getCropBlob(function (data) {
            data.name = _this.outputFileName;
            _this.$refs.refUpload.handleStart(data);
            _this.$nextTick(function () {
              _this.$refs.refUpload.submit();
            });
          });
        },
        /**
         * 压缩图片
         */
        compress: function () {
          var _this = this;
          this.$refs.refCropper.getCropBlob(function (data) {
            _this.previews.url = window.URL.createObjectURL(data);
            _this.previews.loadingText = '';
          });
        }
      }
    });
  };
});