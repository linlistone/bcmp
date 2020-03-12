/**
 * Created by helin3 on 2017/11/25.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    var height = yufp.custom.viewSize().height;
    // 创建virtual model
    yufp.custom.vue({
      el: '#el_tree_x_demo',
      data: {
        height: height,
        // 属性说明，实际使用时不需要此部分
        currClickNode: '',
        grid: {
          data1: [
            {name: 'data-url', remark: '数据URL', type: 'String', option: '—', default: '—'},
            {name: 'data-id', remark: '节点ID', type: 'String', option: '—', default: 'ID'},
            {name: 'data-label', remark: '节点文本', type: 'String', option: '—', default: 'NAME'},
            {name: 'data-pid', remark: '父节点ID', type: 'String', option: '—', default: 'PID'},
            {name: 'data-root', remark: '根节点ID', type: 'String', option: '—', default: '0'},
            {name: 'height', remark: '树高度', type: 'Number', option: '—', default: '400'},
            {name: 'root-visible', remark: '是否展示根节点', type: 'boolean', option: '—', default: 'true'},

            {name: 'show-checkbox', remark: '节点是否可被选择', type: 'boolean', option: '—', default: 'false'}
          ],
          data2: [
            {name: 'getCheckedNodes', remark: '若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组', param: '(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点，默认值为 false'},
            {name: 'setCheckedNodes', remark: '设置目前勾选的节点', param: '(nodes) 接收勾选节点数据的数组'},
            {name: 'getCheckedKeys', remark: '若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组', param: '(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false'},
            {name: 'setCheckedKeys', remark: '通过 ids 设置目前勾选的节点', param: '(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false'},
            {name: 'setChecked', remark: '通过 key / data 设置某个节点的勾选状态', param: '(key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为 false'}

          ],
          data3: [
            {name: 'node-click', remark: '节点被点击时的回调', param: '（nodeData, node, self）'},
            {name: 'check-change', remark: '节点选中状态发生变化时的回调', param: '（nodeData, checked, indeterminate）'},
            {name: 'current-change', remark: '当前选中节点变化时触发的事件', param: '(nodeData, node, self)'},
            {name: 'node-expand', remark: '节点被展开时触发的事件', param: '(nodeData, node, instance)'},
            {name: 'node-collapse', remark: '节点被关闭时触发的事件', param: '(nodeData, node, instance)'}
          ]
        }
      },
      methods: {
        nodeClickFn: function (nodeData, node, self) {
          this.currClickNode = nodeData.id + '|' + nodeData.label;
        },
        getCheckedNodes: function () {
          this.$alert(this.$refs.mytree.getCheckedNodes(), '提示');
        },
        getCheckedKeys: function () {
          this.$alert(this.$refs.mytree.getCheckedKeys());
        },
        setCheckedKeys: function () {
          this.$refs.mytree.setCheckedKeys(['503']);
        },
        resetChecked: function () {
          this.$refs.mytree.setCheckedKeys([]);
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