/**
 * Created by yumeng on 2017/11/26.
 */
define([
  './libs/vuedraggble/sortable.js',
  './libs/vuedraggble/vuedraggable.min.js'],
function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: '#exampleEdit',
      data: function () {
        var _this = this;
        return {
          queryFields: [
            {placeholder: '标题', field: 'title', type: 'input'},
            {placeholder: '时间', field: 'createAt', type: 'date'},
            {placeholder: '类型', field: 'type', type: 'select', dataCode: 'NATIONALITY' }
          ],
          tableColumns: [
            { label: '编码', prop: 'id', width: 110 },
            { label: '名称', prop: 'title', width: 200, sortable: true, resizable: true },
            { label: '类型', prop: 'type', width: 110, dataCode: 'NATIONALITY' },
            { label: '作者', prop: 'author', width: 110 },
            { label: '状态', prop: 'status', width: 120, dataCode: 'PUBLISH_STATUS' }
          ],

          updateFields: [{
            columnCount: 2,
            fields: [
              { field: 'title', label: '名称' },
              { field: 'createAt', label: '时间', type: 'date' },
              { field: 'author', label: '作者' },
              { field: 'auditor', label: '审核人' },
              { field: 'importance', label: '重要性' },
              { field: 'pageviews', label: '阅读数' },
              { field: 'OPEN_FLAG', label: '有无' },
              { field: 'MEASURE', label: '已未' },
              { field: 'LOCK', label: '锁定' },
              { field: 'type', label: '类型', type: 'select', dataCode: 'NATIONALITY' },
              { field: 'status', label: '状态', type: 'select', dataCode: 'PUBLISH_STATUS' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'remark', label: '点评', type: 'textarea', rows: 3 }
            ]
          }],
          updateButtons: [
            {label: '保存',
              type: 'primary',
              icon: 'check',
              hidden: true,
              click: function (model) {
                _this.dialogVisible = false;
                _this.$msgbox.alert(model, '提示');
              // 请调用服务进行后台保存
              }}
          ],
          height: yufp.frame.size().height - 103,
          grpFormHeight: yufp.frame.size().height - 103 - 127 + 'px',
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false)
        };
      },
      methods: {
        switchStatus: function (viewType, editable) {
          this.viewType = viewType;
          this.formDisabled = !editable;
          this.updateButtons[0].hidden = !editable;
        },
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.myform.resetFields();
          });
        },
        modifyFn: function () {
          if (this.$refs.mytable.selections.length < 1) {
            this.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          this.switchStatus('EDIT', true);
          this.$nextTick(function () {
            yufp.extend(this.$refs.myform.formModel, this.$refs.mytable.selections[0]);
          });
        },
        infoFn: function () {
          if (this.$refs.mytable.selections.length < 1) {
            this.$message({message: '请先选择一条记录', type: 'warning'});
            return;
          }
          this.switchStatus('DETAIL', false);
          this.$nextTick(function () {
            yufp.extend(this.$refs.myform.formModel, this.$refs.mytable.selections[0]);
          });
        },
        rowClickFn: function (row) {
          // this.infoFn();
        }
      },
      mounted: function () {
        var _this = this;
        setTimeout(function () {
          var tree = document.querySelectorAll('.expedit table>tbody')[0];
          Sortable.create(tree, {group: {name: 'demo', pull: 'clone'}, sort: false
          });
          var form = document.querySelectorAll('.myform form')[0];
          Sortable.create(form, {group: {name: 'demo'},
            sort: false,
            onAdd: function (evt) {
              var tr = document.querySelectorAll('.myform form tr')[0];
              form.removeChild(tr);
              var tmp = {};
              var i = 0;
              var trval = evt.clone.innerText.split('\n');
              for (var k = 0; k < _this.tableColumns.length; k++) {
                if (_this.tableColumns[k].prop) {
                  tmp[_this.tableColumns[k].prop] = trval[i];
                  i++;
                }
              }
              yufp.extend(_this.$refs.myform.formModel, tmp);
            }
          });
        }, 500);
      }
    });
  };
});