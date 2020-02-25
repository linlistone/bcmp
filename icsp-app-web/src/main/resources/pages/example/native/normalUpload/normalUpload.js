/**
 * Created by zhangkun on 2017/12/20.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#normalUpload',
      // 以m_开头的属性为UI数据不作为业务数据，否则为业务数据
      data: function () {
        return {
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          singleFileUp: [],
          imageUrl: ''
        };
      },
      methods: {
        handleRemove: function (file, fileList) {
          this.$alert(file, fileList);
        },
        handlePreview: function (file) {
          this.$alert(file);
        },
        handleAvatarSuccess: function (res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload: function (file, fileList) {
          var isPNG = file.type === 'image/png';
          var isLt2M = file.size / 1024 / 1024 < 2;
          if (!isPNG) {
            this.$message.error('上传头像图片只能是 PNG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isPNG && isLt2M;
        }
        // uplimit(file, fileList) {
        //   if(fileList.length > 1){
        //     debugger
        //     this.$message.error('只能上传一个文件!');
        //     console.log(file);
        //     this.$refs.singleup.abort(file)
        //     this.singleFileUp = fileList.slice(0,1)
        //   }
        // }
      }
    });
  };
  // 消息处理
  exports.onmessage = function (type, message) {
  };
  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {
  };
});