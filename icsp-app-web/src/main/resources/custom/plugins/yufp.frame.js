/**
 * 首页&框架公共管理
 * created by liujie 2018-9-04
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.frame = exports;
}(yufp, window, function (yufp, window, document) {
  /**
     * 框架管理（页签、公共设置）
     * @constructor
     */
  function Frame () {
    var _options = {
      // 基础页签属性
      baseTabOptions: {
        // 页签位置显示，支持 top 和 bottom
        position: 'top',
        // 页签展示方式 part 单组，默认 multi 分组,single 单页模式
        model: 'multi',
        // tab页签对打打开数量默认10, 0 为不限制
        maxOpenTabs: 10,
        // 是否开启页签右键刷新功能
        rightClickRefresh: true,
        // 重复打开是否刷新
        openDuplicateRefresh: false,
        // 双击页签刷新页面
        doubleClickRefresh: true,
        // 单页签模式时是否显示面包屑
        breadCrumb: true
      },
      // 基础菜单属性
      baseMenuOptions: {
        // 是否能展开多个子菜单
        unique: true,
        // 是否默认展开所有子菜单，true：默认展开，false：默认收缩
        defaultOpen: false
      },
      // 基础框架属性
      baseFrameOptions: {
        // 默认用户信息
        defaultUserInfo: {
          name: 'YUFP',
          roles: [
            {id: 'modelAdmin', code: 'modelAdmin', name: '模型管理员'},
            {id: 'cstManager', code: 'cstManager', name: '客户经理'}
          ],
          picUrl: 'themes/default/images/user_default_pic.png'
        },
        // 主题下的菜单，只可以修改是否可见(show)和文本（text）
        themeTool: [
          {show: true, text: '皮肤', id: 'skin'},
          {show: true, text: '模式', id: 'model'},
          {show: true, text: '字体', id: 'font'},
          {show: true, text: '语言', id: 'language'}
        ],
        // 皮肤
        themesList: [
          // 默认是蓝白色,皮肤id需要和主题中皮肤目录相同对应
          {id: 'default', color: 'blue', name: '蓝白色', checked: true},
          {id: 'orangeLight', color: 'orange', name: '橙白色'},
          {id: 'redLight', color: 'red', name: '红白色'},
          {id: 'blueDark', color: 'blue', name: '蓝黑色'},
          {id: 'orangeDark', color: 'orange', name: '橙黑色'},
          {id: 'redDark', color: 'red', name: '红黑色'}
        ],
        // 字号
        fontSizeList: [
          {id: 'small', name: '小'},
          {id: 'normal', name: '中', checked: true},
          {id: 'large', name: '大'}
        ],
        // 菜单模式(left/right/topTree/topTile)
        modelList: [
          {id: 'left', checked: true},
          {id: 'right'},
          {id: 'topTree'},
          {id: 'topTile'}
        ],
        // 语言
        languageList: [
          {id: 'zh', name: '中文', checked: true},
          {id: 'en', name: 'English'}
        ],
        // 搜索的类型
        searchType: [
          {id: 'cst', name: '客户', checked: true},
          {id: 'bus', name: '商机'},
          {id: 'cpy', name: '产能'}
        ],
        // 是否后台存储配置信息(菜单模式，字号，皮肤)
        saveInfo: {
          saveConfig: false,
          // 保存配置信息的请求路径
          saveConfigUrl: backend.adminService + '/api/userframeconfig/save',
          // 查询配置信息的请求路径
          queryConfigUrl: backend.adminService + '/api/userframeconfig/query',
          // 查询或保存时传入的附加参数如用户名
          baseParams: {userId: yufp.session.userId},
          // 保存字段的映射关系
          configMapping: {
            // 菜单模式
            menuModel: 'menuModel',
            // 字号
            fontSize: 'fontSize',
            // 皮肤
            themes: 'themes'
          }
        },
        // 可以添加类似主题的工具项， 每个工具支持event属性，包括click(event)，mouseenter(event)，mouseout(event)事件
        sysTools: [
          {show: true, text: '主题', icon: 'el-icon-yx-themes-1', className: 'yu-content-oper-modify', id: 'themeTool'}
        ]
      },
      // 首页框架对象
      baseFrame: null,
      // 菜单初始化完成前调用  返回 false 表示不执行菜单初始化，否则初始化菜单结构
      beforeInit: function () {
      },
      // 鼠标移到页签上的事件后触发
      tabMouseEnter: function (tab, event) {
      },
      // tab点击事件后触发
      tabClick: function (tab, event) {
      },
      // 角色切换 role 角色对象
      switchRole: function (role) {
      },
      // 搜索事件.type 搜索类型对象，value 查询的条件
      searchBarClick: function (type, value) {
      },
      // 搜索过滤返回的数据集. type 搜索类型对象， value 过滤方法返回值为包括label，value 对象的数组
      searchDataFilter: function (type, value) {
        // return [{label: '测试', value: 'test'}];
      },
      // 过滤后数据项的点击事件. type 搜索类型对象，item过滤后选中的数据项
      searchItemClick: function (type, item) {
      }
    };
    yufp.extend(this, _options);
  };
  /**
   *获取页面的高度和宽度
   */
  Frame.prototype.size = function () {
    return yufp.clone({}, this.baseFrame.$refs.refTab.getContentSize());
  };
  /**
   *添加页签
   *@param options 页签参数
  * {
  *  id: routeId, // 菜单功能ID（路由ID）
  *  key: menuId, // 菜单ID
  *  title: '模板', // 页签名称
  *  data: {} // 传递的业务数据，可选配置
  *  }
  */
  Frame.prototype.addTab = function (options) {
    this.baseFrame.$refs.refTab.addTab(options);
    this.baseFrame.$refs.refMenu.activeMenuItem(options.key);
  };
  /**
   *移除页签
   *@param menuid 菜单id
  */
  Frame.prototype.removeTab = function (menuId) {
    this.baseFrame.$refs.refTab.removeTab(menuId);
  };
  /*
   *激活页签
   *@param menuid 菜单id
  */
  Frame.prototype.activeTab = function (menuId) {
    this.baseFrame.$refs.refTab.activeTab(menuId);
  };
  /**
*刷新页面
* @param options 页签参数
* {
*  routerId: routeId, // 菜单功能ID（路由ID）
*  menuId: menuId, // 菜单ID
*  data: {} // 传递的业务数据，可选配置
*  }
*/
  Frame.prototype.refreshTab = function (options) {
    this.baseFrame.$refs.refTab.refreshTab(options);
  };
  /**
   * 获取页签参数
   * @param menuId 菜单id,无key时，返回当前tab
   */
  Frame.prototype.getTab = function (menuId) {
    return this.baseFrame.$refs.refTab.getTab(menuId);
  };
  /**
   * 获取页签参数
   * 旧的方法，新项目不建议使用
   * @param menuId 菜单id,无key时，返回当前tab
   */
  Frame.prototype.tab = function (menuId) {
    var tabInfo = this.baseFrame.$refs.refTab.getTab(menuId);
    return {
      key: tabInfo.menuId, // 页签标识，默认为当前页签
      url: tabInfo.routeId, // 页签url(或路由id)
      title: tabInfo.title, // 页签标题,
      data: tabInfo.data
    };
  };
  /**
   * 菜单激活，高亮
   * @param menuId 菜单Id
   */
  Frame.prototype.focusMenu = function (menuId) {
    this.baseFrame.$refs.refMenu.activeMenuItem(menuId);
  };
  /**
   * 菜单单击事件
   * @param menuId  菜单id
   * @param callback  回调function
   */
  Frame.prototype.menuClick = function (menuId, callback) {
    this.baseFrame.menuItemClick(menuId);
    if (callback && yufp.type(callback) == 'function') {
      callback();
    }
  };
  /**
   * 通过菜单id获取菜单对象
   * @param menuId 菜单id
   */
  Frame.prototype.getMenuById = function (menuId) {
    return yufp.clone(this.baseFrame.$refs.refMenu.getMenuById(menuId), {});
  };
  /**
   * 获取根节点到当前节点的路径
   * @param menuItemData 当前菜单节点数据
   * @return {Array} 存储根节点到当前节点数据对象
   */
  Frame.prototype.getMenuPath = function (menuItemData) {
    return yufp.clone(this.baseFrame.$refs.refMenu.getMenuPath(menuItemData), []);
  };
  return new Frame();
}));