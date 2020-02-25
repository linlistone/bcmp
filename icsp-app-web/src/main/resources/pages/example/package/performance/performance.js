/**
 * @create by helin3 on 2018-05-18
 * @description 模拟真实功能-性能验证页面
 */
define(function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('IF_FLAG');
    yufp.custom.vue({
      el: cite.el,
      data: {
        height: yufp.frame.size().height,
        activeTab: '1',
        dkxxFields: [{
          columnCount: 4,
          fields: [
            { field: 'cpmc', label: '产品名称' },
            { field: 'sqje', label: '申请金额' },
            { field: 'dkcs', label: '贷款成数' },
            { field: 'dkqx', label: '贷款期限' },
            { field: 'dbfs', label: '担保方式', type: 'select', dataCode: 'YESNO' },
            { field: 'dkyt', label: '贷款用途', type: 'select', dataCode: 'YESNO' },
            { field: 'hkfs', label: '还款方式', type: 'select', dataCode: 'YESNO' },
            { field: 'hkzq', label: '还款周期', type: 'select', dataCode: 'YESNO' },
            { field: 'mqhkr', label: '每期还款日', type: 'select', dataCode: 'YESNO' },
            { field: 'jzll', label: '基准利率' },
            { field: 'llfdb', label: '利率浮动比' },
            { field: 'llms', label: '利率模式', type: 'select', dataCode: 'YESNO' },
            { field: 'lltzpl', label: '利率调整频率', type: 'select', dataCode: 'YESNO' },
            { field: 'fxllfdb', label: '罚息利率浮动幅度' },
            { field: 'llfdfs', label: '利率浮动方式', type: 'select', dataCode: 'YESNO' },
            { field: 'sfzdt', label: '是否租贷通', type: 'radio', dataCode: 'YESNO' },
            { field: 'sflyx', label: '是否履约险', type: 'radio', dataCode: 'YESNO' },
            { field: 'lxyfy', label: '履约险费用', type: 'select', dataCode: 'YESNO' },
            { field: 'cpfa', label: '产品方案', type: 'select', dataCode: 'YESNO' },
            { field: 'gpsfa', label: 'GPS方案', type: 'select', dataCode: 'YESNO' },
            { field: 'spje', label: '审批金额' },
            { field: 'zxll', label: '执行利率' },
            { field: 'spqx', label: '审批期限' },
            { field: 'dkje', label: '贷款金额' }
          ]
        }],
        dfzfTableData: [
          {lsh: '103970', cpmc: 'ND贷管家', spje: '9,600', zxll: '15.45%', spqx: '12', dkcs: '4.80%', ztmc: '中国太平洋财产...', zt: '生效', dkzt: ''}
        ],
        clxxFields: [{
          columnCount: 2,
          fields: [
            { field: 'clxh', label: '车辆型号' },
            { field: 'zdycx', label: '自定义车型' },
            { field: 'spdyr', label: '上牌抵押人' }
          ]
        }, {
          columnCount: 4,
          fields: [
            { field: 'clxh', label: '申请时车价' },
            { field: 'zdycx', label: '牌照类型' },
            { field: 'spdyr', label: '车辆指导价' },
            { field: 'spdyr', label: '车辆品牌' },
            { field: 'spdyr', label: '所属车厂' },
            { field: 'spdyr', label: '车牌号' },
            { field: 'spdyr', label: '改动机号' },
            { field: 'spdyr', label: '与指导价对比（%）' },
            { field: 'spdyr', label: '车辆排量' },
            { field: 'spdyr', label: '汽缸容积' },
            { field: 'spdyr', label: '功率' },
            { field: 'spdyr', label: '已付购车款' },
            { field: 'spdyr', label: '车辆颜色' },
            { field: 'spdyr', label: '车辆长宽高' },
            { field: 'spdyr', label: '轴距' },
            { field: 'spdyr', label: '前轮胎规格' },
            { field: 'spdyr', label: '前轮股规格' },
            { field: 'spdyr', label: '后轮胎规格' },
            { field: 'spdyr', label: '后轮股规格' }
          ]
        }],
        xsqdFields: [{
          columnCount: 3,
          fields: [
            { field: 'qdlylx', label: '渠道来源类型', type: 'select', dataCode: 'YESNO' },
            { field: 'zt', label: '展厅', type: 'select', dataCode: 'YESNO' },
            { field: 'ztlx', label: '展厅类型/层级', type: 'select', dataCode: 'YESNO' },
            { field: 'sfzks', label: '是否置客式', type: 'select', dataCode: 'YESNO' },
            { field: 'jxs', label: '经销商' },
            { field: 'jxsjb', label: '经销商级别', type: 'select', dataCode: 'YESNO' },
            { field: 'zffs', label: '支付方式', type: 'select', dataCode: 'YESNO' },
            { field: 'fkzhhm', label: '放款账号户名' },
            { field: 'fkzh', label: '放款账号' },
            { field: 'qdjl', label: '渠道经理' },
            { field: 'qdjlsjh', label: '渠道经理手机号' },
            { field: 'ssjg', label: '所属机构' },
            { field: 'jbr', label: '经办人' },
            { field: 'jsxxsry', label: '经销商销售人员' },
            { field: 'jsxzg', label: '经销商主管' }
          ]
        }, {
          columnCount: 1,
          fields: [
            { field: 'bz1', label: '备注1', type: 'textarea' },
            { field: 'bz2', label: '备注2', type: 'textarea' }
          ]
        }],
        qtFields: [{
          columnCount: 3,
          fields: [
            { field: 'qdlylx', label: '渠道来源类型', type: 'select', dataCode: 'YESNO' },
            { field: 'zt', label: '展厅', type: 'select', dataCode: 'YESNO' },
            { field: 'ztlx', label: '展厅类型/层级', type: 'select', dataCode: 'YESNO' },
            { field: 'sfzks', label: '是否置客式', type: 'select', dataCode: 'YESNO' },
            { field: 'jxs', label: '经销商' },
            { field: 'jxsjb', label: '经销商级别', type: 'select', dataCode: 'YESNO' },
            { field: 'zffs', label: '支付方式', type: 'select', dataCode: 'YESNO' },
            { field: 'fkzhhm', label: '放款账号户名' },
            { field: 'fkzh', label: '放款账号' },
            { field: 'qdjl', label: '渠道经理' },
            { field: 'qdjlsjh', label: '渠道经理手机号' },
            { field: 'ssjg', label: '所属机构' },
            { field: 'jbr', label: '经办人' },
            { field: 'jsxxsry', label: '经销商销售人员' },
            { field: 'jsxzg', label: '经销商主管' }
          ]
        }, {
          columnCount: 1,
          fields: [
            { field: 'bz1', label: '备注1', type: 'textarea' },
            { field: 'bz2', label: '备注2', type: 'textarea' }
          ]
        }],
        spxx: {
          sqbh: 'BA2018051814474809101',
          ssfb: '嘉兴分部',
          zdrxm: '张版图',
          sqrq: '2018-05-18'
        },
        spjg: {
          zzdkzje: '180,000.00',
          zzdkzcs: '54.8%',

          zdkcp: '鑫鑫车添利',
          zdkspje: '12,000.00',
          zdkspqx: '24',
          zdksplx: '15.45%',
          zdkcs: '66.66%',

          sdkcp: 'ND贷管家',
          sdkspje: '6,000.00',
          sdkspqx: '12',
          sdksplx: '15.45',
          sdkcs: '33.33%'
        },
        shxqFields: [{
          columnCount: 3,
          fields: [
            { field: 'ysr', label: '月收入', value: '10,000.00' },
            { field: 'yfz', label: '月负债' },
            { field: 'dti', label: 'DTI' },
            { field: 'khlx', label: '客户类型', type: 'select', dataCode: 'YESNO' },
            { field: 'hj', label: '户籍', type: 'select', dataCode: 'YESNO' },
            { field: 'bdcz', label: '本地常驻', type: 'select', dataCode: 'YESNO' },
            { field: 'cycl', label: '原有车辆' },
            { field: 'fyzx', label: '法院执行', type: 'select', dataCode: 'YESNO' },
            { field: 'sxjl', label: '失信记录', type: 'select', dataCode: 'YESNO' },
            { field: 'cdk', label: '常贷客' }
          ]
        }, {
          columnCount: 1,
          fields: [
            { field: 'wlsx', label: '违例事项' },
            { field: 'dtnr', label: '电调内容', type: 'textarea' },
            { field: 'spyj', label: '审批意见', type: 'textarea' },
            { field: 'jpjl', label: '审批结论', type: 'textarea' },
            { field: 'bz', label: '备注', type: 'textarea' }
          ]
        }]
      },
      methods: {
        handleTabClick: function (tab) {

        }
      }
    });
  };
});