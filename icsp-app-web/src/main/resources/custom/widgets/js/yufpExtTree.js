/**
 * [与el-tree-x类似的树]
 * @param  {[type]} vue  [description]
 * @param  {[type]} $    [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
(function (vue, $, name) {
  // 注册扩展树组件
  vue.component(name, {
    props: {
      // 原生属性
      nodeKey: {
        type: String,
        default: 'id'
      },
      renderContent: Function,
      highlightCurrent: Boolean,
      currentNodeKey: [String, Number],
      defaultExpandAll: Boolean,
      expandOnClickNode: Boolean,
      autoExpandParent: Boolean,
      defaultExpandedKeys: Array,
      showCheckbox: {
        type: Boolean,
        default: false
      },
      checkStrictly: Boolean,
      defaultCheckedKeys: Array,
      filterNodeMethod: Function,
      accordion: Boolean,
      indent: Number,
      dataUrl: String,
      dataId: {
        type: String,
        default: 'ID'
      },
      dataLabel: {
        type: String,
        default: 'NAME'
      },
      dataPid: {
        type: String,
        default: 'PID'
      },
      dataRoot: [String, Object],
      height: {
        type: Number,
        default: 400
      },
      rootVisible: {
        type: Boolean,
        default: true
      },
      dataParams: {
        type: Object,
        default: function () {
          return {};
        }
      },
      /** 请求类型 */
      requestType: {
        type: String,
        default: 'GET'
      },
      jsonData: {
        type: String,
        default: 'data'
      },
      expandLevel: {
        type: Number,
        default: 2
      },
      lazyLoad: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        orginalData: [],
        data: [{
          id: 0,
          label: '',
          children: []
        }],
        props: {
          children: 'children',
          label: 'label'
        },
        styleObj: {
          height: (this.height - 2) + 'px',
          overflow: 'auto'
        }
      };
    },
    created: function () {
      var lazyrender = this.lazyLoad ? 'lazy="" ' : '';
      var renderXtemplate = function () {
        var template = '<el-tree class="el-tree-x" :style="styleObj" :node-key="nodeKey" ' + lazyrender + ' :load="load" :render-content="renderContent" :highlight-current="highlightCurrent"\
          :current-node-key="currentNodeKey" :default-expand-all="defaultExpandAll" :expand-on-click-node="expandOnClickNode"\
          :auto-expand-parent="autoExpandParent" :default-expanded-keys="defaultExpandedKeys" :show-checkbox="showCheckbox"\
          :check-strictly="checkStrictly" :default-checked-keys="defaultCheckedKeys" :filter-node-method="filterNodeMethod"\
          :accordion="accordion" @node-click="nodeClick" @check-change="checkChange"\
          @current-change="currentChange" @node-expand="nodeExpand" @node-collapse="nodeCollapse"\
          :data="data" :props="props" ></el-tree>';
        return template;
      };
      this.$options.template = renderXtemplate.call(this);
    },
    mounted: function () {
      if (!this.lazyLoad) {
        this.remoteData();
      }
    },
    methods: {
      filter: function (value) {
        return this.$children[0].filter(value);
      },
      getCheckedNodes: function (leafOnly) {
        return this.$children[0].getCheckedNodes(leafOnly);
      },
      getCheckedKeys: function (leafOnly) {
        return this.$children[0].getCheckedKeys(leafOnly);
      },
      getHalfCheckedNodes: function () {
        return this.$children[0].getHalfCheckedNodes();
      },
      setCheckedNodes: function (nodes, leafOnly) {
        this.$children[0].setCheckedNodes(nodes, leafOnly);
      },
      setCheckedKeys: function (keys, leafOnly) {
        this.$children[0].setCheckedKeys(keys, leafOnly);
      },
      setChecked: function (data, checked, deep) {
        this.$children[0].setChecked(data, checked, deep);
      },
      load: function (node, resolve) {
        var clickData = node.data;
        var dataId = this.dataId;
        var dataPid = this.dataPid;
        var me = this;
        var params = {};
        if (clickData[dataId]) {
          // 非加载根节点
          params[dataPid] = clickData[dataId];
          yufp.service.request({
            url: me.dataUrl,
            method: me.requestType,
            data: params,
            callback: function (code, message, response) {
              var data = me.getObjectKey(response, me.jsonData) || [];
              var nodeArray = [];
              for (var i = 0; i < data.length; i++) {
                data[i].id = data[i][me.dataId];
                data[i].label = data[i][me.dataLabel];
                data[i].pid = data[i][me.dataPid];
                nodeArray.push(data[i]);
              }
              return resolve(nodeArray);
            }
          });
        } else {
          // 加载根节点
          params[dataId] = me.dataRoot;
          yufp.service.request({
            url: me.dataUrl,
            method: me.requestType,
            data: params,
            callback: function (code, message, response) {
              var data = me.getObjectKey(response, me.jsonData) || [];
              var nodeArray = [];
              for (var i = 0; i < data.length; i++) {
                data[i].id = data[i][me.dataId];
                data[i].label = data[i][me.dataLabel];
                data[i].pid = data[i][me.dataPid];
                nodeArray.push(data[i]);
              }
              return resolve(nodeArray);
            }
          });
        }
      },
      // 触发事件类型、私有方法
      nodeClick: function (nodeData, node, self) {
        this.$emit('node-click', nodeData, node, self);
      },
      checkChange: function (nodeData, checked, indeterminate) {
        this.$emit('check-change', nodeData, checked, indeterminate);
      },
      currentChange: function (nodeData, node, self) {
        this.$emit('current-change', nodeData, node, self);
      },
      nodeExpand: function (nodeData, node, instance) {
        this.$emit('node-expand', nodeData, node, instance);
      },
      nodeCollapse: function (nodeData, node, self) {
        this.$emit('node-collapse', nodeData, node, self);
      },
      asyncData: function (params) {
        var me = this;
        yufp.service.request({
          url: me.dataUrl,
          method: me.requestType,
          data: params,
          callback: function (code, message, response) {
            var data = me.getObjectKey(response, me.jsonData) || [];
            return data;
          }
        });
      },
      remoteData: function () {
        var me = this;
        yufp.service.request({
          url: me.dataUrl,
          method: me.requestType,
          data: me.dataParams,
          callback: function (code, message, response) {
            var data = me.getObjectKey(response, me.jsonData) || [];
            me.orginalData = data;
            me.$emit('get-tree-datas', me.orginalData);
            data = me.genTreeData(data);
            me.data = me.rootVisible ? data : data[0].children;
            setTimeout(function () {
              // 默认展开根节点
              me.expandNode(me.$children[0].root.childNodes, 1);
            }, 1);
          }
        });
      },
      getObjectKey: function (obj, ns) {
        if (!ns) {
          return obj;
        }
        var keys = ns.split('.');
        for (var i = 0, len = keys.length; i < len; i++) {
          if (!obj) {
            break;
          }
          obj = obj[keys[i]];
        }
        return obj;
      },
      genTreeData: function (data) {
        var me = this;
        var attr = {
          id: me.dataId,
          label: me.dataLabel,
          pid: me.dataPid,
          root: me.dataRoot
        };
        return yufp.util.genTree(data, attr);
      },
      /**
      * [expandNode 展开当前数据的子节点]
      * @param  {[type]} data  [待展开的节点数组]
      * @param  {[type]} level [当前层级]
      * @return {[type]}       [description]
      */
      expandNode: function (data, level) {
        var me = this;
        if (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i]) {
              if (level < me.expandLevel) {
                me.expandNode(data[i].childNodes, level + 1);
                data[i].expanded = true;
              }
            }
          }
        }
      }
    },
    watch: {
      dataUrl: function (val) {
        this.remoteData();
      },
      dataParams: function (val) {
        this.remoteData();
      }
    }
  });
}(Vue, yufp.$, 'yufp-ext-tree'));