
/**
 * text
 */
(function (vue, $, name) {
  // 注册text组件
  vue.component(name, {
    // 模板
    template: '\
         <div class="server_cluster">\
         <el-card class="server-cluster-el-card" style="width:140px">\
          <canvas class="flag" id="flag" width="30" height="30" ref="flag"></canvas>\
            <div slot="header" class="clearfix" ref="card_head">\
                <el-row :gutter="20">\
                     <el-col :span="5">\
                        <el-checkbox v-bind:checked="value"></el-checkbox>\
                    </el-col>\
                    <el-col :span="15">\
                        <li class="font_black">{{datasource.ip}}</li>\
                    </el-col>\
                </el-row>\
            </div>\
            <div class="jdblue" v-bind:disabled="disabled" v-on:tap="onTap($event)">\
                <a title="服务器状态" rel="nodebrowse-version" href="javascript:void(0);" onclick="analyse();" class=""></a>\
                <div class="jdgray_contain" id="contain_10_229_169_65_BIPS_A">\
                    <a rel="nodebrowse-view" href="javascript:void(0);">\
                        <div class="jdblue_list">\
                           <ul>\
                                <li class="font_black">名称：{{datasource.nodename}}</li>\
                                <li class="font_black">服务状态：{{datasource.serverstatus}}</li>\
                                <li class="font_black">客户端数量：{{datasource.conncount}}</li>\
                            </ul>\
                         </div>\
                    </a>\
                </div>\
                 <div class="jdblue_foot"></div>\
                </div>\
                </el-card>\
                </div>\
            ',
    // 属性
    props: {
      // 是否只读
      readonly: {
        type: Boolean,
        required: false,
        default: function () {
          return false;
        }
      },
      // 是否可用
      disabled: {
        type: Boolean,
        required: false,
        default: function () {
          return false;
        }
      },
      // value
      value: {
        type: Boolean,
        required: false,
        default: function () {
          return false;
        }
      },
      // options
      datasource: {
        type: [Object, String],
        required: false,
        default: function () {
          return {
            nodename: 'BIPSA',
            serverstatus: '停止', // 图片最大宽度
            conncount: 0, // 图片最小宽度
            ip: '10.229.169.65' // 图片质量 30~100
          };
        }
      }
    },
    // model
    model: {
      prop: 'value',
      event: 'change'
    },
    // 数据
    data: function () {
      return {
        // 内部提示
        innerTip: '',
        // 是否处于编辑状态
        mEditing: false
      };
    },
    // 计算
    computed: {
    },
    // 监控
    watch: {
    },
    // 方法
    methods: {
      // 选中
      onTap: function (evt) {
        // 触发事件
        this.$emit('tap', evt);
      }
    },
    // 加载后执行
    mounted: function () {
    }
  });
}(Vue, yufp.$, 'yufp-scroll-message'));

/**
 * button
 */
(function (vue, $, name) {
  // 注册组件
  Vue.component(name, {
    // 模板
    template: '\
               <!--自定义Button-->\
                <el-button type="primary" v-bind:class="cls" v-bind:disabled="disabled" v-on:tap="onTap($event)" v_on:click="onClick($event)"><slot></slot></el-button>\
            ',
    // 属性
    props: {
      // 是否可用
      disabled: {
        type: Boolean,
        required: false,
        default: function () {
          return false;
        }
      }
    },
    // data
    data: function () {
      return {
        // button class
        cls: {
          'yufp-btn': true,
          'wp-button': true
        }
      };
    },
    // 方法
    methods: {
      // 选中
      onTap: function (evt) {
        // 触发事件
        this.$emit('tap', evt);
      },
      // 选中
      onClick: function (evt) {
        // 触发事件
        this.$emit('click', evt);
      }
    }
  });
}(Vue, yufp.$, 'yufp-button'));
/**
 * 监控图
 */
(function (vue, $, name) {
  // 注册text组件
  vue.component(name, {
    // 模板
    template: '\
          <canvas class="canvas_monitor_bg" id="bcmp-graph" width="750" height="226" ref="bcmp-graph">\
            ',
    // 属性
    props: {
      // 是否只读
      readonly: {
        type: Boolean,
        required: false,
        default: function () {
          return false;
        }
      },
      // 是否可用
      disabled: {
        type: Boolean,
        required: false,
        default: function () {
          return false;
        }
      },
      // value
      value: {
        type: Boolean,
        required: false,
        default: function () {
          return false;
        }
      },
      // options
      options: {
        type: [Object, String],
        required: false,
        default: function () {
          return {
            coordinateX: [],
            coordinateY: [],
            coordinateXDes: '',
            coordinateYDes: '',
            ip: '10.229.169.65' // 图片质量 30~100
          };
        }
      }
    },
    // model
    model: {
      prop: 'value',
      event: 'change'
    },
    // 数据
    data: function () {
      return {
        // 内部提示
        innerTip: '',
        // 是否处于编辑状态
        mEditing: false
      };
    },
    // 计算
    computed: {
      checked: function (val) {
        this.value;
      }
    },
    // 监控
    watch: {
      disabled: function () {
        if (this.disabled) {
          yufp.$('.server-cluster-el-card>.el-card__header').css('background-color', '#CCCFD5');
        } else {
          yufp.$('.server-cluster-el-card>.el-card__header').css('background-color', '#77A4F5');
        }
      }
    },
    // 方法
    methods: {
      // 选中
      onTap: function (evt) {
        if (!this.disabled) {
          // 触发事件
          this.$emit('tap', evt);
        }
      },
      // 值改变
      change: function (val) {
        this.value = !val;
        this.$emit('change', !val);
      }
    },

    // 加载后执行
    mounted: function () {
      var color = '';

      if (this.disabled) {
        color = '#CCCFD5';
        yufp.$('.server-cluster-el-card>.el-card__header').css('background-color', '#CCCFD5');
      } else {
        color = '#77A4F5';
        yufp.$('.server-cluster-el-card>.el-card__header').css('background-color', '#77A4F5');
      }

      // 头信息
      var card_head = this.$refs.card_head;
      var h = this.$el.childNodes[0].childNodes[0].offsetHeight;
      var w = this.$el.childNodes[0].childNodes[0].offsetWidth;


      var canvas = this.$refs.flag;
      canvas.offsetLeft = 35; canvas.offsetX = 35;
      canvas.offsetTop = -35; canvas.offsetY = -35;

      canvas.style.top = -35;
      canvas.style.left = 35;
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(15, 15, 15, -1.5 * Math.PI, 0.5 * Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(15, 15, 13, -1.5 * Math.PI, 0.5 * Math.PI, false);
      ctx.closePath();
      // ctx.fillStyle = "#77A4F5";
      ctx.fillStyle = color;
      ctx.fill();


      ctx.font = 'bold 20px arial';
      ctx.fillStyle = 'white';
      ctx.fillText(this.datasource.index, 9, 23);
    }
  });
}(Vue, yufp.$, 'yufp-bcmp-graph'));
