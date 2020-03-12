/**
 * Created by zhangkun on 2017/12/20.
 */
define(['libs/md5/spark-md5.min.js'], function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#uploadWidthMD5',
      // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
      data: function () {
        return {
          singleFileUp: [],
          imageUrl: '',
          md5: ''
        };
      },
      methods: {
        handleRemove: function (file, fileList) {
          yufp.logger.debug(file, fileList);
        },
        onChange: function (file, fileList) {
          if (!file) {
            return;
          }
          yufp.logger.debug(file.status);

          var _this = this;
          if (file.status == 'ready') {
            var fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file.raw);
            var d = new Date();
            var start = d.getTime();
            fileReader.onload = function (e) {
              if (file.size != e.target.result.byteLength) {} else {
                yufp.logger.debug(SparkMD5.ArrayBuffer.hash(e.target.result)); // compute hash
                d = new Date();
                var end = d.getTime();
                yufp.logger.debug('计算花费' + (end - start) + 'ms');
                _this.$data.md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
                _this.$refs.upload.submit();
              }
            };
            fileReader.onerror = function () {
            };

            time = new Date().getTime();
          }
        }
      }
    });
  };
  // 消息处理
  exports.onmessage = function (type, message) {};
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {};
});