## 更新日志

### 1.1.0 
*2018-08-30*

- 示例代码格式化规范调整
- 首页改造


### 1.0.0 
*2018-08-29*

- v1.0正式版本
  - 增加页面水印功能


### 0.0.5
*2018-02-02*

- el-table-x组件
  - baseParams参数配置condition引起相关bug。
  - 新增pageKey、sizeKey、conditionKey相关参数，用于不同项目组需传递参数不一致时，兼容处理
  - mychange方法命名不规范，重命名为：headerContextChange
  - 表格单选radio，label值设置及显示（1.4.12），以及行click事件时选中
  - 修复单选radio按钮，重新查询数据时，选中状态仍然持续显示问题
  - 修复表格可能会触发多次查询问题，由此而引起的，翻页后重新输入查询条件无法出结果问题。
- el-form-q组件
  - 修复在一个菜单下，多个子tab页签下按钮只显示图标的bug,现在默认情况会根据当前屏幕自动计算
- 将组件请求类型: GET，更改为可通过参数requestType配置
- 将组件返回数组接口，添加jsonData控制
- el-radio-x/el-checkbox-x，增加option-button属性，默认为false,配置为true时，表示选项以按钮形式展现
- el-form-x、el-form-q，增加el-radio-x,el-checkbox-x配置属性optionButton配置

### 0.0.4
*2018-01-19*

- 修复首页F5刷新时跳转至登录页BUG
- 更新文件上传附带md5值，示例见example下的uploadWidthMD5.html
- e-form-q组件兼容之前的版本，配置buttons属性后，高级查询等功能失效即2018-01-09中更新的功能失效，要使用新功能需去掉buttons属性，并按照要求进行配置详见2018-01-09更新。
- el-dialog-x组件增加默认按钮（取消、确认）
  - 组件添加了need-bar属性配置，默认false，配置为true时，自动在底部增加：取消、确认两个按钮
  - 组件添加了cancel-text/sure-text按钮文本配置，默认分别是：取消、确认
  - 组件添加了cancel-fn 属性配置，类型Function，默认绑定确认按钮事件
  - 若在开启need-bar的同时要添加额外按钮，则在el-dialog-x内部增加
- el-table组件修复
  - table组件支持单选，在标签中配置:radiobox='true'即可生效
  - el-table-x组件提供默认查询参数base-params
- 新增el-tree-x树的懒加载，在标签中新增:lazy-load="true" 表示开启 懒加载，默认为关闭
  - 同时需要改变 data-url为懒加载接口如下：data-url="/example/example/asynctree"
- 修正页签刷新bug（保存路由参数/数据）

### 0.0.3
*2018-01-12*

- 新增高级查询功能
  - 在el-form-q 标签中需要指定查询的表格实例 search-table="reftable"
  - 或者指定回掉方法 @search-click="searchClick",其优先级指定实例>回调方法。
  - 还需要在标签中配置属性more-data，并在js中编写高级查询信息
  - 新增thrift属性，true表示搜索、重置、高级三个按钮只显示图标
  - 新增force-column属性，true表示强制按钮紧随到搜索框后。即从左到右依次排列
  - 新增float-search属性，来定义高级搜索栏出现的样式，true表示浮动样式。
  - 新增reset-button属性，来表示是否有重置按钮
  - 标签中不需要配置查询、重置按钮，现在由search-table代替默认去其实现功能，如果需要自己手动实现搜索功能，则使用@search-click事件来监听搜索按钮（注意：手动实现功能的话则不需要配置search-table）
- 增加表头右键动态隐藏列的功能
  - el-table-x 中配置属性 hide-coloum,true表示打开功能，默认是关闭。
  - 如果要初始化的时候隐藏某一列需要在tableColumns中需要隐藏的列中配置hidden:true,
  - 增加后端排序功能，如果需要开启后端排序则在需要排序的列中配置sortable: 'custom'


### 0.0.2
*2018-01-05*

- 新增首页功能及修复
  - 增加修改密码功能
  - 页签增加双击刷新支持（tabDoubleClickRefresh:true，默认开启）
  - 页签关闭问题修复（首页不可关闭，首页数据需要isIndex:true标识）
- 新增菜单/路由配置动态化
  - 默认从mock模拟数据获取，前端静态开发：mocks/data/menu.js
- 修复el-form-q组件
  - 自定义组件无法正常展现BUG
- 新增yufp.session.js会话信息提取
  - yufp.session.userId,     用户ID
  - yufp.session.userName,   用户姓名
  - yufp.session.userCode,   用户登录码
  - yufp.session.userAvatar, 用户头像
  - yufp.session.org,        机构对象Object
  - yufp.session.dpt,        部门对象Object
  - yufp.session.logicSys,   逻辑系统对象Object
  - yufp.session.instu,      金融机构对象Object
  - yufp.session.upOrg,      父机构对象
  - yufp.session.upDpt       父部门对象
- 修复组件el-tree-x
  - 新增root-visible属性，默认true，表示是否展示根节点
  - 新增orginalData，表示查询原始数据


### 0.0.2
*2017-12-27*

- 新增组件 `el-dialog-x` 弹出框.
  - 默认支持多层嵌套.
  - `el-dialog-x` 支持配置 `width` 属性，默认设置为50%, 可配置百分比、像素，如：'600px', '60%'，都是合法配置.
  - `el-dialog-x` 支持配置 `height` 属性，默认为自适应，可配置百分比、像素，如：'360px', '60%'.
- 新增主题模式.
  - 支持首页模式动态切换
  - 修复内部功能可见区域提供的宽高值计算错误问题
- 新增导出Excel功能
  - 提供前端JS导出当前表格数据、选择行数据为excel功能
  - 提供配置后台导出Excel功能
- 修复组件 `el-table-x` ，封装表格
  - `height` 、 `max-height` 最大高度配置内部计算错误问题
  - 增加 `table-filters` 属性配置，用于列配置template模板时，可添加过滤器，请参考：基础教程/常用组件/封装表格，状态列
- 修复组件 `el-form-x` ，封装表单
  - 修复 `disabled` 属性设置为禁用true后，再次设置为false无效问题
  - 修复表单中配置自定义选择器时，无法传递参数问题，增加字段params参数
- 修复组件 `el-form-q` ，查询表单
  - 修复表单中配置自定义选择器时，无法传递参数问题，增加字段params参数
  - 修复查询字段个数变化时，导致的查询条件显示杂乱问题
  - 增加列配置支持，增加columns属性配置，默认展示4列
- 表格按钮组样式风格调整，简洁，请参考：基础教程/模板示例/普通查询
- 修复custom/main.js中，ElFormX/ElFormQ路径名中大小写配置错误，导致tomcat容器时，无法正常解析URL路径


### 0.0.1 
*2017-12-20*

- YufpWeb alpha版发布
- 基础组件开发
  - 菜单多页签实现.
  - ElementUi集成.
  - MockJs集成.
  - 工程目录结构调整.
