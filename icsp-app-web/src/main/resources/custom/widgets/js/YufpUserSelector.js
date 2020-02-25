/**
 * 机构树选择器yufp-org-tree
 * @param treeUrl-树的url必须
 * @param dataRoot-根节点
 * @param tabCheckbox-表格复选框
 * @param maxHeight-最大高度
 * @param roleId-角色Id
 * @param dutyId-岗位Id
 * @authors lupan
 * @date    2017-12-25 21:20:41
 * @version $1.0$
 */
(function (vue, $, name) {
  // 注册用户组件
  vue.component(name, {
    template: '<div>\
            <el-input :size="size" :icon="icon" :placeholder="placeholder" :disabled="disabled"\
            @focus="dialogVisible = true" :on-icon-click="onIconClickFn" readonly name="用户" v-model="selectedVal"></el-input>\
            <el-dialog-x title="机构用户管理" top="5%" :visible.sync= "dialogVisible" :height="height" :width = "width">\
            <el-row :gutter="20">\
            <el-col :span="5">\
            <el-tree-x ref="orgtree" :show-checbox="false" :check-strictly="org.checkStrictly" :default-expand-all="org.defaultExpandAll"\
            :expand-level="org.expandLevel" :root-visible="org.rootVisible" :height="org.height"\
            :data-url="org.dataUrl" :data-root="org.dataRoot" :data-id="org.dataId" :data-label="org.dataLabel" :data-pid="org.dataPid"\
            :data-params="org.dataParams" @node-click="treeClickFn"></el-tree-x>\
            </el-col>\
            <el-col :span="19">\
            <el-form-q ref="queryCondition" from="query"\
            :fieldData="user.fieldData" :buttons="user.buttons"></el-form-q>\
            <el-table-x ref="usertable" :checkbox="user.checkbox" :max-height="user.maxHeight"\
            :data-url="user.dataUrl" :data-params="user.dataParams" :table-columns="user.tableColumns"></el-table-x>\
            </el-col>\
            </el-row>\
            <div slot="footer" class="dialog-footer"  align="center">\
            <el-button @click="dialogVisible = false">取 消</el-button>\
            <el-button type="primary" @click="confirmFn">确 定</el-button>\
            </div>\
            </el-dialog-x>\
            </div>',
    props: {
      value: {
        required: true
      },
      rawValue: String,
      size: String,
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '请选择用户'
      },
      icon: {
        type: String,
        default: 'search'
      },
      params: Object
    },
    data: function () {
      return this.createData();
    },
    created: function () {
      this.selectedVal = this.rawValue ? this.rawValue : this.value;
    },
    methods: {
      createData: function () {
        var _this = this;
        var temp = _this.getDefaultData();
        yufp.extend(true, temp, _this.params);
        if (temp.user.dataParams.roleId == '') {
          temp.user.fieldData.push({
            placeholder: '角色',
            field: 'roleId',
            type: 'select',
            options: []
          });
          _this.setOptionsByUrl(2, '/trade/example/role');
        }

        if (temp.user.dataParams.dutyId == '') {
          temp.user.fieldData.push({
            placeholder: '岗位',
            field: 'dutyId',
            type: 'select',
            options: []
          });
          _this.setOptionsByUrl(temp.user.fieldData.length - 1, '/trade/example/duty');
        }
        temp.user.dataParams.searchType = temp.org.searchType;
        return temp;
      },
      getDefaultData: function () {
        var _this = this;
        var maxHeight;
        return {
          height: '400px',
          width: '1000px',
          selectedVal: '',
          dialogVisible: false,
          org: {
            rootVisible: true, // 根节点可见性
            // needCheckbox: false,设置为默认单选
            height: 500,
            checkStrictly: false,
            defaultExpandAll: false,
            expandLevel: 2, // 默认展开层级
            dataUrl: '/trade/example/orgtree',
            // 节点参数属性
            dataId: 'orgId',
            dataLabel: 'orgName',
            dataPid: 'upOrgId',
            dataRoot: '500',
            // 数据参数
            dataParams: {
              userId: yufp.session.userId,
              orgCode: yufp.session.org.code,
              needFin: false,
              needManage: false,
              needDpt: false,
              orgLevel: ''
            },
            searchType: 'CUR_ORG'
          },
          user: {
            checkbox: true,
            maxHeight: maxHeight,
            fieldData: [{
              placeholder: '登录代码',
              field: 'loginCode',
              type: 'input'
            }, {
              placeholder: '姓名',
              field: 'userName',
              type: 'input'
            }],
            buttons: [{
              label: '搜索',
              op: 'submit',
              type: 'primary',
              icon: 'search',
              click: function (model, valid) {
                if (valid) {
                  _this.queryFn(model);
                }
              }
            }, {
              label: '重置',
              op: 'reset',
              type: 'primary',
              icon: 'information'
            }],
            dataUrl: '/trade/example/user',
            dataParams: {
              roleId: '',
              dutyId: '',
              orgCode: yufp.session.org.code
            },
            tableColumns: [{
              label: '登陆代码',
              prop: 'loginCode',
              width: '110'
            }, {
              label: '姓名',
              prop: 'userName'
            }, {
              label: '所属机构编号',
              prop: 'orgId'
            }, {
              label: '所属部门编号',
              prop: 'dptId'
            }, {
              label: '所属部门名称',
              prop: 'dptName'
            }]
          }
        };
      },
      setOptionsByUrl: function (order, url) {
        var _this = this;
        yufp.service.request({
          url: url + '?userId=' + yufp.session.userId,
          method: 'get',
          callback: function (code, message, response) {
            if (response != null && response.data != null) {
              _this.user.fieldData[order].options = response.data;
            }
          }
        });
      },
      onIconClickFn: function (val) {
        this.dialogVisible = true;
      },
      queryFn: function (params) {
        var temp = params;
        temp.roleId = temp.roleId == '' || temp.roleId == undefined ? this.user.dataParams.roleId : temp.roleId;
        temp.dutyId = temp.dutyId == '' || temp.dutyId == undefined ? this.user.dataParams.dutyId : temp.dutyId;
        temp.orgCode = temp.orgCode == '' || temp.orgCode == undefined ? this.user.dataParams.orgCode : temp.orgCode;
        this.$refs.usertable.remoteData(temp);
      },
      getCondition: function () {
        return this.$refs.queryCondition.fm;
      },
      treeClickFn: function (nodeData, node, self) {
        var params = this.getCondition();
        params.orgCode = nodeData.id;
        this.queryFn(params);
      },
      currentChangeFn: function (nodeData, node, self) {
        // 仅用于复选框
        if (this.treeCheckbox) {
          var params = this.getCondition();
          var code = this.$refs.orgtree.getCheckedKeys().toString();
          params.orgCode = code;
          this.queryFn(params);
        }
      },
      confirmFn: function () {
        var _this = this;
        var data = this.$refs.usertable.selections;
        if (data.length == 0) {
          this.$message('请至少选择一条数据!', '提示');
          return false;
        }
        if (!this.user.checkbox && data.length > 1) {
          this.$message('你只能选择一条数据!', '提示');
          return;
        }
        this.$emit('input', this.array2String(data, 'loginCode'));
        this.$emit('select-fn', data);
        this.$nextTick(function () {
          _this.selectedVal = _this.array2String(data, 'userName');
        });
        this.dialogVisible = false;
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      array2String: function (array, label) {
        var s = '';
        for (var i = 0; i < array.length; i++) {
          if (i == 0) {
            s += array[i][label];
          } else {
            s += ',' + array[i][label];
          }
        }
        return s;
      }
    },
    watch: {
      value: function (val) {},
      rawValue: function (val) {
        this.selectedVal = val;
      },
      params: function (val) {
        // yufp.extend(true, _this, val);
      }
    }
  });
}(Vue, yufp.$, 'yufp-user-selector'));