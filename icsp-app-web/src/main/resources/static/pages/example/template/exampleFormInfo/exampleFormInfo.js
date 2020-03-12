/**
 * @created by
 * @updated by taoting1 2018-8-16 修改代码规范
 * @description 模板示例——普通表单（详情）
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('NATIONALITY,YESNO');
    // 模拟表单数据
    var formData = {
      title: '关于近期作息时间调整的通知公告',
      type: 'CN',
      status: 'draft',
      author: '张三',
      telNumber: '13800138000',
      time: '2017-12-18T22:13:56.109Z',
      tags: [
        '欧元区',
        '中国'
      ],
      isTop: '否',
      remark: '作息时间表，是指某单位内具体标明各项日常活动开展的时间表。是单位内每个人员执行日常工作的时间标准。' +
        '一日三餐是人在漫长的岁月中形成的适应人体肠胃环境及生理功能的生理节律。定时进餐可以维持血液中营养物质的稳定，' +
        '保证人体的正常活动，一般来讲，每餐之间间隔4～5小时是根据食物在人体胃中停留的时间决定的。'
    };
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          editFields: [{
            columnCount: 2,
            fields: [
              { field: 'title', label: '信息标题', placeholder: '5到25个字符', type: 'input' },
              { field: 'type', label: '类型', type: 'select', dataCode: 'NATIONALITY' },
              { field: 'status', label: '状态', type: 'select', dataCode: 'PUBLISH_STATUS' },
              { field: 'author', label: '作者', type: 'input', placeholder: ' 编辑人姓名' },
              { field: 'telNumber', label: '联系电话', type: 'input', placeholder: ' 编辑人联系电话' },
              { field: 'time', label: '发布时间', type: 'datetime', placeholder: '设置自动发布时间' },
              {
                field: 'tags',
                label: '所属标签',
                type: 'checkbox',
                dataCode: 'NATIONALITY',
                change: function (val) {
                  // TODO
                }
              },
              { field: 'isTop', label: '是否置顶', type: 'radio', dataCode: 'YESNO' }
            ]
          }, {
            columnCount: 1,
            fields: [
              { field: 'remark', label: '内容', placeholder: '2000个字符以内', type: 'textarea', rows: 6 }
            ]
          }],
          buttons: [
            {
              label: '取消',
              type: 'primary',
              icon: 'yx-undo2',
              click: function () {
                // TODO
              }
            }
          ]
        };
      },
      mounted: function () {
        // 模拟初始化表单数据绑定
        this.$refs.formRef.formModel = yufp.clone(formData, {});
      },
      methods: {
        // TODO
      }
    });
  };
});