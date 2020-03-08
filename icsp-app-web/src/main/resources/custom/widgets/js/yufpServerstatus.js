(function (vue, $, name) {
  // 注册text组件
  vue.component(name, {
    // 模板
    template: `
    <div class="server_cluster">
    <el-card :class="elcardCalss" >
        <canvas class="flag" id="flag" width="30" height="30" ref="flag"></canvas>
        <div slot="header" class="clearfix" ref="card_head">
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-checkbox v-model="checkedVal"  @change="change(checkedVal)"></el-checkbox>
                </el-col>
                <el-col :span="15">
                    <li class="title_font" style="margin-top:2px">{{datasource.ip}}</li>
                </el-col>
            </el-row>
        </div>
        <div class="jdblue" :disabled="disabled" @tap="onTap()" @click="onTap()">
            <div class="jdgray_contain" :id="datasource.ip+'_'+datasource.nodename">
                <a rel="nodebrowse-view" href="javascript:void(0);">
                    <div class="jdblue_list">
                        <ul>
                            <li class="font_black">服务名称：{{datasource.nodename}}</li>
                            <li class="font_black">服务类型：{{datasource.nodetype}}</li>
                            <li class="font_black">服务状态：{{datasource.serverstatus?"已启动":"未启动"}}</li>
                        </ul>
                    </div>
                </a>
            </div>
            <div class="jdblue_foot"></div>
        </div>
    </el-card>
    </div>`,
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
            serverstatus: false,
            conncount: 0,
            ip: '10.229.169.65'
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
        mEditing: false,
        checkedVal: false,
        elcardCalss: 'server-cluster-el-card-up'
      };
    },
    // 计算
    computed: {
    },
    // 监控
    watch: {
      disabled: function () {
        this.drawNodeNum();
      },
      value: function (val) {
        this.checkedVal = val;
      }
    },
    // 方法
    methods: {
      // 选中
      onTap: function (evt) {
        if (!this.disabled) {
          // 触发事件
          this.$emit('tap', evt);
        } else {
          this.$message({
            message: '服务器状态未知',
            type: 'warning'
          });
        }
      },
      // 值改变
      change: function (val) {
        this.$emit('change', val);
      },
      drawNodeNum: function () {
        // 画节点编号
        var color = '';
        if (this.disabled) {
          // this.checkedVal = false;
          this.datasource.serverstatus = false;
          color = '#CCCFD5';
          this.elcardCalss = 'server-cluster-el-card-down';
        } else {
          color = '#409EFF';
          this.elcardCalss = 'server-cluster-el-card-up';
          this.datasource.serverstatus = true;
        }
        // 头信息
        var canvas = this.$refs.flag;
        canvas.offsetLeft = 35; canvas.offsetX = 35;
        canvas.offsetTop = -35; canvas.offsetY = -35;
        canvas.style.top = -35;
        canvas.style.left = 35;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(15, 15, 15, -1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(15, 15, 13, -1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.font = 'bold 20px arial';
        ctx.fillStyle = 'white';
        if (this.datasource.index < 10) {
          ctx.fillText(this.datasource.index, 9, 22);
        } else {
          ctx.fillText(this.datasource.index, 3, 22);
        }
      }
    },
    // 加载后执行
    mounted: function () {
      this.drawNodeNum();
    }
  });
}(Vue, yufp.$, 'yufp-serverstatus'));