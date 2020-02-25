/* eslint no-console:0 */

/**
 * yufp-xview
 * @created by qfkong 2018-10-11
 * @description 自定义弹窗布局组件
 */
(function (vue, $, name) {
  vue.component(name, {
    template: '<transition :name="transitionModel">\
  <div :class="[\'yu-xview\', \'yu-xview-x__wrapper\', \'yu-xview-x-\'+layout]" v-show="visible" @click.self="handleWrapperClick">\
    <div ref="viewModel" v-show="modal" class="v-mask-model"></div>\
    <div\
      class="yu-xview-x"\
      :class="[sizeClass, customClass]"\
      ref="dialog"\
      :style="styleRoot">\
      <div class="yu-xview-x__header">\
        <slot name="title">\
          <span class="yu-xview-x__title">{{title}}</span>\
        </slot>\
        <button type="button" class="yu-xview-x__headerbtn" aria-label="Close" \
          v-if="showClose" @click="handleClose">\
          <i class="yu-xview-x__close el-icon el-icon-close"></i>\
        </button>\
      </div>\
      <div class="yu-xview-x__body" v-if="rendered" :style="styleBody"><slot></slot></div>\
      <div class="yu-xview-x__footer" v-if="$slots.footer || needBar">\
        <el-button v-if="needBar" type="primary" icon="check" @click="sureFn">{{sureText}}</el-button>\
        <el-button v-if="needBar" type="primary" icon="yx-undo2" @click="handleClose">{{cancelText}}</el-button>\
        <slot name="footer"></slot>\
      </div>\
    </div>\
  </div>\
</transition>',

    props: {
      // 布局方式：dialog:弹窗模式，默认值;sidebar:侧边栏模式;cover:覆盖模式
      layout: {
        type: String,
        default: 'dialog'
      },
      // 弹窗标题
      title: {
        type: String,
        default: ''
      },
      // 是否显示遮罩层
      modal: {
        type: Boolean,
        default: true
      },
      // 是否全屏显示，将弹窗追加到body,默认追加，则遮罩层为全屏状态；否则局部遮罩
      full: {
        type: Boolean,
        default: true
      },
      // 是否锁定body滚动条
      lockScroll: {
        type: Boolean,
        default: true
      },
      // 是否点击遮罩层关闭
      closeOnClickModal: {
        type: Boolean,
        default: false
      },
      // 是否按ESC关闭
      closeOnPressEscape: {
        type: Boolean,
        default: false
      },
      // 是否显示关闭按钮
      showClose: {
        type: Boolean,
        default: true
      },
      // 窗口尺寸
      size: {
        type: String,
        default: 'x'
      },
      // 自定义样式名称
      customClass: {
        type: String,
        default: ''
      },
      // 是否切换显示
      isSwitch: {
        type: Boolean,
        default: true
      },
      // 据顶部距离
      top: {
        type: String,
        default: '15%'
      },
      // 关闭前操作函数
      beforeClose: Function,
      // 宽度
      width: String,
      // 高度
      height: String,
      // 是否需要底部
      needBar: Boolean,
      // 确认操作函数
      sureFn: {
        type: Function,
        default: function () { }
      },
      // 取消按钮文本
      cancelText: {
        type: String,
        default: '取消'
      },
      // 确定按钮文本
      sureText: {
        type: String,
        default: '确认'
      },
      // 是否可见
      visible: {
        type: Boolean,
        default: false
      },
      // 是否绑定
      rendered: {
        type: Boolean,
        default: true
      },
      // 是否可拖动
      draggable: {
        type: Boolean,
        default: true
      },
      // 是否可调整大小
      resizeable: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      visible: function (val) {
        this.$emit('update:visible', val);
        // 以full标注是否添加到body中，如果在body中，则表示遮罩及居中为全屏模式，否则为当前区域模式
        if (val) {
          this.$nextTick(function () {
            this.setViewSizeAndPosition();
          });
          if (this.full) {
            this.$el.style.position = 'fixed';
            document.body.appendChild(this.$el);
          } else {
            // 修改对象的样式
            this.$el.style.position = 'absolute';
            var elSize = this.getRootSize();
            this.$el.style.height = (this.isIE ? 10 : 0) + elSize.clientHeight + elSize.offsetTop + 'px';
          }
          this.closeOnClickModal ? this.$refs.viewModel.addEventListener('click', this.handleClose) : '';
        } else {
          if (this.draggable) {
            var dragEl = this.$refs.dialog;
            dragEl.style.left = this.initDragLeft;
            dragEl.style.top = this.initDragTop;
          }
          this.$emit('close');
          if (this.full && this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
          }
          this.closeOnClickModal ? this.$refs.viewModel.removeEventListener('click', this.handleClose) : '';
        }
      }
    },
    computed: {
      sizeClass: function () {
        return 'yu-xview-x--' +
          (this.size === 'full' ? 'full' : 'x');
      },
      styleRoot: function () {
        var orginWidth = this.width;
        var newWidth = '50%';
        if (orginWidth && orginWidth !== 'auto') {
          newWidth = orginWidth;
        }
        return this.size === 'full'
          ? {}
          : this.isDialog() ? { width: newWidth, left: '50%', 'top': this.top } : { width: newWidth, right: 0, 'top': this.top };
      },
      styleBody: function () {
        return this.size === 'full' || !this.height
          ? {}
          : { height: this.height, overflow: 'hidden', overflowY: 'auto' };
      }
    },
    methods: {
      isDialog: function () {
        return this.layout === 'dialog';
      },
      // 设置显示区域的尺寸及位置
      setViewSizeAndPosition: function () {
        var dialog = this.$refs.dialog,
          ml = (-dialog.clientWidth / 2) + 'px';
        this.isDialog() ? dialog.style.marginLeft = ml : '';
        this.$el.style.width = '100%';
        var elSize = this.getRootSize();
        if (this.layout == 'sidebar') {
          dialog.style.height = (this.isIE ? 10 : 0) + elSize.clientHeight + elSize.offsetTop + 'px';
          dialog.style.left = this.modal ? elSize.clientWidth - parseInt(this.width) + 'px' : 0 + 'px';
          dialog.style.top = 0;

          this.$el.style.left = 'initial';
          this.$el.style.right = 0;
        }
        dialog.scrollTop = 0;
        if (this.draggable && this.full) {
          this.$el.style.position = '';
        }
        if (!this.modal) {
          this.$el.style.width = this.layout == 'cover' ? '100%' : this.width;
          if (this.layout == 'dialog') {
            this.$el.style.left = (elSize.clientWidth - parseInt(this.width)) / 2 + 'px';
          }
        }
      },
      handleWrapperClick: function () {
        if (!this.closeOnClickModal) {
          return;
        }
        this.handleClose();
      },
      handleClose: function () {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide: function (cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('visible-change', false);
        }
      },
      /**
     * 获取根对象尺寸
     */
      getRootSize: function () {
        var r = this.full ? document.body : this.$root.$el.parentNode;
        var size = {
          clientHeight: r.clientHeight,
          clientWidth: r.clientWidth,
          clientLeft: r.clientLeft,
          clientTop: r.clientTop,
          offsetHeight: r.offsetHeight,
          offsetWidth: r.offsetWidth,
          offsetLeft: r.offsetLeft,
          offsetTop: r.offsetTop
        };
        return size;
      },
      /**
     * 打开窗口
     */
      open: function () {
        var _this = this;
        // 如果已经打开，就先关闭再打开
        if (_this.visible) {
          _this.$emit('update:visible', false);
        }
        _this.$nextTick(function () {
          _this.$emit('update:visible', true);
        });
      },
      /**
     * 重新打开窗口
     */
      reopen: function () {
        this.open();
      }
    },
    created: function () {
      // 覆盖展示时，直接全屏状态
      if (this.layout == 'cover') {
        this.size = 'full';
        this.full = false;
      }
      this.isIE = /compatible;\s+MSIE/.test(window.navigator.userAgent);
      this.transitionModel = 'xview-' + this.layout + (this.modal ? '' : '-nomodal');
    },
    mounted: function () {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.full) {
          this.$el.style.position = 'fixed';
          document.body.appendChild(this.$el);
        } else {
          this.$el.style.position = 'absolute';
        }
        this.closeOnClickModal ? this.$refs.viewModel.addEventListener('click', this.handleClose) : '';
      }
    },
    destroyed: function () {
      if (this.full && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.closeOnClickModal ? this.$refs.viewModel.removeEventListener('click', this.handleClose) : '';
    }
  });
}(Vue, yufp.$, 'yu-xview'));


