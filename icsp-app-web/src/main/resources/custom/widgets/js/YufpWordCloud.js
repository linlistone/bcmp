/**
 * yufp-word-cloud
 * @created by zhangkun6 on 2018/09/26.
 * @description 自定义云组件集成
 */
(function (vue, $, name) {
  vue.component(name, {
    template: '<div>\
      <canvas :id="id" :class="className" :width="width" ></canvas>\
    </div>',

    props: {
      id: String,
      width: {
        type: Number,
        default: 600
      },
      // 自定义class
      className: String,
      // 云图配置参数
      options: Object
    },
    mounted: function () {
      var canvas = document.getElementById(this.id);
      var wd = new Imworldcloud(canvas, this.options);
    }
  });
}(Vue, yufp.$, 'yufp-word-cloud'));


