(function (Vue, $, name) {
  Vue.component(name, {
    props: {
      height: [String, Number],
      maxHeight: [String, Number],
      fit: {
        type: Boolean,
        default: true
      },
      stripe: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: true
      },
      rowKey: [String, Function],
      showHeader: {
        type: Boolean,
        default: true
      },
      // 默认参数
      baseParams: Object,
      // 是否开启隐藏列
      hideColumn: {
        type: Boolean,
        default: false
      },
      showSummary: Boolean,
      sumText: String,
      summaryMethod: Function,
      rowClassName: [String, Function],
      rowStyle: [Object, Function],
      highlightCurrentRow: {
        type: Boolean,
        default: true
      },
      currentRowKey: [String, Number],
      emptyText: String,
      expandRowKeys: Array,
      defaultExpandAll: Boolean,
      defaultSort: Object,
      tooltipEffect: String,
      defaultLoad: {
        type: Boolean,
        default: true
      },
      pageable: {
        type: Boolean,
        default: true
      },
      dataUrl: String,
      /** 请求类型 */
      requestType: {
        type: String,
        default: 'GET'
      },
      rowIndex: Boolean,
      radiobox: Boolean,
      checkbox: Boolean,
      tableColumns: {
        type: Array,
        default: function () {
          return [];
        }
      },
      tableFilters: Object,
      jsonData: {
        type: String,
        default: 'data'
      },
      jsonTotal: {
        type: String,
        default: 'total'
      },
      pageKey: {
        type: String,
        default: 'page'
      },
      sizeKey: {
        type: String,
        default: 'size'
      },
      conditionKey: {
        type: String,
        default: 'condition'
      },
      TraceServerName: {
        type: String,
        default: backend.demoService
      },
      uKeyPref: String,
      uKeyField: String
    },
    data: function () {
      return {
        radio: '',
        data: [],
        total: 0,
        queryParam: {},
        page: 1,
        size: 10,
        loading: false,
        selections: [],
        _tc: [],
        tableKey: 0,
        repeatTrigger: false,
        contextMenuId: 'c_menu_id_' + new Date().getTime(),
        dialogVisible_mTrace: false,
        urls: {
          mTraceListUrl: this.TraceServerName + '/api/utrace/selectSModifyTraceWithPage'
        },
        mTraceParams: {},
        mTraceTableColumns: [
          { label: '被修改的域', prop: 'mFieldNm', resizable: true },
          { label: '修改前', prop: 'mOldDispV', resizable: true },
          { label: '修改后', prop: 'mNewDispV', resizable: true },
          { label: '修改人', prop: 'usrId', resizable: true },
          { label: '修改时间', prop: 'mDatetime', resizable: true }
        ]
      };
    },
    methods: {
      pageChangeFn: function (val) {
        var _this = this;
        _this.page = val;
        if (_this.repeatTrigger) {
          _this.repeatTrigger = false;
        } else {
          _this.privateRemoteData();
        }
      },
      sizeChangeFn: function (val) {
        var _this = this;
        _this.size = val;
        if (_this.repeatTrigger) {
          _this.repeatTrigger = false;
        } else {
          if (_this.page != 1) {
            _this.page = 1;
            _this.repeatTrigger = true;
          }
          _this.privateRemoteData();
        }
      },
      /**
       * private 获取namespace数据
       * @param obj 待获取对象
       * @param ns namespace，如：'json.data'
       * @returns {*}
       */
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
      /**
       * 外部调用，请使用remoteData方法
       * privateRemoteDate仅供组件内部使用
       */
      privateRemoteData: function (queryParam) {
        var me = this;
        me.radio = '';
        me.data = [];
        me.selections = [];
        me.loading = true;
        if (!me.dataUrl) {
          throw new Error('ElTableX dataUrl参数未配置');
          return;
        }
        me.queryParam = queryParam ? queryParam : me.queryParam;

        queryParam = yufp.extend(true, {}, me.queryParam);
        var baseParams = yufp.extend(true, {}, me.baseParams);

        var bCondition = baseParams[me.conditionKey];
        var qCondition = queryParam[me.conditionKey];
        if (bCondition) {
          if (qCondition) {
            bCondition = typeof bCondition == 'object' ? bCondition : JSON.parse(bCondition);
            qCondition = typeof qCondition == 'object' ? qCondition : JSON.parse(qCondition);
            yufp.extend(true, bCondition, qCondition);
          }
          queryParam[me.conditionKey] = typeof bCondition == 'object' ? JSON.stringify(bCondition) : bCondition;
        } else if (qCondition) {
          queryParam[me.conditionKey] = typeof qCondition == 'object' ? JSON.stringify(qCondition) : qCondition;
        }
        delete baseParams[me.conditionKey];
        queryParam = yufp.extend(baseParams, queryParam);

        if (me.pageable) {
          var pageObj = {};
          pageObj[me.pageKey] = me.page;
          pageObj[me.sizeKey] = me.size;
          yufp.extend(queryParam, pageObj);
        }
        yufp.service.request({
          url: me.dataUrl,
          data: queryParam,
          method: me.requestType,
          callback: function (code, message, response) {
            var tempdata = me.getObjectKey(response, me.jsonData) || [];
            me.total = me.getObjectKey(response, me.jsonTotal) || 0;
            me.afterLoaded(tempdata, function (newData) {
              me.data = newData;
            });
            me.loading = false;
            me.$nextTick(function () {
              me.$emit('loaded', me.data, me.total);
            });
          }
        });
      },
      remoteData: function (queryParam) {
        var _this = this;
        if (_this.page != 1) {
          _this.page = 1;
          _this.repeatTrigger = true;
        }
        _this.privateRemoteData(queryParam);
      },

      clearSelection: function (selection) {
        return this.$children[0].clearSelection(selection);
      },
      toggleRowSelection: function (row, selected) {
        return this.$children[0].toggleRowSelection(row, selected);
      },
      setCurrentRow: function (row) {
        var L = this.$children.length;
        return this.$children[L - 1].setCurrentRow(row);
      },
      // 触发event类型方法
      select: function (selection, row) {
        this.$emit('select', selection, row);
      },
      selectAll: function (selection) {
        this.$emit('select-all', selection);
      },
      selectionChange: function (selection) {
        this.selections = selection;
        this.$emit('selection-change', selection);
      },
      cellMouseEnter: function (row, column, cell, event) {
        this.$emit('cell-mouse-enter', row, column, cell, event);
      },
      cellMouseLeave: function (row, column, cell, event) {
        this.$emit('cell-mouse-leave', row, column, cell, event);
      },
      cellClick: function (row, column, cell, event) {
        this.$emit('cell-click', row, column, cell, event);
      },
      cellDblclick: function (row, column, cell, event) {
        this.$emit('cell-dblclick', row, column, cell, event);
      },
      rowClick: function (row, event, column) {
        var L = this.$children.length;
        if (!this.checkbox) {
          this.setCurrentRow(row);
          this.radio = row.$index;
          this.selections = [row];
        } else {
          this.$children[0].toggleRowSelection(row);
        }
        this.$emit('row-click', row, event, column);
      },
      rowContextmenu: function (row, event) {
        this.$emit('row-contextmenu', row, event);
      },
      rowDblclick: function (row, event) {
        if (!this.checkbox) {
          this.selections = [row];
        }
        this.$emit('row-dblclick', row, event);
      },
      headerClick: function (column, event) {
        this.$emit('header-click', column, event);
      },
      sortChange: function (obj) {
        if (!obj.column) {
          return;
        }
        var st = obj.column.sortable;
        if (st && (st == 'custom')) {
          var order = obj.order.replace('ending', '');
          this.remoteData({
            sort: obj.prop + ' ' + order
          });
        } else {
          this.$emit('sort-change', obj);
        }
      },
      currentChange: function (currentRow, oldCurrentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow);
      },
      /**
       * 表头右键菜单选项改变
       * @param {Object} e
       */
      headerContextChange: function (e) {
        this.$nextTick(function () {
          var ex = e.target.parentElement.parentElement;
          var label = ex.getAttribute('labels');
          var flag = ex.childNodes[0].className.indexOf('is-checked');
          flag = flag > 0;
          var tc = this.tableColumns;
          for (var i = 0; i < tc.length; i++) {
            if (tc[i].label == label) {
              // 找到和多选对应的列
              this.tableColumns[i].hidden = !flag;
              this.tableKey++;
              return;
            }
            // 判断二级
            if (tc[i].children) {
              for (var j = 0; j < tc[i].children.length; j++) {
                if (tc[i].children[j].label == label) {
                  // 找到和多选对应的列
                  this.tableColumns[i].children[j].hidden = !flag;
                  // 循环此节点的所有子节点都已取消
                  tf: for (var m = 0; m < this.tableColumns[i].children.length; m++) {
                    if (this.tableColumns[i].children[m].hidden == false) {
                      this.tableColumns[i].hidden = false;
                      break tf;
                    }
                    this.tableColumns[i].hidden = true;
                  }
                  this.tableKey++;
                  return;
                }
              }
            }
          }
        });
      },
      /**
       * 表头右键监听
       * @param e:鼠标事件
       * @param v:vue
       */
      contextMenuFun: function (e, v) {
        var contextmenuTab = v.$parent.$el.querySelector('#' + v.contextMenuId);
        v.openMenu(contextmenuTab, e);
        contextmenuTab.removeEventListener('mouseleave', function (e) {
          v.closeMenu(contextmenuTab);
        });
        contextmenuTab.addEventListener('mouseleave', function (e) {
          v.closeMenu(contextmenuTab);
        });
      },
      openMenu: function (contextmenuTab, e) {
        contextmenuTab.style.left = e.clientX + 'px';
        contextmenuTab.style.top = e.clientY + 'px';
        contextmenuTab.style.display = 'block';
      },
      closeMenu: function (contextmenuTab) {
        contextmenuTab.style.display = 'none';
      },
      /**
       * 外部自定义事件方法
       * @param eventName
       * @param scope
       * @param other
       */
      _$event: function (eventName, scope, params) {
        this.$emit(eventName, scope, params);
      },
      uClick: function (scope) {
        var me = this;
        var pkv = me.uKeyPref + scope.row[me.uKeyField];
        var field = scope.column.property;
        var mPkV = [];
        mPkV.push(pkv);
        var params = {
          condition: JSON.stringify({
            mPkV: mPkV,
            mFieldId: field
          })
        };
        me.dialogVisible_mTrace = true;
        this.$nextTick(function () {
          me.$refs.mTraceList.remoteData(params);
        });
      },
      afterLoaded: function (tableData, callback) {
        var me = this;
        var mPkV = [];
        for (var i = 0; i < tableData.length; i++) {
          var option = me.uKeyPref + tableData[i][me.uKeyField];
          mPkV.push(option);
        }

        // 查询修改痕迹历史
        var params = {
          condition: JSON.stringify({
            mPkV: mPkV
          })
        };
        yufp.service.request({
          url: me.TraceServerName + '/api/utrace/selectSModifyTrace',
          data: params,
          method: 'GET',
          callback: function (code, message, response) {
            if (response.data != null) {
              for (var k = 0; k < tableData.length; k++) {
                var field = [];
                var message = [];
                var pk = tableData[k][me.uKeyField];
                for (var j = 0; j < response.data.length; j++) {
                  var mpk = response.data[j].mPkV;
                  mpk = mpk.replace(me.uKeyPref, '');
                  if (pk == mpk) {
                    if (field.indexOf(response.data[j].mFieldId) < 0) {
                      field.push(response.data[j].mFieldId);
                      var msg = response.data[j].mDatetime + ': 被用户' + response.data[j].usrId + '从[' +
                        response.data[j].mOldDispV + ']修改为[' + response.data[j].mNewDispV + ']';
                      message.push(msg);
                    }
                  }
                }
                tableData[k]['flag'] = field;
                tableData[k].message = message;
              }
            }
            typeof callback == 'function' ? callback.call(me, tableData) : '';
          }
        });
      }
    },
    watch: {
      tableColumns: function () {
        this.tableKey++;
      },
      dataUrl: function () {
        var _this = this;
        if (_this.page != 1) {
          _this.page = 1;
          _this.repeatTrigger = true;
        }
        _this.privateRemoteData();
      }
    },
    created: function () {
      var renderFormatter = function (tableColumns) {
        var formatterFn = function (dataCode, fn) {
          return function (row, column) {
            var val = yufp.lookup.convertKey(dataCode, row[column.property]);
            return yufp.type(fn) == 'function' ? fn(row, column, val) : val;
          };
        };
        if (tableColumns) {
          for (var i = 0, len = tableColumns.length; i < len; i++) {
            var tc = tableColumns[i];
            if (tc.dataCode) {
              tc.formatter = formatterFn(tc.dataCode, tc.formatter);
            }
          }
        }
      };
      var renderXtemplate = function (tableColumns) {
        if (!tableColumns) {
          return '<div class="el-table-x"></div>';
        }
        var props = ['type', 'column-key', 'label', 'prop', 'width', 'hidden',

          'min-width', 'fixed', 'render-header', 'sortable', 'sort-method',
          'resizable', 'formatter', 'show-overflow-tooltip', 'align', 'header-align',
          'class-name', 'label-class-name', 'selectable', 'reserve-selection', 'filters',
          'filter-placement', 'filter-multiple', 'filter-method', 'filtered-value'];
        var joinProp = function (varPrefix, tc, flag) {
          var str = '';
          varPrefix += '.';
          for (var i = 0, len = props.length; i < len; i++) {
            var key = props[i];
            var value = key.replace(/\-(\w)/g, function (all, letter) {
              return letter.toUpperCase();
            });
            if (tc.hasOwnProperty(value)) { // 此代码影响排序prop获取
              if (value != 'hidden') {
                str += ' :' + key + '="' + varPrefix + value + '"';
              } else {
                str += ' v-if="!' + varPrefix + value + '"';
              }
            }
          }
          return str;
        };
        var menuTpl = '<div class="yu-gridContextMenu" :id="contextMenuId" >';
        for (var i = 0; i < tableColumns.length; i++) {
          var hidden = tableColumns[i].label;
          if (!tableColumns[i].children) {
            menuTpl += '<el-checkbox @change="headerContextChange" :checked=!' + tableColumns[i].hidden + ' labels="' + tableColumns[i].label + '">' + hidden + '</el-checkbox>';
          }
          // 二级表头
          if (tableColumns[i].children) {
            for (var j = 0; j < tableColumns[i].children.length; j++) {
              menuTpl += '<el-checkbox @change="headerContextChange" :checked=!' + tableColumns[i].hidden + ' labels="' + tableColumns[i].children[j].label + '">' + tableColumns[i].children[j].label + '</el-checkbox>';
            }
          }
        }
        menuTpl += '</div>';
        var prefixTpl = '<div class="el-table-x">';
        prefixTpl += '<el-table  :key="tableKey" :data="data" :height="pageable?(height-48):height" :max-height="pageable?(maxHeight-48):maxHeight" :fit="fit"\
                    :stripe="stripe" :border="border" :row-key="rowKey" :show-header="showHeader"\
                    :show-summary="showSummary" :sum-text="sumText" :summary-method="summaryMethod"\
                    :row-class-name="rowClassName" :row-style="rowStyle" :highlight-current-row="checkbox?false:highlightCurrentRow"\
                    :current-row-key="currentRowKey" :empty-text="emptyText" :expand-row-keys="expandRowKeys"\
                    :default-expand-all="defaultExpandAll" :default-sort="defaultSort" :tooltip-effect="tooltipEffect"\
                    @select="select" @select-all="selectAll" @selection-change="selectionChange" @cell-dblclick="cellDblclick"\
                    @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick"\
                    @row-click="rowClick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @header-click="headerClick"\
                    @sort-change="sortChange" @current-change="currentChange">';

        if (this.rowIndex) {
          prefixTpl += '<el-table-column type="index" width="65"></el-table-column>';
        }
        if (this.checkbox) {
          prefixTpl += '<el-table-column type="selection" width="65"></el-table-column>';
        } else if (this.radiobox) {
          prefixTpl += '<el-table-column type="index" width="52">\
                        <templates scope="scope">\
                          <el-radio v-model="radio" :label="scope.row.$index = scope.$index">&nbsp;</el-radio>\
                        </templates>\
                      </el-table-column>';
        }
        var suffixTpl = '</el-table>';
        suffixTpl += menuTpl;
        suffixTpl += '<el-pagination v-show="pageable" :total="total" :current-page.sync="page" :page-size="size"\
                    @size-change="sizeChangeFn" @current-change="pageChangeFn"\
                    layout="total, sizes, prev, pager, next, jumper">\
                  </el-pagination>\
                  <el-dialog-x title="修改痕迹信息" :visible.sync="dialogVisible_mTrace" height="360px" width="700px">\
                      <el-table-x ref="mTraceList" :data-url="urls.mTraceListUrl" :base-params="mTraceParams" :default-load="false" :table-columns="mTraceTableColumns" >\
                      </el-table-x>\
                      <div slot="footer" align="center">\
                        <el-button type="primary" @click="dialogVisible_mTrace=false">关闭</el-button>\
                      </div>\
                  </el-dialog-x>\
                  </div>';
        // 循环一级表头
        var middleTpl = '';
        for (var i = 0, ilen = tableColumns.length; i < ilen; i++) {
          var tc = tableColumns[i], flag = yufp.type(tc.template) == 'function';
          middleTpl += '<el-table-column ';
          middleTpl += joinProp('tableColumns[' + i + ']', tc, flag);
          // middleTpl += '>';
          middleTpl += '><templates scope="scope">';
          if (flag) {
            middleTpl += tc.template();
          } else {
            middleTpl += '{{ scope.row.' + tc.prop + '}}';
          }
          middleTpl += ' <a v-if="typeof scope.row.flag == \'object\' && scope.row.flag.indexOf(\'' + tc.prop + '\') !=-1" style="cursor:pointer;" @click="uClick(scope)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-tag :title="scope.row.message[scope.row.flag.indexOf(\'' + tc.prop + '\')]">U</el-tag></a>';
          middleTpl += ' </templates>';
          // middleTpl += flag ? tc.templates() : '';
          if (tc.children) {
            // 循环二级表头
            for (var j = 0, jlen = tc.children.length; j < jlen; j++) {
              var tc1 = tc.children[j], flag1 = yufp.type(tc1.template) == 'function';
              middleTpl += '<el-table-column ';
              middleTpl += joinProp('tableColumns[' + i + '].children[' + j + ']', tc1, flag1);
              // middleTpl += '>';
              middleTpl += '><templates scope="scope">';
              if (flag1) {
                middleTpl += tc1.template();
              } else {
                middleTpl += '{{ scope.row.' + tc1.prop + '}}';
              }
              middleTpl += ' <a v-if="typeof scope.row.flag == \'object\' && scope.row.flag.indexOf(\'' + tc1.prop + '\') !=-1" style="cursor:pointer;" @click="uClick(scope)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-tag :title="scope.row.message[scope.row.flag.indexOf(\'' + tc1.prop + '\')]">U</el-tag></a>';
              middleTpl += ' </templates>';
              // middleTpl += flag1 ? tc1.templates() : '';
              if (tc1.children) {
                // 循环三级表头
                for (var k = 0, klen = tc1.children.length; k < klen; k++) {
                  var tc2 = tc1.children[k], flag2 = yufp.type(tc2.template) == 'function';
                  middleTpl += '<el-table-column ';
                  middleTpl += joinProp('tableColumns[' + i + '].children[' + j + '].children[' + k + ']', tc2, flag2);
                  // middleTpl += '>';
                  middleTpl += '><templates scope="scope">';
                  if (flag2) {
                    middleTpl += tc2.template();
                  } else {
                    middleTpl += '{{ scope.row.' + tc2.prop + '}}';
                  }
                  middleTpl += ' <a v-if="typeof scope.row.flag == \'object\' && scope.row.flag.indexOf(\'' + tc2.prop + '\') !=-1" style="cursor:pointer;" @click="uClick(scope)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-tag :title="scope.row.message[scope.row.flag.indexOf(\'' + tc2.prop + '\')]">U</el-tag></a>';
                  middleTpl += ' </templates>';
                  // middleTpl += flag2 ? tc2.templates() : '';
                  middleTpl += '</el-table-column>';
                }
              }
              middleTpl += '</el-table-column>';
            }
          }
          middleTpl += '</el-table-column>';
        }
        return prefixTpl + middleTpl + suffixTpl;
      };
      // 初始化是否显示
      var tableColumns = this.$options.propsData.tableColumns;
      for (var i = 0; i < tableColumns.length; i++) {
        if (!tableColumns[i].hidden) {
          tableColumns[i].hidden = false;
        }
        // 初始化二级
        if (tableColumns[i].children) {
          for (var j = 0; j < tableColumns[i].children.length; j++) {
            if (!tableColumns[i].children[j].hidden) {
              tableColumns[i].children[j].hidden = false;
            }
          }
        }
      }
      renderFormatter.call(this, tableColumns);
      this.$options.template = renderXtemplate.call(this, tableColumns);
      this.$options.filters = this.$options.propsData.tableFilters;
    },
    updated: function () {
      var _this = this;
      if (_this.hideColumn) {
        var thead = this.$el.querySelector('.el-table__header-wrapper');
        thead.removeEventListener('contextmenu', function (e) {
          e.preventDefault();
          _this.contextMenuFun(e, _this);
        }),
        thead.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          _this.contextMenuFun(e, _this);
        });
      }
    },
    mounted: function () {
      if (this.defaultLoad) {
        this.privateRemoteData();
      }
    }

  });
}(Vue, yufp.$, 'el-table-x-u'));
