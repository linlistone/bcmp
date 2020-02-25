/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——分组表单
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('GENDER,EDUCATION_TYPE,IDENT_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          expandCollapseName: ['base'],
          // 未分组表单数据格式
          baseFields: [{
            columnCount: 2,
            fields: [
              { field: 'name', label: '姓名' },
              { field: 'gender', label: '性别', type: 'select', dataCode: 'GENDER' },
              { field: 'education', label: '学历', type: 'select', dataCode: 'EDUCATION_TYPE' },
              { field: 'cardType', label: '证件类型', type: 'select', dataCode: 'IDENT_TYPE' },
              { field: 'barthday', label: '出生日期', type: 'date' },
              { field: 'cardNo', label: '证件号码' },
              { field: 'company', label: '公司' },
              { field: 'email', label: '邮箱' }
            ]
          }],
          familyFields: [{
            columnCount: 2,
            fields: [
              {
                field: 'peopleNum',
                label: '成员数',
                rules: [
                  { required: true, message: '必填项', trigger: 'blur' },
                  { validator: yufp.validator.number }
                ]
              },
              { field: 'home', label: '房屋情况' },
              { field: 'address', label: '家庭地址' },
              { field: 'postcode', label: '邮政编码' }
            ]
          }],
          otherFields: [{
            columnCount: 1,
            fields: [
              { field: 'desc', label: '备注', type: 'textarea' }
            ]
          }],
          baseRules: {
            name: [
              { required: true, message: '必填项', trigger: 'blur' }
            ],
            gender: [
              { required: true, message: '必填项', trigger: 'change' }
            ],
            education: [
              { required: true, message: '必填项', trigger: 'change' }
            ],
            email: [
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ],
            barthday: [
              { type: 'date', required: true, message: '必填项', trigger: 'change' }
            ],
            cardType: [
              { required: true, message: '必填项', trigger: 'change' }
            ]
          }
        };
      },
      methods: {
        /**
         * 提交表单信息
         */
        submitForm: function () {
          var _this = this;
          var base = _this.$refs.baseRef, family = _this.$refs.familyRef, other = _this.$refs.otherRef;
          var baseFlag = true;
          var familyFlag = true;
          var otherFlag = true;
          base.validate(function (valid) {
            baseFlag = valid;
          });
          family.validate(function (valid) {
            familyFlag = valid;
          });
          other.validate(function (valid) {
            otherFlag = valid;
          });
          if (baseFlag && familyFlag && otherFlag) {
            var comitData = {};
            comitData = yufp.clone(base.formModel, {});
            comitData = yufp.clone(family.formModel, {});
            comitData = yufp.clone(other.formModel, {});
            this.$msgbox.alert(comitData, '提示');
          }
        },
        /**
         * 重置所有表单内容
         */
        resetForm: function () {
          this.$refs.baseRef.resetFields();
          this.$refs.familyRef.resetFields();
          this.$refs.otherRef.resetFields();
        }
      }
    });
  };
});