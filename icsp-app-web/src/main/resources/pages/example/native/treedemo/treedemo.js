/**
 * Created by sunxiaojun on 2017/11/16.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#treedemo',
      data: {
        styleObj: { height: yufp.custom.viewSize().height + 'px', overflow: 'auto' },
        height: yufp.custom.viewSize().height - 120,
        mainGrid: {
          data: null,
          total: null,
          loading: false,
          multipleSelection: [],
          paging: {
            page: 1,
            pageSize: 10
          },
          query: {
            title: '',
            createAt: '',
            type: ''
          }
        },
        mytree: {
          data: [{
            id: 0,
            label: '宇信银行总行',
            children: []
          }]
        }
      },
      methods: {
        startChangeFn: function (val) {
          this.mainGrid.paging.page = val;
          this.queryMainGridFn();
        },
        limitChangeFn: function (val) {
          this.mainGrid.paging.page = 1;
          this.mainGrid.paging.pageSize = val;
          this.queryMainGridFn();
        },
        selectionChangeFn: function (val) {
          this.mainGrid.multipleSelection = val;
        },
        queryMainGridFn: function () {
          var _this = this;
          this.mainGrid.loading = true;
          var param = {
            page: this.mainGrid.paging.page,
            pageSize: this.mainGrid.paging.pageSize,
            condition: JSON.stringify({
              title: this.mainGrid.query.title,
              createAt: this.mainGrid.query.createAt ? parseTime(this.mainGrid.query.createAt, '{y}-{m}-{d}') : '',
              type: this.mainGrid.query.type
            })
          };
          // 发起请求
          yufp.service.request({
            method: 'GET',
            name: 'trade/example/list',
            data: param,
            callback: function (code, message, response) {
              _this.mainGrid.data = response.data;
              _this.mainGrid.total = response.total;
              _this.mainGrid.loading = false;

              // if (code == 0 || code==undefined) {
              //     yufp.layer.open("提交成功");
              // } else {
              //     yufp.layer.open("service调用异常:code:" + code + ",msg:" + JSON.stringify(message));
              // }
            }
          });
        },
        array2tree: function (params) {
          var data = params.data;
          var idField = params.idField || 'ID';
          var labelField = params.labelField || 'NAME';
          var pidField = params.pidField || 'PARENT_ID';
          var children = [];
          var tempObj = {};
          tempObj[idField] = params.root;
          var root = typeof params.root === 'object' ? params.root : tempObj;
          var rId = '' + root[idField];
          for (var i in data) {
            var d = data[i];
            if (rId === '' + d[idField]) {
              root = d;
            } else if (rId === ('' + d[pidField])) {
              children.push(d);
            }
          }
          root.id = Number(root[idField]);
          root.label = root[labelField];
          root.children = children;
          for (i = 0, len = root.children.length; i < len; i++) {
            root.children[i] = this.array2tree({ data: data, idField: idField, labelField: labelField, pidField: pidField, root: root.children[i]
            });
          };

          return root;
        },
        resetQueryCondFn: function () {
          this.mainGrid.paging = {
            page: 1,
            pageSize: 10
          };
          this.mainGrid.query = {
            title: '',
            createAt: '',
            type: ''
          };
        },
        queryTreeFn: function () {
          var params = {
            condition: JSON.stringify({ searchType: 'SUBTREE' })
          };
          var _this = this;

          yufp.service.request({
            method: 'GET',
            url: '/trade/example/tree',
            data: params,
            callback: function (code, message, response) {
              var data = response.data || [];
              data = _this.array2tree({ data: data, idField: 'UNITID', labelField: 'UNITNAME', pidField: 'SUPERUNITID', root: '500' });
              _this.mytree.data = [data];
              setTimeout(function () {
                // 默认展开根节点
                if (_this.$refs.mytree.root.childNodes[0]) {
                  _this.$refs.mytree.root.childNodes[0].expanded = true;
                };
              }, 1);
            }
          });
        },
        nodeClickFn: function (obj, node, nodeComp) {
          this.$message({ message: node.id + node.label });
        }
      },
      mounted: function () {
        this.queryMainGridFn();
        this.queryTreeFn();
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