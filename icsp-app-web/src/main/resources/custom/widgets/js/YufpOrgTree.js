/**
 * 机构树选择器yufp-org-tree
 * @param treeurl-树的url :/yusp_lp/api/util/getOrg?needFin=true&needManage=true&needDpt=true
 * @param needCheckbox(是否支持复选)-default:false
 * @param dataRoot(根节点)
 * @disabled 是否禁用输入框
 * @authors lupan
 * @date    2017-12-25 21:20:41
 * @version $1.0$
 */
(function (vue, $, name) {
  // 注册机构树组件
  vue.component(name, {
    template: '<el-popover v-model="visiable" :width="width" :visible-arrow="false"\
            popper-class="org-popover" trigger="click">\
            <el-tree-x ref="orgTree" :show-checkbox="needCheckbox" :height="height" :expand-level="expandLevel"\
            :root-visible="rootVisible" :checkStrictly="checkStrictly" :defaultExpandAll="defaultExpandAll"\
            :data-url="dataUrl" :data-id="dataId" :data-label="dataLabel" :data-params="dataParams"\
            :data-pid="dataPid" :data-root="dataRoot" @node-click="nodeClick" @get-tree-datas="getTreeData">\
            </el-tree-x>\
            <div style="float: right" v-if="needCheckbox">\
            <el-button @click="clearFn" size="small">取 消</el-button>\
            <el-button type="primary" @click="confirmFn" size="small">确 定</el-button>\
            </div>\
            <el-input  ref="orgTreeInput" v-model="selectedVal" readonly :placeholder="placeholder" :disabled="disabled"\
            :size="size" name="机构" slot="reference" :on-icon-click="onIconClickFn"></el-input>\
            </el-popover>',
    props: {
      // 输入框属性
      disabled: Boolean,
      size: String,
      rawValue: String,
      value: {
        required: true
      },
      params: Object
    },
    data: function () {
      return this.createData();
    },
    // 挂载后
    mounted: function () {
      this.updateWidth();
    },
    methods: {
      updateWidth: function () {
        if (this.$refs.orgTreeInput != null && this.$refs.orgTreeInput != undefined) {
          this.width = this.$refs.orgTreeInput.$el.scrollWidth;
        }
      },
      onIconClickFn: function () {
        if (this.disabled) {
          return;
        }
        if (!this.needCheckbox) {
          this.$refs.orgTree.setCheckedKeys(this.tempNodekeys);
        }
        this.visiable = true;
      },
      getTreeData: function (data) {
        this.tempTreeData = data;
      },
      nodeClick: function (nodeData, node, self) {
        var _this = this;
        if (!this.needCheckbox) {
          this.$emit('input', nodeData.id);
          this.$emit('select-fn', nodeData);
          this.$nextTick(function () {
            _this.selectedVal = nodeData.label;
          });
          this.visiable = false;
        }
      },
      clearFn: function () {
        this.visiable = false;
      },
      // 清除查询参数,当修改url的时候调用
      clearSearchParams: function () {
        this.dataParams = {};
      },
      // 重置查询参数为默认
      resetDataParams: function () {
        this.dataParams = {
          userId: yufp.session.userId,
          orgCode: yufp.session.org.code,
          needFin: false,
          needManage: false,
          needDpt: false,
          orgLevel: ''
        };
      },
      confirmFn: function () {
        var _this = this;
        var da = this.$refs.orgTree.getCheckedKeys();
        if (da == null || da.length == 0) {
          _this.$message('请至少选择一条数据!', '提示');
          return;
        }
        var tt = this.$refs.orgTree.getCheckedNodes();
        this.$emit('input', this.getLabelString(tt, 'id'));
        this.$emit('select-fn', tt);
        this.tempNodekeys = da.concat();
        this.$nextTick(function () {
          _this.selectedVal = _this.getLabelString(tt, 'label');
        });
        this.visiable = false;
      },
      getValueByKey: function (array, k) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].id == k) {
            return array[i].label;
          }
        }
      },
      getLabelString: function (array, label) {
        var ss = '';
        for (var i = 0; i < array.length; i++) {
          if (i == 0) {
            ss += array[i][label];
          } else {
            ss += ',' + array[i][label];
          }
        }
        return ss;
      },
      refreshData: function () {
        this.$refs.orgTree.remoteData();
      },
      // 对外提供选择器显示值
      getRawValue: function () {
        return this.selectedVal;
      },
      createData: function () {
        var _this = this;
        var temp = _this.getDefaultData();
        // 深度拷贝
        yufp.extend(true, temp, _this.params);
        return temp;
      },
      getDefaultData: function () {
        return {
          // 展示参数
          selectedVal: '',
          placeholder: '请选择机构',
          width: 200,
          height: 300,
          visiable: false,
          rootVisible: true, // 根节点可见性
          needCheckbox: false,
          checkStrictly: false,
          expandLevel: 2, // 默认展开层级
          defaultExpandAll: false,
          // 节点参数属性
          dataId: 'orgId',
          dataLabel: 'orgName',
          dataPid: 'upOrgId',
          dataRoot: '000000',
          // 数据参数
          dataParams: {
            userId: yufp.session.userId,
            orgCode: yufp.session.org.code,
            instuId: 'eb8d6baa57264ad3b071940a4d9a1b87',
            needFin: false,
            needManage: false,
            needDpt: false,
            orgLevel: ''
          },
          searchType: 'CUR_ORG', // 所辖或者当前""
          tempNodekeys: [],
          tempTreeData: [],
          dataUrl: backend.appOcaService + '/adminSmOrg/tree'
        };
      }
    },
    watch: {
      value: function (val) {
        if (this.tempTreeData != null && this.tempTreeData.length > 0) {
          this.selectedVal = this.getValueByKey(this.tempTreeData, val);
        }
      },
      rawValue: function (val) {
        this.selectedVal = val;
      },
      tempTreeData: function (val) {
        this.selectedVal = this.getValueByKey(val, this.value);
      },
      params: function (val) {
        var _this = this;
        var temp = _this.createData();
        yufp.extend(true, _this, val);
        _this.dataParams = temp.dataParams;
        this.updateWidth();
      }
    }
  });
}(Vue, yufp.$, 'yufp-org-tree'));