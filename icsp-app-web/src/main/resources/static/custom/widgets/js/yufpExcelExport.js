/**
 * yufp-excel-export
 * @created by panglx on 2018/10/23.
 * @description 自定义异步导出
 */
(function (vue, $, name) {
  vue.component(name, {
    template: ' <div>\
                <yu-button :icon="icon" :disabled="disabled" :size="size" :type="type" @click="exportFn">导出</yu-button>\
                <yu-xdialog title="导出进度" width="400px" height="80px" :visible.sync="isShowProgress" :show-close="false">\
                <el-progress :percentage="percentage" :stroke-width=18 style="margin-top: 20px"></el-progress>\
                </yu-xdialog>\
                </div>',
    props: {
      type: {
        type: String
      },
      size: String,
      icon: {
        type: String,
        default: 'yx-file-excel'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        isShowProgress: false,
        count: 0,
        percentage: 0
      };
    },
    methods: {
      getDefaultData: function () {
        this.isShowProgress = false;
        this.count = 0;
        this.percentage = 0;
      },
      exportFn: function () {
        var _this = this;
        // 第一次URL请求得到导出id
        yufp.service.request({
          method: 'POST',
          url: '/trade/example/export',
          callback: function (code, message, response) {
            if (code == 0) {
              var data = response && response.data;
              var exportId = data && data.id;
              _this.showProgressFn(exportId);
            }
          }
        });
      },
      showProgressFn: function (id) {
        var _this = this;
        var timer;
        // 第二次URL请求显示进度条
        yufp.service.request({
          method: 'POST',
          url: '/trade/example/getProgress',
          data: { id: id },
          callback: function (code, message, response) {
            if (code == 0) {
              var data = response && response.data;
              _this.percentage = data && data.percentage;
              _this.count = _this.count + 1;
              if (_this.count > 30) {
                _this.$message.error('导出失败！');
                _this.getDefaultData();
                return false;
              };
              if (_this.percentage < 100) {
                _this.isShowProgress = true;
                timer = setTimeout(_this.showProgressFn, 1000);
              } else {
                clearTimeout(timer);
                _this.getDefaultData();
                _this.$message('导出成功!');
              };
            }
          }
        });
      }
    }
  });
}(Vue, yufp.$, 'yufp-excel-export'));