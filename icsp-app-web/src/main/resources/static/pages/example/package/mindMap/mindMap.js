/**
 * @created by taoting1 on 2018-10-23 11:24:58
 * @updated by
 * @description 简易思维导图
 */
define(['./pages/example/package/mindMap/index.js', './pages/example/package/mindMap/mindMap.css'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.logger.debug(window);
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          nodeText: '',
          topbarDisabled: true,
          // 图形对象
          graph: null
        };
      },
      mounted: function () {
        this.loadMindMap();
      },
      methods: {
        loadMindMap: function () {
          var _this = this;
          _this.graph = new mindMap.Graph();
          var renderer = new mindMap.Renderer({
            canvasId: 'mindmapCanvas',
            canvasClickCb: function () {
              _this.nodeText = '';
              _this.topbarDisabled = true;
            },
            nodeClickCb: function (label) {
              _this.nodeText = label;
              _this.topbarDisabled = false;
            }
          }, {
            setSelected: _this.graph.setSelected.bind(_this.graph),
            getParentAddableNodeSet: _this.graph.getParentAddableNodeSet.bind(_this.graph),
            getSelected: _this.graph.getSelected.bind(_this.graph),
            getNodes: _this.graph.getNodes.bind(_this.graph),
            setParent: _this.graph.setParent.bind(_this.graph)
          });
          _this.graph.init(renderer);
        },
        /**
         * 新增节点
         */
        addNodeFn: function (direction) {
          this.graph.addNode(direction);
        },
        /**
         * 删除节点
         */
        removeNodeFn: function () {
          this.graph.removeNode();
        },
        /**
         * 修改节点文字
         */
        editNodeTextFn: function () {
          this.graph.setLabel(this.nodeText);
        }
      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});