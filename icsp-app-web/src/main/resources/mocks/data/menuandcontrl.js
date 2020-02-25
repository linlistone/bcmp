/**
 * @created by helin3 2017-11-30
 * @updated by
 * @description 菜单、控制点、数据权限模拟数据
 */

/**
 * 模拟菜单数据
 * @type
 */
window.demoMenus = [
  // 一级菜单
  { menuId: 'gm-10000', menuName: '首页', upMenuId: '0', menuIcon: 'el-icon-yx-home', funcId: 'dashboard', funcUrl: 'pages/common/dashboard/dashboard', isIndex: true },
  { menuId: 'gm-20000', menuName: '基础教程', upMenuId: '0', menuIcon: 'el-icon-yx-books' },

  // 二级菜单
  { menuId: 'gm-21000', menuName: '空白模板', upMenuId: 'gm-20000', menuIcon: '', funcId: 'blank', funcUrl: 'pages/example/blank/blank' },
  { menuId: 'gm-22000', menuName: '常用组件', upMenuId: 'gm-20000', menuIcon: 'el-icon-yx-stack' },
  { menuId: 'gm-23000', menuName: '模板示例', upMenuId: 'gm-20000', menuIcon: 'el-icon-yx-folder-plus' },
  { menuId: 'gm-24000', menuName: '原生(不建议)', upMenuId: 'gm-20000', menuIcon: 'el-icon-yx-price-tag' },

  // 三级菜单
  { menuId: 'gm-22001', menuName: '封装字典管理器', upMenuId: 'gm-22000', menuIcon: '', funcId: 'lookup', funcUrl: 'pages/example/package/lookup/lookup'},
  { menuId: 'gm-22002', menuName: '封装树', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elTreeX', funcUrl: 'pages/example/package/elTreeX/elTreeX' },
  { menuId: 'gm-22003', menuName: '封装表格', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elTableX', funcUrl: 'pages/example/package/elTableX/elTableX' },
  { menuId: 'gm-22004', menuName: '封装表格-文档', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elTableXDoc', funcUrl: 'pages/example/package/elTableXDoc/elTableXDoc' },
  { menuId: 'gm-22005', menuName: '自定义选择器', upMenuId: 'gm-22000', menuIcon: '', funcId: 'demoSelector', funcUrl: 'pages/example/package/demoSelector/demoSelector' },
  { menuId: 'gm-22006', menuName: '封装下拉框', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elSelect', funcUrl: 'pages/example/package/elSelect/elSelect' },
  { menuId: 'gm-22007', menuName: '封装级联下拉框', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elCascader', funcUrl: 'pages/example/package/elCascader/elCascader' },
  { menuId: 'gm-22008', menuName: '封装下拉树框', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elComboTree', funcUrl: 'pages/example/package/elComboTree/elComboTree' },
  { menuId: 'gm-22009', menuName: '封装下拉表格框', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elComboTable', funcUrl: 'pages/example/package/elComboTable/elComboTable' },
  { menuId: 'gm-22010', menuName: '富文本组件', upMenuId: 'gm-22000', menuIcon: '', funcId: 'tinymce', funcUrl: 'pages/example/native/tinymce/tinymce' },
  // { menuId: 'gm-22009', menuName: 'FormInput输入框', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elforminput', funcUrl: 'pages/example/package/elforminput/elforminput'},
  // { menuId: 'gm-22010', menuName: '日期、时间选择器', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elformtimeselect', funcUrl: 'pages/example/package/elformtimeselect/elformtimeselect'},
  { menuId: 'gm-22011', menuName: 'Form组件', upMenuId: 'gm-22000', menuIcon: '', funcId: 'elformx', funcUrl: 'pages/example/package/elformx/elformx' },
  { menuId: 'gm-22012', menuName: '拖拽', upMenuId: 'gm-22000', menuIcon: '', funcId: 'exampleDraggable', funcUrl: 'pages/example/templates/exampleDraggable/exampleDraggable' },
  { menuId: 'gm-22020', menuName: '拖拽填表单', upMenuId: 'gm-22000', menuIcon: '', funcId: 'dragForm', funcUrl: 'pages/example/package/dragForm/dragForm' },
  { menuId: 'gm-22013', menuName: '普通文件上传', upMenuId: 'gm-22000', menuIcon: '', funcId: 'normalUpload', funcUrl: 'pages/example/native/normalUpload/normalUpload' },
  { menuId: 'gm-22014', menuName: '异步树', upMenuId: 'gm-22000', menuIcon: '', funcId: 'asynctree', funcUrl: 'pages/example/templates/exampleTree/exampleTree' },
  { menuId: 'gm-22015', menuName: '打开（菜单/自定义）页签', upMenuId: 'gm-22000', menuIcon: '', funcId: 'demoAddMenuTab', funcUrl: 'pages/example/package/demoAddMenuTab/demoAddMenuTab' },
  { menuId: 'gm-22016', menuName: '图标Icons', upMenuId: 'gm-22000', menuIcon: '', funcId: 'icons', funcUrl: 'pages/example/package/icons/icons' },
  { menuId: 'gm-22017', menuName: '文件上传附带MD5', upMenuId: 'gm-22000', menuIcon: '', funcId: 'uploadWidthMD5', funcUrl: 'pages/example/native/uploadWidthMD5/uploadWidthMD5' },
  { menuId: 'gm-22018', menuName: '常见图表', upMenuId: 'gm-22000', menuIcon: '', funcId: 'lineBarPie', funcUrl: 'pages/example/native/lineBarPie/lineBarPie' },
  { menuId: 'gm-22019', menuName: 'Echarts图表组件示例', upMenuId: 'gm-22000', menuIcon: '', funcId: 'yuEcharts', funcUrl: 'pages/example/package/demoEcharts/demoEcharts' },
  { menuId: 'gm-22020', menuName: '性能验证', upMenuId: 'gm-22000', menuIcon: '', funcId: 'performance', funcUrl: 'pages/example/package/performance/performance' },
  { menuId: 'gm-22021', menuName: '云图', upMenuId: 'gm-22000', menuIcon: 'el-icon-yx-ungroup', funcId: 'wordcloud', funcUrl: 'pages/example/package/wordcloud/wordcloud' },
  { menuId: 'gm-22022', menuName: 'excel导出', upMenuId: 'gm-22000', menuIcon: '', funcId: 'excelExport', funcUrl: 'pages/example/package/excelExport/excelExport'},
  { menuId: 'gm-22023', menuName: '多语言验证', upMenuId: 'gm-22000', menuIcon: '', funcId: 'exampleLanguage', funcUrl: 'pages/example/package/multiLanguage/multiLanguage' },
  { menuId: 'gm-22024', menuName: '外部网页', upMenuId: 'gm-22000', menuIcon: '', funcId: 'externalPage', funcUrl: 'http://www.baidu.com'},
  { menuId: 'gm-22025', menuName: '思维导图', upMenuId: 'gm-22000', menuIcon: '', funcId: 'mindMap', funcUrl: 'pages/example/package/mindMap/mindMap' },
  { menuId: 'gm-22026', menuName: '图片裁剪', upMenuId: 'gm-22000', menuIcon: 'el-icon-yx-ungroup', funcId: 'xCropper', funcUrl: 'pages/example/package/yufpCropper/yufpCropper' },
  { menuId: 'gm-22027', menuName: '视窗布局', upMenuId: 'gm-22000', menuIcon: 'el-icon-yx-ungroup', funcId: 'xView', funcUrl: 'pages/example/package/yufpView/yufpView' },
  // 三级菜单
  { menuId: 'gm-23100', menuName: '查询类', upMenuId: 'gm-23000', menuIcon: 'el-icon-yx-search' },
  { menuId: 'gm-23200', menuName: '表单类', upMenuId: 'gm-23000', menuIcon: 'el-icon-yx-ungroup' },

  // 四级菜单
  { menuId: 'gm-23101', menuName: '普通查询', upMenuId: 'gm-23100', menuIcon: '', funcId: 'exampleQuery', funcUrl: 'pages/example/templates/exampleQuery/exampleQuery'},
  { menuId: 'gm-23102', menuName: '树+查询', upMenuId: 'gm-23100', menuIcon: '', funcId: 'exampleTree', funcUrl: 'pages/example/templates/exampleTree/exampleTree'},
  { menuId: 'gm-23103', menuName: '查询+表单（编辑）', upMenuId: 'gm-23100', menuIcon: '', funcId: 'exampleEdit', funcUrl: 'pages/example/templates/exampleEdit/exampleEdit'},
  { menuId: 'gm-23104', menuName: '查询+表格（主从表）', upMenuId: 'gm-23100', menuIcon: '', funcId: 'searchTable', funcUrl: 'pages/example/templates/searchTable/searchTable'},
  { menuId: 'gm-23105', menuName: 'Tab页签+查询', upMenuId: 'gm-23100', menuIcon: '', funcId: 'tabsearch', funcUrl: 'pages/example/templates/tabSearch/tabSearch'},
  { menuId: 'gm-23106', menuName: '查询嵌套表格', upMenuId: 'gm-23100', menuIcon: '', funcId: 'queryNestedTable', funcUrl: 'pages/example/templates/queryNestedTable/queryNestedTable'},
  { menuId: 'gm-23107', menuName: '查询嵌套表单', upMenuId: 'gm-23100', menuIcon: '', funcId: 'queryNestedForm', funcUrl: 'pages/example/templates/queryNestedForm/queryNestedForm'},
  { menuId: 'gm-23108', menuName: '高级查询', upMenuId: 'gm-23100', menuIcon: '', funcId: 'exampleMoreQuery', funcUrl: 'pages/example/templates/exampleMoreQuery/exampleMoreQuery'},

  // 四级菜单
  { menuId: 'gm-23201', menuName: '普通表单（编辑）', upMenuId: 'gm-23200', menuIcon: '', funcId: 'exampleForm', funcUrl: 'pages/example/templates/exampleForm/exampleForm'},
  { menuId: 'gm-23202', menuName: '普通表单（详情）', upMenuId: 'gm-23200', menuIcon: '', funcId: 'exampleFormInfo', funcUrl: 'pages/example/templates/exampleFormInfo/exampleFormInfo'},
  { menuId: 'gm-23203', menuName: '分组表单', upMenuId: 'gm-23200', menuIcon: '', funcId: 'exampleGroup', funcUrl: 'pages/example/templates/exampleGroup/exampleGroup'},
  { menuId: 'gm-23204', menuName: '表单+列表', upMenuId: 'gm-23200', menuIcon: '', funcId: 'tableList', funcUrl: 'pages/example/templates/tableList/tableList'},
  { menuId: 'gm-23205', menuName: 'Tab页签表单', upMenuId: 'gm-23200', menuIcon: '', funcId: 'tabform', funcUrl: 'pages/example/templates/tabForm/tabForm'},
  { menuId: 'gm-23206', menuName: '表单内嵌套Tabs', upMenuId: 'gm-23200', menuIcon: '', funcId: 'formNestTabs', funcUrl: 'pages/example/templates/formNestTab/formNestTab'},
  { menuId: 'gm-23207', menuName: 'Steps步骤表单', upMenuId: 'gm-23200', menuIcon: '', funcId: 'exampleSteps1', funcUrl: 'pages/example/templates/exampleSteps1/exampleSteps1'},

  // 三级菜单
  { menuId: 'gm-24101', menuName: '增删改查', upMenuId: 'gm-24000', menuIcon: '', funcId: 'gridCrud', funcUrl: 'pages/example/native/gridCrud/gridCrud' },
  { menuId: 'gm-24102', menuName: '普通多表头', upMenuId: 'gm-24000', menuIcon: '', funcId: 'multiplegrid', funcUrl: 'pages/example/native/multiplegrid/multiplegrid' },
  { menuId: 'gm-24103', menuName: '动态多表头', upMenuId: 'gm-24000', menuIcon: '', funcId: 'dynamicMultipleGrid', funcUrl: 'pages/example/native/dynamicMultipleGrid/dynamicMultipleGrid' },
  { menuId: 'gm-24104', menuName: '可编辑表格', upMenuId: 'gm-24000', menuIcon: '', funcId: 'editorGrid', funcUrl: 'pages/example/native/editorGrid/editorGrid' },
  { menuId: 'gm-24105', menuName: '左树右表格', upMenuId: 'gm-24000', menuIcon: '', funcId: 'treedemo', funcUrl: 'pages/example/native/treedemo/treedemo' },
  { menuId: 'gm-24106', menuName: 'TAB页签', upMenuId: 'gm-24000', menuIcon: '', funcId: 'tab', funcUrl: 'pages/example/native/tab/tab' }

];

/**
* 模拟菜单控制点数据
* @type {Array}
*/
window.demoCtrls = [
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'create', ctrlName: '新增' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'edit', ctrlName: '修改' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'detail', ctrlName: '详情' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'delete', ctrlName: '删除' },
  { menuId: 'gm-23101', funcId: 'exampleQuery', ctrlCode: 'export', ctrlName: '导出' },

  { menuId: 'gm-23102', funcId: 'exampleTree', ctrlCode: 'create', ctrlName: '新增' },
  { menuId: 'gm-23102', funcId: 'exampleTree', ctrlCode: 'edit', ctrlName: '修改' },
  { menuId: 'gm-23102', funcId: 'exampleTree', ctrlCode: 'detail', ctrlName: '详情' }
];

/**
* 模拟数据权限数据
* @type
*/
window.demoDataContr = [
  { authId: '', authTmplId: '', contrId: '', contrInclude: '', contrUrl: '', sqlName: '', sqlString: '', sysId: '' }
];