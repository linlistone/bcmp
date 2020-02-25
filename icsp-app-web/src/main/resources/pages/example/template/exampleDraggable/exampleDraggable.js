/**
 * Created by yumeng on 2017/11/15.
 */

define([
  './libs/vuedraggble/sortable.js',
  './libs/vuedraggble/vuedraggable.min.js'],
function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var message = [
      { type: 'success', name: '成功按钮', index: '1'},
      { type: 'warning', name: '警告按钮', index: '2' },
      {type: 'danger', name: '危险按钮', index: '3'},
      {type: 'info', name: '信息按钮', index: '4'}
    ];
    yufp.custom.vue({
      el: '#exampleDraggable',
      data: function () {
        return {
          list: message,
          listClone: [
            {type: 'primary', name: '只要按钮', index: '5'}
          ],
          editable: true,
          editableClone: true,
          isDragging: false,
          delayedDragging: false
        };
      },
      methods: {
        onMove: function (evt) {
          var draggedContext = evt.draggedContext;// 拖动的元素
          var index = draggedContext.index;
          var futureIndex = draggedContext.futureIndex;
          var element = draggedContext.element;
          yufp.logger.info('拖动的元素原先的序列号' + index);
          yufp.logger.info('拖动的元素当前的序列号' + futureIndex);
          yufp.logger.info('拖动的元素当前的试图模型(初始化数组中的对象)' + JSON.stringify(element));
          yufp.logger.info('====================');
          var relatedContext = evt.relatedContext;// 被交换的元素
          var index = relatedContext.index;
          var list = relatedContext.list;
          var element = relatedContext.element;
          var component = relatedContext.component;
          yufp.logger.info('被拖动的元素原先的序列号' + index);
          yufp.logger.info('原始的初始化数据数组' + JSON.stringify(list));
          yufp.logger.info('拖动的元素当前的试图模型(初始化数组中的对象)' + JSON.stringify(element));
          yufp.logger.info('vue组件对象' + component);
        }

      },
      computed: {
        dragOptions: function () {
          return {
            group: {name: 'description', pull: 'clone', put: false},
            disabled: !this.editable
          };
        },
        dragOptionsClone: function () {
          return {
            group: 'description',
            disabled: !this.editableClone
          };
        },
        listString: function () {
          return JSON.stringify(this.list, null, 2);
        },
        listStringClone: function () {
          return JSON.stringify(this.listClone, null, 2);
        }
      },
      watch: {
        isDragging: function (newValue) {
          if (newValue) {
            this.delayedDragging = true;
            return;
          }
          this.$nextTick(function () {
            this.delayedDragging = false;
          });
        }
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