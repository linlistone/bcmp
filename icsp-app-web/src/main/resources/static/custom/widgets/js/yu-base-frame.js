/**
 * @created by liujie 2018-09-06
 * @description frame 框架
 * 暴露事件：角色切换switch-role
 * 涉及到组件
 * yufp-common-tab(tabComp.js) 页签组件  ref="refTab"
 * 对外暴露的事件：页签移除remove-tab，激活页签active-tab，页签点击tab-click，鼠标移入页签mouse-enter
 * yu-common-menu(menuComp.js) 菜单组件  ref="refMenu"
 * 菜单点击事件item-click，菜单加载成功后回调 menu-loaded
 */
// 注册用户组件
(function (vue, name) {
  vue.component(name, {
    template: ' <div class="yu-idxBody" :class="{\'yu-cust-idxMenu-vertical\': isVertical, \'yu-box-left\': menuModel.id === \'right\', \'yu-box-top\': menuModel.id === \'topTree\' || menuModel.id === \'topTile\', \'yu-idxMenu-collapse\': isCollapse, \'yu-idxMenu-hover\': menuShowStat === 3}">\
    <!--system menu，swiper、treeMenu sta-->\
     <!-- 菜单 -->\
     <div class="yu-cust-idxMenu" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">\
       <!-- 垂直菜单头部logo -->\
       <div v-show="isVertical" :class="{\'yu-sysLogo\': !isCollapse, \'yu-sysLogo-collapse\': isCollapse}"></div>\
       <!-- 顶部菜单左箭头 -->\
       <div v-show="listW > menuScrollW" class=" yu-top-menu-left-icon">\
         <i v-show="isTop" class="el-icon-arrow-left yu-top-menu-icon" @click="leftArrowClickFn"></i>\
       </div>\
       <div ref="menuScrollarea" class="menu-horizontal-scrollarea">\
         <yu-base-menu ref="refMenu" :style="{left: topMenuLeft + \'px\'}" :menu-tree-data="menuData" :menu-mode="menuModel.id" :unique="unique" \
         :default-open="defaultOpen" :draggable="draggable" :is-collapse="isCollapse"\
         @item-click="menuItemClick" @cust-menu-item-drag-end="dragEndFn" @tile-menu-item-click="menuItemClick"></yu-base-menu>\
       </div>\
       <!-- 顶部菜单右箭头 -->\
       <div v-show="listW > menuScrollW" class="yu-top-menu-right-icon">\
         <i v-show="isTop" class="el-icon-arrow-right yu-top-menu-icon" @click="rightArrowClickFn"></i>\
       </div>\
       <!-- 垂直菜单底部工具条 -->\
       <div v-show="isVertical" class="bottom-tool">\
         <el-tooltip class="item" effect="dark" content="收起导航" placement="right">\
             <span :class="{\'el-icon-d-arrow-left\': isLeft, \'el-icon-d-arrow-right\': isRight}" v-show="menuShowStat === 1 || menuShowStat === 4" @click="changeMenuStaFn"></span>\
         </el-tooltip>\
         <span :class="{\'el-icon-d-arrow-left\': isRight, \'el-icon-d-arrow-right\': isLeft}" v-show="menuShowStat === 2"  @click="changeMenuStaFn"></span>\
         <span class="el-icon-menu" v-show="menuShowStat === 3"  @click="changeMenuStaFn"></span>\
       </div>\
     </div>\
   <!--system menu，swiper、treeMenu end-->\
   <!--mainBox sta-->\
 <div class="yu-mainBox">\
   <!--user info -->\
   <div class="yu-content-oper" ref ="contenOper">\
       <slot></slot>\
      <div class="yu-content-oper-bank">\
        <div class="op5">\
          <input  placeholder="请输入关键字" v-model="searchValue" @input="searchDataFilter"/>\
          <i class="el-icon-yx-search" @click="searchBarClick"></i>\
        </div>\
        <!-- 查询的下拉列表 -->\
        <ul class="result-list" >\
        <li v-for="item in searchValueOption" @click="searchItemClick(item)">{{item.label}}</li>\
        </ul>\
       </div>\
       <div v-for="(item,index) in sysTools" v-if="item.show" :class="[\'yu-systool\', item.className]">\
         <!--主题-->\
         <i :class="[item.icon]" @click="toolClick(item,$event)" @mouseenter="toolMouseEnter(item,$event)" @mouseout="toolMouseOut(item,$event)">{{item.text}}</i>\
         <ul v-if="item.id === \'themeTool\'" class="custom-thmems-list">\
          <el-scrollbar wrap-style="max-height: 276px;" viewStyle="margin: 15px;">\
           <li class="custom-thmems-list-item" v-for="(item,index) in themeTool" v-if="item.show">\
           <i :class="[item.className,item.icon]">{{item.text}}</i>\
             <ul class="web-skin-list" v-if="item.id==\'skin\'">\
             <li v-for="(item,index) in themesList" :class="[{\'skin-body-white\': index <= 2}, index > 2 ? \'skin-body-dark\' + index : \'\']">\
               <div :class="[\'skin-main\',\'skin-\'+ item.color]" @click="switchThemes(item.id)">\
                 <i v-if="item.checked" class="el-icon-circle-check-outline"></i>\
               </div>\
             </li>\
             </ul>\
             <ul class="web-mode-list" v-if="item.id==\'model\'">\
             <li class="web-mode-list-item" v-for="(item,index) in menuModelList" @click="switchMenuModel(item.id)">\
               <div v-if="item.id === \'left\' || item.id === \'right\'" :class="[\'mode-vertical\', {\'mode-left\': item.id === \'left\', \'mode-right\': item.id === \'right\'}]"></div>\
               <div :class="[{\'mode-top\': item.id === \'left\' || item.id === \'right\', \'mode-only-top\': item.id === \'topTree\' || item.id === \'topTile\'}]"></div>\
               <i v-if ="item.checked" class="el-icon-circle-check-outline"></i>\
             </li>\
           </ul>\
           <ul class="web-mode-list" v-if="item.id==\'font\'">\
            <el-radio-group v-model="checkFontId" @change="switchFontSize">\
              <el-radio v-for="(item,index) in fontSizeList" :key="index" :label="item.id">{{ item.name }}</el-radio>\
            </el-radio-group>\
           </ul>\
           <ul class="web-mode-list" v-if="item.id==\'language\'">\
           <el-radio-group v-model="checkLanguageId" @change="switchLanguage">\
             <el-radio v-for="(item,index) in languageList" :key="index" :label="item.id">{{ item.name }}</el-radio>\
           </el-radio-group>\
           </ul>\
           </li>\
           </el-scrollbar>\
         </ul>\
       </div> \
       <div class="yu-content-oper-logout">\
         <i class="el-icon-yx-switch" @click="logOut">退出</i>\
       </div>\
       <div class="yu-content-oper-uinfo">\
         <span>\
           <img id="userPic" :src="userInfo.pic" title="..." />\
         </span>\
         <span class="txt-userinfo">\
           <em id="userName">{{userInfo.name}}</em>\
           <em id="userRole" class="user-ul-val ">{{selectedRoles.roleName}}</em>\
           <!--角色信息-->\
           <i class="el-icon-yx-ctrl"></i>\
           <ul class="user-ul ul-sel-list" >\
             <li v-for="(item, index) in userInfo.roles" @click="switchRole(item)" :class="{selected:item.checked}" >{{item.name}}</li>\
           </ul>\
         </span>\
       </div>\
     </div>\
     <!-- idxTab sta -->\
     <div class="yu-idxTab" style="position:relative">\
       <!--页签组件-->\
       <yu-base-tab ref="refTab" @active-tab="activeTab" :position="tabPosition" :model="tabModel" :max-open-tabs="maxOpenTabs" :open-duplicate-refresh="openDuplicateRefresh" :right-click-refresh="rightClickRefresh" :double-click-refresh="doubleClickRefresh"\
       @mouse-enter="mouserEnter" @tab-click="tabClick"\
       >\
           <!--单页模式时的面包屑-->\
           <el-breadcrumb separator="/" v-if="singleModelShow && breadCrumb" slot="single">\
             <el-breadcrumb-item v-for="(item, index) in menuPath" :key="index">{{item.menuName}}</el-breadcrumb-item>\
           </el-breadcrumb>\
       </yu-base-tab>\
     </div>\
       <!-- idxTab end -->\
   </div>\
   <!--mainBox end-->\
 </div>',
    props: {
      // 页签位置 top,bottom
      tabPosition: {
        default: yufp.frame.baseTabOptions.position,
        type: String
      },
      // part 单组,multi 分组,single 单页
      tabModel: {
        default: yufp.frame.baseTabOptions.model
      },
      // 最大页签打开数量
      maxOpenTabs: {
        default: yufp.frame.baseTabOptions.maxOpenTabs,
        type: Number
      },
      // 重复打开是否刷新，默认false
      openDuplicateRefresh: {
        default: yufp.frame.baseTabOptions.openDuplicateRefresh,
        type: Boolean
      },
      // 是否开启页签右键刷新功能，默认true
      rightClickRefresh: {
        default: yufp.frame.baseTabOptions.rightClickRefresh,
        type: Boolean
      },
      // 双击页签刷新页面
      doubleClickRefresh: {
        default: yufp.frame.baseTabOptions.doubleClickRefresh,
        type: Boolean
      },
      // 双击页签刷新页面
      breadCrumb: {
        default: yufp.frame.baseTabOptions.breadCrumb,
        type: Boolean
      }
    },
    data: function () {
      return {
        userInfo: {name: '', roles: [], pic: ''},
        // 默认用户信息
        defaultUserInfo: yufp.clone(yufp.frame.baseFrameOptions.defaultUserInfo, []),
        // 系统搜索option
        frameSearch: {
          searchKeyWd: '',
          options: []
        },
        // 获取主题中的工具
        themeTool: yufp.clone(yufp.frame.baseFrameOptions.themeTool, []),
        // 获取系统工具
        sysTools: yufp.clone(yufp.frame.baseFrameOptions.sysTools, []),
        // 已选择的角色
        selectedRoles: {},
        // 皮肤
        themesList: yufp.clone(yufp.frame.baseFrameOptions.themesList, []),
        // 存储上一次选中的皮肤对象
        themes: {},
        // 菜单模式列表
        menuModelList: yufp.clone(yufp.frame.baseFrameOptions.modelList, []),
        // 字号
        fontSizeList: yufp.clone(yufp.frame.baseFrameOptions.fontSizeList, []),
        // 语言
        languageList: yufp.clone(yufp.frame.baseFrameOptions.languageList, []),
        // 搜索栏的搜索类型
        searchTypeList: yufp.clone(yufp.frame.baseFrameOptions.searchType, []),
        // 已选中的语言
        language: {},
        // 已选中的字号
        fontSize: {},
        // 当前选中的字体大小的id
        checkFontId: '',
        // 菜单配置
        // 菜单数据
        menuData: [],
        // 是否能展开多个子菜单
        unique: yufp.frame.baseMenuOptions.unique,
        // 是否默认展开所有子菜单，true：默认展开，false：默认收缩
        defaultOpen: yufp.frame.baseMenuOptions.defaultOpen,
        // 菜单模式（left/right/topTree/topTile）
        menuModel: {},
        menuPath: [],
        // 菜单的菜单项是否允许拖拽
        draggable: true,
        // 菜单是否折叠状态
        isCollapse: false,
        // 垂直菜单展示状态（1:展开状态；2:收起状态；3:收起后mouseenter；4:点击锁定后的状态）
        menuShowStat: 1,
        // 顶部菜单，可滑动区域内菜单的left值
        topMenuLeft: 0,
        checkLanguageId: '',
        // 顶部菜单时，所有菜单项宽度总和
        listW: 0,
        // 顶部菜单可见区域宽度
        menuScrollW: 0,
        // 菜单初始化前调用
        beforeInit: yufp.frame.beforeInit,
        // 搜索框的值
        searchValue: '',
        // 搜索框 过滤后的值
        searchValueOption: [],
        // 被选中的搜索类型
        searchType: {}

      };
    },
    beforeMount: function () {
      this.userInfo = {
        // 用户名
        name: yufp.session.userName || this.defaultUserInfo.name,
        // 角色
        roles: yufp.clone(yufp.session.roles, []) || this.defaultUserInfo.roles,
        // 头像
        pic: yufp.session.userAvatar || this.defaultUserInfo.picUrl
      };

      try {
        // 获取角色中默认选中的数据项
        for (var i = 0; i < this.userInfo.length; i++) {
          var element = this.userInfo[i];
          if (element.checked === true) {
            this.selectedRoles = element;
            break;
          }
        }
        //  this.selectedRoles.id 没有值，表示  this.userInfo 没有被设置为checked 的数据，所以默认将第一条数据设置为checked
        if (!this.selectedRoles.id) {
          this.selectedRoles = this.userInfo.roles[0];
          this.selectedRoles.checked = true;
        }
        // 获取皮肤默认选中数据
        for (var i = 0; i < this.themesList.length; i++) {
          var element = this.themesList[i];
          if (element.checked === true) {
            this.themes = element;
            break;
          }
        }
        // 没有设置默认值时，设置第一项
        if (!this.themes.id) {
          this.themes = this.themesList[0];
          // 设置第一项checked属性
          this.$set(this.themesList[0], 'checked', true);
        }

        // 获取菜单模式默认选中数据
        for (var i = 0; i < this.menuModelList.length; i++) {
          var element = this.menuModelList[i];
          if (element.checked === true) {
            this.menuModel = element;
            break;
          }
        }
        // 没有设置默认值时，设置第一项
        if (!this.menuModel.id) {
          this.menuModel = this.menuModelList[0];
          // 设置第一项checked属性
          this.$set(this.menuModelList[0], 'checked', true);
        }
        // 获取字体默认选中数据
        for (var i = 0; i < this.fontSizeList.length; i++) {
          var element = this.fontSizeList[i];
          if (element.checked === true) {
            this.fontSize = element;
            break;
          }
        }
        // 没有设置默认值时，设置第一项
        if (!this.fontSize.id) {
          this.fontSize = this.fontSizeList[0];
          // 设置第一项checked属性
          this.$set(this.fontSizeList[0], 'checked', true);
        }

        // 获取字体默认选中数据
        for (var i = 0; i < this.languageList.length; i++) {
          var element = this.languageList[i];
          if (element.checked === true) {
            this.language = element;
            break;
          }
        }
        // 没有设置默认值时，设置第一项
        if (!this.language.id) {
          this.language = this.languageList[0];
          // 设置第一项checked属性
          this.$set(this.languageList[0], 'checked', true);
        }

        // 获取字体默认选中数据
        for (var i = 0; i < this.searchTypeList.length; i++) {
          var element = this.searchTypeList[i];
          if (element.checked === true) {
            this.searchType = element;
            break;
          }
        }
        // 没有设置默认值时，设置第一项
        if (!this.searchType.id) {
          this.searchType = this.searchTypeList[0];
          // 设置第一项checked属性
          this.$set(this.searchTypeList[0], 'checked', true);
        }
      } catch (error) {
        throw new Error('用户角色数据错误');
      }
      // 加载多语言
      if (yufp.settings.multiLanguage) {
        var storageLanguage = yufp.localStorage.get('language');
        if (storageLanguage) {
          Vue.config.lang = storageLanguage;
          this.switchLanguage(storageLanguage, true);
        } else {
          Vue.config.lang = this.language.id;
        }
      }
      // 查询配置信息
      this.queryConfig();
    },
    mounted: function () {
      // 这个属性有值，并且返回值为true才执行初始化框架
      if (!this.beforeInit || (this.beforeInit && this.beforeInit() !== false)) {
        this.init();
        if (window.YUFP_SYS_CONFIG.watermark === true) {
          yufp.require.require('./custom/plugins/yufp.watermark.js');
        }
      }
      this.checkFontId = this.fontSize.id;
      this.checkLanguageId = this.language.id;
    },
    watch: {
      /**
      * 监听菜单模式
      */
      menuModel: function (val) {
        this.menuModel = val;
        this.isCollapse = false;
        this.menuShowStat = 1;
        if (val.id === 'topTile' || val.id === 'topTree') {
          // 水平状态下的
          this.$nextTick(function () {
            var menuRootList = document.querySelectorAll('.el-menu.el-menu--horizontal > .cust-self-call-menu-templates >li');
            this.menuScrollW = this.$refs.menuScrollarea.clientWidth;
            for (var i = 0, len = menuRootList.length; i < len; i++) {
              var domLi = menuRootList[i];
              this.listW += domLi.clientWidth;
            }
          });
        }
      }
    },
    computed: {
      /**
      * 计算tab single 模式
      */
      singleModelShow: function () {
        return this.tabModel == 'single';
      },
      // 判断菜单模式是否是左侧
      isLeft: function () {
        return this.menuModel.id === 'left';
      },
      // 判断菜单模式是否是右侧菜单
      isRight: function () {
        return this.menuModel.id === 'right';
      },
      // 判断菜单模式是否是垂直的
      isVertical: function () {
        return this.menuModel.id === 'left' || this.menuModel.id === 'right';
      },
      // 是否是顶部菜单
      isTop: function () {
        return this.menuModel.id === 'topTile' || this.menuModel.id === 'topTree';
      }
    },
    methods: {
      /**
      * 初始化菜单
      */
      init: function () {
        var homepage = {};
        this.menuData = yufp.clone(yufp.session.getMenuTree(), []);
        for (var i = 0; i < this.menuData.length; i++) {
          var element = this.menuData[i];
          if (element.isIndex === true) {
            homepage = element;
            break;
          }
        }
        // 初始化首页
        if (homepage.routeId) {
          this.menuItemClick(homepage.mId);
        }
      },

      /**
      * 设置角色
      * @param role 角色对象
      */
      switchRole: function (role) {
        var roles = this.userInfo.roles;
        for (var i = 0; i < roles.length; i++) {
          if (roles[i].id == role.id) {
            this.$set(roles[i], 'checked', true);
            this.selectedRoles = roles[i];
          } else {
            this.$set(roles[i], 'checked', false);
          }
        }
        // 调用外部接口
        if (yufp.frame && yufp.frame.switchRole && yufp.type(yufp.frame.switchRole) == 'function') {
          yufp.frame.switchRole(this.role);
        }
      },
      /**
      * 菜单模式
      * @param id 菜单对象中某一项的id
      * @param flag true表示不触发保存配置
      */
      switchMenuModel: function (id, flag) {
        // 前一次和这次的id 相等就不处理
        if (this.menuModel.id == id) {
          return;
        }
        for (var i = 0; i < this.menuModelList.length; i++) {
          var element = this.menuModelList[i];
          if (element.id == id) {
            this.$set(element, 'checked', true);
            this.menuModel = element;
          } else {
            this.$set(element, 'checked', false);
          }
        }
        if (flag !== true) {
          this.saveConfig();
        }
      },
      /**
      * 菜单状态的控制
      */
      changeMenuStaFn: function () {
        switch (this.menuShowStat) {
        // 展开状态
        case 1:
          this.isCollapse = true;
          this.menuShowStat = 2;
          break;
          // 收起状态
        case 2:
          this.isCollapse = false;
          this.menuShowStat = 3;
          break;
          // 收起后mouseenter
        case 3:
          this.menuShowStat = 4;
          break;
          // mouseenter后点击锁定icon
        case 4:
          this.isCollapse = true;
          this.menuShowStat = 2;
          break;
        }
      },
      /**
      * 菜单的mouseenter事件处理程序
      */
      handleMouseEnter: function () {
        if ((this.menuModel.id === 'left' || this.menuModel.id === 'right') && this.menuShowStat === 2) {
          this.isCollapse = false;
          this.menuShowStat = 3;
        }
      },
      /**
      * 菜单的mouseleave事件处理程序
      */
      handleMouseLeave: function () {
        if ((this.menuModel.id === 'left' || this.menuModel.id === 'right') && this.menuShowStat === 3) {
          this.isCollapse = true;
          this.menuShowStat = 2;
        }
      },
      /**
      * 顶部菜单左箭头点击事件处理程序
      */
      leftArrowClickFn: function () {
        // 顶部菜单，所有菜单项的宽度总和
        var listW = 0;
        var menuRootList = document.querySelectorAll('.el-menu.el-menu--horizontal > .cust-self-call-menu-templates >li');
        for (var i = 0, len = menuRootList.length; i < len; i++) {
          var domLi = menuRootList[i];
          listW += domLi.clientWidth;
        }
        if (listW > this.menuScrollW) {
          for (i = 0, len = menuRootList.length; i < len; i++) {
            domLi = menuRootList[i];
            if (domLi.style.display != 'none') {
              domLi.style.display = 'none';
              break;
            }
          }
        }
      },
      /**
      * 顶部菜单左箭头点击事件处理程序
      */
      rightArrowClickFn: function () {
        var menuRootList = document.querySelectorAll('.el-menu.el-menu--horizontal > .cust-self-call-menu-templates >li');
        for (var i = menuRootList.length - 1; i >= 0; i--) {
          var domLi = menuRootList[i];
          if (domLi.style.display === 'none') {
            domLi.style.display = 'block';
            break;
          }
        }
      },
      /**
      * 菜单项拖拽事件
      */
      dragEndFn: function (item, event) {
        this.$message({message: '菜单拖拽' + JSON.stringify(item)});
      },
      /**
      * 退出系统
      */
      logOut: function () {
        yufp.session.logout();
      },
      /**
      * 切换皮肤
      * @param id 皮肤对象其中一项的id值
      * @param flag true表示不触发保存配置
      */
      switchThemes: function (id, flag) {
        // 前一次和这次的id 相等就不处理
        if (this.themes.id == id) {
          return;
        }
        // 用于标志是否查找到历史皮肤，未查找到就直接加载
        var findFlag = true;
        // 当没有找到对应的时候css的时候
        var selectElement = {};
        for (var i = 0; i < this.themesList.length; i++) {
          var element = this.themesList[i];
          if (element.id == id) {
            // 暂存先当前的对象
            selectElement = element;
            var target = document.getElementsByTagName('link');
            if (target.length > 0) {
              for (var j = 0; j < target.length; j++) {
                var ctrlLink = target[j];
                var cssOld = ctrlLink.getAttribute('href');
                // 查找到皮肤样式问题件
                if (cssOld.indexOf('themes/' + this.themes.id) > -1) {
                  this.$set(element, 'checked', true);
                  var cssNew = cssOld.replace(this.themes.id, id);
                  // 替换后要闪烁，所以直接加载
                  ctrlLink.setAttribute('href', cssNew);
                  ctrlLink.setAttribute('id', cssNew);
                  // yufp.require.require(cssNew);
                  // ctrlLink.setAttribute('disabled', true);
                  this.themes = element;
                  findFlag = false;
                  break;
                }
              }
            }
          } else {
            this.$set(element, 'checked', false);
          }
        }
        // 未查找到就直接加载
        if (findFlag) {
          yufp.require.require('./themes/' + id + '/main.css');
          this.themes = selectElement;
        }
        if (flag !== true) {
          this.saveConfig();
        }
      },
      /**
      * 切换字体
      * @param id 切换字体
      * @param flag 不触发保存配置
      */
      switchFontSize: function (id, flag) {
        var oldFonSize = yufp.clone({}, this.fontSize);
        // 选中为正常大小
        if (id == 'normal') {
          // 上次被选中的不是normal，表示字体css 已加载过，现在需要移除该项（normal 没有字体css文件）
          if (this.fontSize.id != 'normal') {
            // 移除css
            var target = document.getElementsByTagName('link');
            if (target.length > 0) {
              for (var j = 0; j < target.length; j++) {
                var ctrlLink = target[j];
                var cssOld = ctrlLink.getAttribute('href');
                // 查找到皮肤样式问题件
                if (cssOld.indexOf('fontSize/' + this.fontSize.id) > -1) {
                  ctrlLink.remove();
                  break;
                }
              }
            }
          }
        } else {
          // 上次选中的是normal,表示没有字体css文件，需要引入css文件
          if (this.fontSize.id == 'normal') {
            // 添加css
            yufp.require.require('./themes/fontSize/' + id + '.css');
          } else {
            // 前一次和这次的id 相等就不处理
            if (this.fontSize.id == id) {
              return;
            }
            // 替换css
            var target = document.getElementsByTagName('link');
            if (target.length > 0) {
              for (var j = 0; j < target.length; j++) {
                var ctrlLink = target[j];
                var cssOld = ctrlLink.getAttribute('href');
                // 查找到皮肤样式问题件
                if (cssOld.indexOf('fontSize/' + this.fontSize.id) > -1) {
                  var cssNew = cssOld.replace(this.fontSize.id, id);
                  ctrlLink.setAttribute('href', cssNew);
                  ctrlLink.setAttribute('id', cssNew);
                  break;
                }
              }
            }
          }
        }
        // 设置checked 属性
        for (var i = 0; i < this.fontSizeList.length; i++) {
          var element = this.fontSizeList[i];
          if (element.id == id) {
            this.$set(element, 'checked', true);
            this.fontSize = element;
          } else {
            this.$set(element, 'checked', false);
          }
        }
        // 首页被选中时oldFonSize.id 会等于选中的id
        if (flag !== true && oldFonSize.id != id) {
          this.saveConfig();
        }
      },
      /**
      * 语言切换
      * @param id 切换语言
      * @param flag 不触发保存配置
      */
      switchLanguage: function (id, flag) {
        var oldLanguage = yufp.clone({}, this.language);
        // 设置checked 属性
        for (var i = 0; i < this.languageList.length; i++) {
          var element = this.languageList[i];
          if (element.id == id) {
            this.$set(element, 'checked', true);
            this.language = element;
            Vue.config.lang = element.id;
          } else {
            this.$set(element, 'checked', false);
          }
        }
        // 首页被选中时oldLanguage.id 会等于选中的id
        if (flag !== true && oldLanguage.id != id) {
          // this.saveConfig();
          yufp.localStorage.put('language', id);
          // 需要重新刷新操作
          yufp.router.to('frame');
        }
      },
      /**
      * 平铺菜单菜单项/菜单项点击事件
      * @param menuId 菜单的id
      */
      menuItemClick: function (menuId) {
        var options = null;
        var tmp = this.$refs.refMenu.getMenuById(menuId);
        if (!tmp) {
          throw new Error('未查询到菜单数据!');
        } else {
          options = tmp;
        }
        this.menuPath = yufp.clone(this.$refs.refMenu.getMenuPath(menuId), []);
        // 只有等于0 的时候才计算 + 数据转换
        this.$refs.refTab.addTab(this.formatMenuData(options));
      },
      /**
      * 为了满足以前addtab的数据结构，所以对目前的数据做了格式转换
      * @param options 菜单数据
      */
      formatMenuData: function (options) {
        var option = {};
        option.id = options.funcId;
        option.title = options.menuName;
        option.key = options.menuId;
        option.isIndex = options.isIndex;
        option.data = options.data;
        option.menuType = options.menuType;
        return option;
      },
      /**
      * 点击tab 页签后再点亮菜单
      * @param tab 页签数据
      */
      activeTab: function (tab) {
        this.$nextTick(function () {
          this.$refs.refMenu.activeMenuItem(tab.menuId);
          // 如果是单页模式时需要激活面包屑
          if (this.tabModel == 'single') {
            var tmp = this.$refs.refMenu.getMenuById(tab.menuId);
            if (tmp) {
              this.menuPath = yufp.clone(this.$refs.refMenu.getMenuPath(tab.menuId), []);
            }
          }
        });
      },
      /**
      *  保存配置信息
      */
      saveConfig: function () {
        var saveInfo = yufp.clone(yufp.frame.baseFrameOptions.saveInfo, {});
        // 只有为true 才查询配置信息
        if (saveInfo.saveConfig !== true) {
          return;
        }
        var configMapping = saveInfo.configMapping;
        var data = {};
        // 保存 菜单模式，皮肤，字体，语言
        for (var key in configMapping) {
          if (this[key].id) {
            data[configMapping[key]] = this[key].id;
          }
        }
        yufp.extend(true, data, saveInfo.baseParams);
        yufp.service.request({
          method: 'post',
          url: saveInfo.saveConfigUrl,
          data: data,
          callback: function (code, message, response) {

          }
        });
      },
      /**
      *  查询配置信息
      */
      queryConfig: function () {
        var saveInfo = yufp.clone(yufp.frame.baseFrameOptions.saveInfo, {});
        // 只有为true 才查询配置信息
        if (saveInfo.saveConfig !== true) {
          return;
        }
        var _this = this;
        yufp.service.request({
          method: 'post',
          async: false,
          url: saveInfo.queryConfigUrl,
          data: saveInfo.baseParams,
          callback: function (code, message, response) {
            if (code == '0') {
              var configMapping = saveInfo.configMapping;
              for (var key in configMapping) {
                // 获取返回数据中对应的值
                var value = response[configMapping[key]] || '';
                var dataJson = _this[key + 'List'];
                for (var i = 0; i < dataJson.length; i++) {
                  var element = dataJson[i];
                  if (element.id == value) {
                    _this.$set(element, 'checked', true);
                    // 查询出来的属性做对应的数据处理
                    if (key == 'menuModel') {
                      _this.switchMenuModel(value, true);
                    } else if (key == 'themes') {
                      _this.switchThemes(value, true);
                    } else if (key == 'fontSize') {
                      _this.switchFontSize(value, true);
                    }
                  } else {
                    _this.$set(element, 'checked', false);
                  }
                }
              }
            }
          }
        });
      },
      /**
      * 鼠标移到页签上的事件
      * @param tab tab对象
      * @param event 事件对象
      */
      mouserEnter: function (tab, event) {
        // 调用外部接口
        if (yufp.frame && yufp.frame.tabMouseEnter && yufp.type(yufp.frame.tabMouseEnter) == 'function') {
          yufp.frame.tabMouseEnter(tab, event);
        }
      },
      /**
      * tab 的点击事件
      * @param tab 对象
      * @param event 事件对象
      */
      tabClick: function (tab, event) {
        // 调用外部接口
        if (yufp.frame && yufp.frame.tabClick && yufp.type(yufp.frame.tabClick) == 'function') {
          yufp.frame.tabClick(tab, event);
        }
      },
      /**
       * 系统工具点击事件
       * @param item 系统工具项
       */
      toolClick: function (item, $event) {
        if (item.event && item.event.click) {
          item.event.click($event);
        }
      },
      /**
       * 系统工具mouseenter事件
       * @param item 系统工具项
       */
      toolMouseEnter: function (item, $event) {
        if (item.event && item.event.mouseEnter) {
          item.event.mouseEnter($event);
        }
      },
      /**
       * 系统工具mouseout事件
       * @param item 系统工具项
       */
      toolMouseOut: function (item, $event) {
        if (item.event && item.event.mouseOut) {
          item.event.mouseOut($event);
        }
      },
      /**
       * 工具栏搜索类型切换
       * @param id 类型id
       * @param $event 事件
       */
      searchTypeSwitch: function (id, $event) {
        for (var i = 0; i < this.searchTypeList.length; i++) {
          var element = this.searchTypeList[i];
          if (element.id == id) {
            this.$set(element, 'checked', true);
            // 设置选中的 搜索类型
            this.searchType = element;
          } else {
            this.$set(element, 'checked', false);
          }
        }
      },
      /**
       * 搜索框的图标点击事件
       */
      searchBarClick: function () {
        // 调用外部接口
        if (yufp.frame && yufp.frame.searchBarClick && yufp.type(yufp.frame.searchBarClick) == 'function') {
          yufp.frame.searchBarClick(this.searchType, this.searchValue);
        }
      },
      /**
       * 搜索过滤返回的数据集
       */
      searchDataFilter: function () {
        // 调用外部接口
        if (yufp.frame && yufp.frame.searchDataFilter && yufp.type(yufp.frame.searchDataFilter) == 'function') {
          var value = yufp.frame.searchDataFilter(this.searchType, this.searchValue);
          if (yufp.type(value) == 'array') {
            this.searchValueOption = value;
          } else {
            if (value) {
              throw new Error('过滤返回数据类型错误！');
            }
          }
        }
      },
      /**
       * 过滤后数据项的点击事件
       */
      searchItemClick: function (item) {
        this.searchValue = item.label;
        this.searchValueOption = [];
        // 调用外部接口
        if (yufp.frame && yufp.frame.searchItemClick && yufp.type(yufp.frame.searchItemClick) == 'function') {
          yufp.frame.searchItemClick(this.searchType, item);
        }
      }
    },
    destory: function () {

    }
  });
}(Vue, 'yu-base-frame'));
/**
 * @description 菜单组件
 */
(function (vue, name) {
  Vue.component(name, {
    template: ' <div class="cust-self-call-menu-templates">\
   <el-submenu v-if="justChildren(child)"  v-for="child in menuChildren" :index="child.mId" :key="child.mId" :class="{\'yu-root-level\': child.mPid === \'0\'}">\
     <templates slot="title">\
       <i :class="[rootMenu.mode === \'vertical\' ? child.mIcon : \'\']"></i>\
       <span slot="title">{{ child.mText }}</span>\
     </templates>\
     <!-- 组件递归调用 -->\
     <yu-base-menu-self-call v-if="submenuMode === \'tree\'" :menu-children="child.children" :submenu-mode="submenuMode" ></yu-base-menu-self-call>\
     <templates v-else>\
         <!-- 平铺菜单 -->\
         <yu-base-menu-tile-item v-for="(tileMenuData, index) in child.children" :key="index">\
           <span slot="title" @click="topTileItemClickFn(tileMenuData, $event)" :class="{\'title-item-cursor\': tileMenuData.routeId != \'\'}">{{ tileMenuData.mText }}</span>\
           <li :class="[\'tile-item\', {\'is-active\': activeTileItem(item.id)}]" v-for="(item, index) in tileMenuData.children" :key="index" @click="topTileItemClickFn(item, $event)">{{ item.mText }}</li>\
         </yu-base-menu-tile-item>\
     </templates>\
   </el-submenu>\
   <el-menu-item v-else :index="child.mId" :menu-item-data="child" :menu-right-list-data="menurightListData"\
   @menu-rightlist-click="menurightListClickFn">\
      <i :class="[rootMenu.mode === \'vertical\' ? child.mIcon : \'\']"></i>\
     <span slot="title">{{ child.mText }}</span>\
     <!-- 菜单项右键列表 -->\
     <templates slot="menuRightList"></templates>\
   </el-menu-item>\
</div>',
    componentName: 'YuBaseMenuSelfCall',
    data: function () {
      return {
        shown: false,
        // 菜单项右键列表
        menurightListData: [{
          index: 1,
          icon: 'el-icon-menu',
          title: '属性1'
        },
        {
          index: 2,
          icon: 'el-icon-menu',
          title: '属性2'
        }],
        // 顶部平铺菜单高亮的菜单项id
        activeId: ''
      };
    },
    props: {
      // 菜单数据
      menuChildren: Array,
      // 子菜单模式，树形（tree）/平铺(tile)
      submenuMode: String
    },
    computed: {
      /**
      * 找到当前组件的最外层为yu-base-menu的组件
      */
      rootMenu: function () {
        var parent = this.$parent;
        while (
          parent &&
         parent.$options.componentName !== 'YuBaseMenu'
        ) {
          parent = parent.$parent;
        }
        return parent;
      }
    },
    methods: {
      /**
    * 判断树结构数据中的某一项是否有children属性
    */
      justChildren: function (child) {
        return child.children && child.children.length != 0;
      },
      /**
    * 右击事件处理程序
    */
      rightClickFn: function () {
        this.shown = true;
      },
      /**
      * 菜单项右击列表，列表项的点击事件处理程序
      * @param index 列表项唯一标识
      * @param menuData 菜单项对象
      * @param e 原生DOM事件对象
      */
      menurightListClickFn: function (index, menuData, e) {
        if (index === 1) {
          this.$message({message: JSON.stringify(menuData)});
        } else {
          this.$message({message: '列表点击事件' + index});
        }
      },
      /**
      * 顶部平铺菜单，菜单项点击事件
      * @param menu 菜单项
      * @param event 原生事件对象
      */
      topTileItemClickFn: function (menu, event) {
        var menuId = menu.id;
        this.activeId = menuId;
        if (menu.routeId != '') {
          this.rootMenu.$emit('tile-item-click', menuId);
        }
      },
      /**
       * 高亮顶部菜单项
       * @param menuId 菜单id
       */
      activeTileItem: function (menuId) {
        return this.activeId === menuId;
      }
    }
  });
}(Vue, 'yu-base-menu-self-call'));
/**
* 平铺菜单组件
**/
(function (vue, name) {
  Vue.component(name, {
    template: '<li class="tile-menu-item">\
   <slot name="title"></slot>\
   <ul class="tile-menu-list">\
     <slot></slot>\
   </ul>\
 </li>'
  });
}(Vue, 'yu-base-menu-tile-item'));

(function (vue, name) {
  Vue.component(name, {
    template: ' <div class="menu-body"\
   :class="{\'menu-horizontal\': isTop, \'menu-vertical\': !isTop, \'menu-vertical-left\': isLeft, \'menu-vertical-right\': isRight}" \
   >\
 <!-- 顶部菜单 -->\
 <el-menu v-if="isTop" :class="{\'tile-menu\': isTileMenu}" :style="{width: menuSize.menuWidth, height: menuSize.menuHeight}" @open="handleOpen" @close="handleClose"\
  @select="itemSelectFn" :mode="mode" key="horizontal-menu" :collapse="isCollapse" :default-active="defaultActive" :default-openeds="subMenus" :unique-opened="unique">\
   <yu-base-menu-self-call :menu-children="menuTreeData" :submenu-mode="custMenuMode"></yu-base-menu-self-call>\
 </el-menu>\
 <!-- 垂直菜单 -->\
 <el-scrollbar v-else class="menu-scrollbar" wrap-style="max-height: 100%;overflow-x: hidden;">\
 <el-menu  @open="handleOpen" @close="handleClose" @select="itemSelectFn" @menu-item-drag-end="dragEndFn" key="vertical-menu"\
 :mode="mode" :collapse="isCollapse" :default-active="defaultActive" :default-openeds="subMenus" :unique-opened="unique" :draggable="draggable">\
   <yu-base-menu-self-call :menu-children="menuTreeData" :submenu-mode="custMenuMode"></yu-base-menu-self-call>\
 </el-menu>\
 </el-scrollbar>\
</div>',
    componentName: 'YuBaseMenu',
    props: {
      // 菜单数据
      menuTreeData: {
        type: Array
      },
      // 菜单项的hover或选中时的class
      itemClassName: {
        type: String,
        default: ''
      },
      // 设置每次只展开一个子菜单
      unique: Boolean,
      // 所有菜单项是否默认展开，true：默认展开，false：默认收缩
      defaultOpen: Boolean,
      // 菜单模式（left/right/topTree/topTile）
      menuMode: {
        type: String,
        default: 'left'
      },
      // 菜单项是否可拖动
      draggable: Boolean,
      // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
      isCollapse: Boolean
    },
    data: function () {
      return {
        dealedMenuData: [],
        pathArray: [],
        subMenus: [],
        defaultOpeneds: [],
        menuSize: {
          // 菜单宽度
          menuWidth: '',
          // 菜单高度
          menuHeight: ''
        },
        // 垂直菜单展示状态（1:展开状态；2:收起状态；3:收起后mouseenter；4:点击锁定后的状态）
        menuShowStat: 1,
        // 激活菜单项的 menuId
        defaultActive: ''
      };
    },
    computed: {
      // 根据传入的menu-mode属性，判断el-menu菜单模式是vertical还是horizontal
      mode: function () {
        return this.menuMode === 'topTile' || this.menuMode === 'topTree' ? 'horizontal' : 'vertical';
      },
      // 根据传入的menu-mode属性,返回传入yu-base-menu-self-call组件的的submenu-mode属性值
      custMenuMode: function () {
        return this.menuMode === 'topTile' ? 'tile' : 'tree';
      },
      // 判断菜单模式是否是平铺菜单
      isTileMenu: function () {
        return this.menuMode === 'topTile';
      },
      // 是否是顶部菜单
      isTop: function () {
        return this.menuMode === 'topTile' || this.menuMode === 'topTree';
      },
      // 判断是否是左侧
      isLeft: function () {
        return this.menuMode === 'left';
      },
      // 判断是否是右侧菜单
      isRight: function () {
        return this.menuMode === 'right';
      }
    },
    methods: {
      /**
      * 菜单项点击事件处理程序
      * @param menuId 菜单项id
      * @param menuPath 菜单路径
      */
      itemSelectFn: function (menuId, menuPath, itemVue) {
        // 菜单项点击事件
        this.$emit('item-click', menuId, menuPath, itemVue);
      },
      /**
      * 菜单项拖拽事件
      */
      dragEndFn: function (itemVue, event) {
        this.$emit('cust-menu-item-drag-end', itemVue.menuItemData, event);
      },
      /**
      * yu-common-menu菜单组件的mouseenter事件处理程序
      */
      handleMouseEnter: function () {
        if ((this.menuMode === 'left' || this.menuMode === 'right') && this.menuShowStat === 2) {
          this.isCollapse = false;
          this.menuShowStat = 3;
        }
      },
      /**
      * yu-common-menu菜单组件的mouseleave事件处理程序
      */
      handleMouseLeave: function () {
        if ((this.menuMode === 'left' || this.menuMode === 'right') && this.menuShowStat === 3) {
          this.isCollapse = true;
          this.menuShowStat = 2;
        }
      },
      /**
      * Submenu的展开回调
      * @param index 打开的 subMenu 的 index
      * @param indexPath 打开的 subMenu 的 index path
      */
      handleOpen: function (index, indexPath) {

      },
      /**
      * 平铺菜单点击事件处理程序
      */
      handleTileItemClick: function (menuId) {
        this.$emit('tile-menu-item-click', menuId);
      },
      /**
      * Submenu收起的回调
      * @param index 打开的 subMenu 的 index
      * @param indexPath 打开的 subMenu 的 index path
      */
      handleClose: function (index, indexPath) {

      },
      /**
      * 获取根节点到当前节点的路径 可供外部调用
      * @param menuItemData 当前菜单节点数据
      * @return {Array} pathArray 存储根节点到当前节点数据对象
      */
      getMenuPath: function (menuId) {
        var menuItemData = this.getMenuById(menuId);
        if (!menuItemData) {
          throw new Error('菜单对象不存在');
        }
        // 获取数组结构的菜单数据
        var pathArray = [menuItemData];
        while (menuItemData.upMenuId != '0') {
          menuItemData = this.getMenuById(menuItemData.upMenuId);
          pathArray.push(menuItemData);
        }
        return pathArray.reverse();
      },
      /**
      * 根据id找到对应的菜单数据  可供外部调用
      * @param {String} menuId 指定的菜单id
      * @return {Array} 菜单对象，格式为{menuId: , menuName: , funcId: , funcUrl: ,[isIndex: ,] menuIcon: , upMenuId: }
      */
      getMenuById: function (menuId) {
        return yufp.session.getMenuById(menuId);
      },
      /**
      * 遍历数组，找到数组中对象的children.length > 0 的数据
      * @param {Array} data 需要遍历的数组
      * @return 包含所有submenu的mId的数组
      */
      findSubMenu: function (data) {
        this.findSubMenuRecur(this.menuTreeData);
        return this.subMenus;
      },
      /**
      * 遍历数组，找到数组中对象的children.length > 0 的数据
      * @param {Array} data 需要遍历的数组
      */
      findSubMenuRecur: function (data) {
        for (var i = 0, len = data.length; i < len; i++) {
          var child = data[i].children;
          if (child && child.length > 0) {
            this.subMenus.push(data[i].mId);
            this.findSubMenuRecur(child);
          }
        }
      },
      /**
      * 激活某一菜单项（设置某一菜单项高亮） 可供外部调用
      * @param {String} id 菜单项目id
      */
      activeMenuItem: function (id) {
        this.defaultActive = id;
      },
      /**
      * 菜单状态的控制
      */
      iconFn: function () {
        switch (this.menuShowStat) {
        // 展开状态
        case 1:
          this.isCollapse = true;
          this.menuShowStat = 2;
          break;
          // 收起状态
        case 2:
          this.isCollapse = false;
          this.menuShowStat = 3;
          break;
          // 收起后mouseenter
        case 3:
          this.menuShowStat = 4;
          break;
          // mouseenter后点击锁定icon
        case 4:
          this.isCollapse = true;
          this.menuShowStat = 2;
          break;
        }
      }
    },
    watch: {
      menuMode: function (val, oldVal) {
        this.isCollapse = false;
        this.menuShowStat = 1;
        if (val === 'topTile' || val === 'topTree') {
          this.menuSize.menuWidth = window.innerWidth + 'px';
          this.menuSize.menuHeight = '100%';
        } else {
          this.menuSize.menuWidth = '100%';
          this.menuSize.menuHeight = window.innerHeight + 'px';
        }
      }
    },
    mounted: function () {
      if (this.menuMode === 'topTile' || this.menuMode === 'topTree') {
        this.menuSize.menuWidth = window.innerWidth + 'px';
        this.menuSize.menuHeight = '100%';
      } else {
        this.menuSize.menuWidth = '100%';
        this.menuSize.menuHeight = window.innerHeight + 'px';
      }
      if (this.defaultOpen) {
        this.defaultOpeneds = this.findSubMenu();
      }
      this.$on('tile-item-click', this.handleTileItemClick);
      // 菜单渲染成功后回调事件
      this.$emit('menu-loaded');
    },
    beforeDestroy: function () {
      // 注销时间监听
      // 对象释放
      this.$off('tile-item-click');
    }
  });
}(Vue, 'yu-base-menu'));
/**
 * @created by liujie 2018-09-06
 * @description tab 组件
 */
// 注册用户组件
(function (vue, name) {
  vue.component(name, {
    template: '<div>\
     <slot name="single"></slot>\
     <!--单组模式时，首页显示的div-->\
     <div id ="singleTab"   class="singleTab" v-if="singleModelShow" ref = "singleTab" v-show ="partFlag" style="overflow: hidden auto;" :key="homePage.id">\
     <iframe v-if ="homePage.frame && model == \'single\'" :src="homePage.url" :style="commStyle"></iframe>\
     </div>\
     <!--tab 页签-->\
     <div v-if="groupModel" v-show ="!partFlag" >\
     <div v-if="tabPosition === \'top\'" class="yu-idxTabs" id="yu-idxTabs"  ref="idxTabs">\
      <!-- tab标题-->\
      <div class="yu-tab-content">\
       <div>\
           <span v-for="(item, index) in data" v-show="item.show" :ref="\'ref_\'+item.menuId" :class="{\'ck\':item.checked}" href="javescript:;" :data-url="item.routeId" :data-key="item.menuId"\
               @click="handleClick(item,$event)" @dblclick="handleDblClick(item,$event)" @mouseleave="handleMouseLeave(item,$event)" @mouseenter="mouseEnter(item,$event)" @contextmenu="handleContextMenu(item,$event)">\
               {{item.title}}\
               <i title="关闭" v-if="!item.isIndex" @click="removeTab(item.id,$event)"></i>\
               </span>\
           </div>\
           <!--页签右侧的下拉菜单-->\
           <span id="yu-idxTabDMenuBt" v-if="showTabDMenuBt" href="javascript:void(0)" style="display: block;" @mouseenter="tabDMenuBtMouseEnter($event)">\
             <div  ref = "idxTabDMenuBt">\
               <span title="关闭全部" @click="handleCloseAllTabs()">关闭全部</span>\
               <span v-for="(item, index) in data" :title="item.title" :data-key="item.menuId" @click="handleClick(item,$event)">{{item.title}}\
               <!--首页不显示关闭的X-->\
               <i v-if="!item.isIndex" title="关闭" @click="removeTab(item.id, $event)"></i>\
               </span>\
             </div>\
           </span>\
       </div>\
     </div>\
     <!--显示页面的div-->\
     <div  class="yu-idxTabBox" ref="idxTabBox" id="yu-idxTabBox">\
       <!-- 设置key的防止vue就近复用div，复用会导致页面内容显示错误-->\
       <div v-for="(item, index) in data" :key="item.id"  v-show="item.show" :class="{\'ck\':item.checked}" :data-key="item.menuId" :id="\'tabBox_\'+item.menuId"  style="overflow: hidden auto;">\
         <iframe v-if ="item.frame" :src="item.url" :style="commStyle"></iframe>\
       </div>\
     </div>\
     <div v-if="tabPosition === \'bottom\'" class="yu-idxTabs yu-idxTabs-bottom" ref="idxTabsBottom">\
     <!-- tab标题-->\
      <div class="yu-tab-content">\
       <div>\
           <span v-for="(item, index) in data" v-show="item.show" :ref="\'ref_\'+item.menuId" :class="{\'ck\':item.checked}" href="javescript:;" :title="item.title" :data-url="item.routeId" :data-key="item.menuId"\
               @click="handleClick(item,$event)" @dblclick="handleDblClick(item,$event)" @mouseleave="handleMouseLeave(item,$event)" @mouseenter="mouseEnter(item,$event)" @contextmenu="handleContextMenu(item,$event)">\
               {{item.title}}\
               <i title="关闭" v-if="!item.isIndex" @click="removeTab(item.id,$event)"></i>\
               </span>\
           </div>\
           <!--页签右侧的下拉菜单-->\
           <span id="yu-idxTabDMenuBt" v-if="showTabDMenuBt" href="javascript:void(0)" style="display: block;" @mouseenter="tabDMenuBtMouseEnter($event)">\
             <div  ref = "idxTabDMenuBt">\
               <span title="关闭全部" @click="handleCloseAllTabs()">关闭全部</span>\
               <span v-for="(item, index) in data" :title="item.title" :data-key="item.menuId" @click="handleClick(item,$event)">{{item.title}}\
               <!--首页不显示关闭的X-->\
               <i v-if="!item.isIndex" title="关闭" @click="removeTab(item.id, $event)"></i>\
               </span>\
             </div>\
           </span>\
       </div>\
     </div>\
     <!--右键菜单-->\
     <div  class="yu-tabContextmenu" ref="tabContextMenu" @mouseleave="handleMouseLeave">\
       <a @click="handleRefreshTab" href="javascript:void(0)" v-if="rightClickRefresh">刷新当前</a>\
       <a @click="handleCloseCurrentTab" href="javascript:void(0)">关闭当前</a>\
       <a @click="handleCloseOtherTabs" href="javascript:void(0)">关闭其他</a>\
       <a @click="handleCloseAllTabs" href="javascript:void(0)">关闭全部</a>\
       <a @click="handleGetPageProperty" href="javascript:void(0)">页面属性</a>\
     </div>\
   </div>\
   </div>',
    props: {
      // 显示位置
      position: {
        default: 'top',
        type: String
      },
      // 显示模式 页签展示方式 part multi 分组,单页签模式 single
      model: {
        default: 'multi'
      },
      // 最大tab 打开个数
      maxOpenTabs: {
        default: 10,
        type: Number
      },
      // 重复打开是否刷新，默认false
      openDuplicateRefresh: {
        type: Boolean
      },
      // 是否开启页签右键刷新功能，默认true
      rightClickRefresh: {
        default: true,
        type: Boolean
      },
      // 是否开启页签双击刷新功能，默认true
      doubleClickRefresh: {
        default: true,
        type: Boolean
      }
    },
    data: function () {
      return {
        data: [],
        // 激活的tab
        activedTab: {},
        // 首页对象
        homePage: {},
        // 获取临时tab（右键时）
        tmpTab: '',
        // 右键的点击的标志
        rightClickFlag: false,
        // 接收的位置的变量
        tabPosition: '',
        // 单组模式时 首页时标志
        partFlag: true,
        // 页签下拉菜单所占空间宽度
        tabDropdownMenuWidth: 140,
        // 页签按钮内外边距宽
        tabButtonOutWidth: 34,
        // 记录tab 右键菜单高度的临时变量
        tmpContextMenuHeight: -1,
        // 菜单的层级关系
        menuPath: [],
        // 页面区域高度
        clientHeight: '',
        // 单页模式时的一个计数器
        singleCount: 0,
        // tab页签上的功能块的高度
        oprBarHieght: [60, 38],
        // 是否显示页签右侧的下拉
        showTabDMenuBt: false,
        // iframe 时的样式
        commStyle: {
          overflow: 'auto hidden',
          width: '100%',
          height: 'calc(100% - 10px)',
          border: 0
        }
      };
    },
    created: function () {
      var _this = this;
      window.onresize = function () {
        _this.checkTabs();
      };
    },
    computed: {
      /**
      * 计算tab single或part 模式 就显示
      */
      singleModelShow: function () {
        if (this.model == 'single' || this.model == 'part') {
          return true;
        } else {
          return false;
        }
      },
      /**
      * 不是single 模式就显示
      */
      groupModel: function () {
        if (this.model != 'single') {
          return true;
        } else {
          return false;
        }
      }
    },
    watch: {
      /**
      * 监听tab页签的变化
      */
      data: function (val) {
        if (this.model == 'multi') {
          if (val.length > 1) {
            this.showTabDMenuBt = true;
          } else {
            this.showTabDMenuBt = false;
          }
        } else if (this.model == 'part') {
          this.showTabDMenuBt = true;
        }
      }
    },
    methods: {
      /**
      * 添加tab页签,为复用以前addTab 的参数格式，顾options 属性为以前的
      * @param param options 页签对象
      */
      addTab: function (options) {
        // 重复打开问题
        if (!options || !options.id) {
          throw new Error('缺少路由id信息！');
        }
        // 数据转换
        var tab = {};
        var timestamp = this.getTimestamp();
        tab.routeId = options.id;
        tab.title = options.title ? options.title : 'Tab Title';
        tab.menuId = options.key ? options.key : 'other_' + timestamp;
        tab.id = tab.menuId;
        tab.data = options.data ? options.data : '';
        tab.isIndex = options.isIndex;
        tab.show = true;
        tab.frame = false; // 是否iframe 显示页面
        tab.url = '';
        if (options.menuType && options.menuType == 'external') {
          var router = yufp.router.getRoute(tab.routeId);
          tab.frame = true;
          // 去掉route 时拼接的.html
          tab.url = router.html;
        } else {
          // 当指定为其他类型时就无需判断是否为iframe 相关方式（有可能参数中报错http之类的，通过menuType 强制指定类型）
          if (!options.menuType) {
            var router = yufp.router.getRoute(tab.routeId);
            if (router.html.indexOf('https://') > -1 || router.html.indexOf('http://') > -1) {
              tab.frame = true;
              tab.url = router.html;
            }
          }
        }
        // 不为单页模式时
        if (this.model != 'single') {
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == tab.id) {
              // 激活页签
              this.activeTab(tab.menuId);
              this.partFlag = false;
              // 重复打开是否刷新
              if (this.openDuplicateRefresh) {
                this.$nextTick(function () {
                  // 路由跳转
                  if (!tab.frame) {
                    yufp.router.to(tab.routeId, tab.data, 'tabBox_' + tab.menuId);
                  }
                });
              }
              return;
            }
          }
        } else {
          // 单页模式
          if (tab.id == this.activedTab.id) {
            // 重复打开是否刷新
            if (this.openDuplicateRefresh) {
              this.$nextTick(function () {
                // 路由跳转
                if (!tab.frame) {
                  yufp.router.to(tab.routeId, tab.data, 'tabBox_' + tab.menuId);
                }
              });
            }
          } else {
            // 数据转换为菜单支持的格式
            var oldActiveTab = yufp.clone({}, this.activedTab);
            this.activedTab = tab;
            this.homePage = tab;
            this.$emit('active-tab', tab);
            this.partFlag = true;
            // 设置页面宽度
            if (this.singleCount == 0) {
              this.singleCount++;
            }
            // 路由跳转
            if (!tab.frame) {
              // 单页签模式添加了key 所以每次route前需要手动unmount
              yufp.router.unMount('singleTab');
              this.$nextTick(function () {
                yufp.router.to(tab.routeId, tab.data, 'singleTab');
              });
            } else {
              if (!oldActiveTab.frame) {
                yufp.router.unMount('singleTab');
              }
            }
          }
          return;
        }
        var tmpMax = this.maxOpenTabs;
        // 设置最大打开页签数
        if (this.maxOpenTabs && this.maxOpenTabs < 0) {
          tmpMax = 10;
        }
        // 二种模式处理
        // 首页单独显示，当有其他非首页页签时，不显示首页
        if (this.model == 'part') {
          if (tab.isIndex) {
            this.partFlag = true;
            // 重复打开是否刷新
            if (this.openDuplicateRefresh && this.homePage.routeId) {
              // 路由跳转
              this.$nextTick(function () {
                if (!tab.frame) {
                  yufp.router.to(tab.routeId, tab.data, 'singleTab');
                }
              });
            }
            // 首次加载的时候
            if (!this.homePage.routeId) {
              // 暂存首页信息
              this.homePage = tab;
              this.$nextTick(function () {
                yufp.router.to(tab.routeId, tab.data, 'singleTab');
              });
            }
            this.$emit('active-tab', tab);
            return;
          } else {
            this.partFlag = false;
            // 不为0 ，且大于等于 tmpMax （data会添加页面，所以要判断等于情况）
            if (tmpMax !== 0 && this.data.length >= tmpMax) {
              this.removeTab(this.data[0].id);
              this.data.push(tab);
            } else {
              this.data.push(tab);
            }
          }
        } else {
          // 首页时
          if (tab.isIndex) {
            this.homePage = tab;
          }
          // 显示首页和非首页页签
          // 不为0 ，且大于等于 tmpMax （data会添加页面，所以要判断等于情况）
          if (tmpMax !== 0 && this.data.length >= tmpMax) {
            for (var i = 0; i < this.data.length; i++) {
              // 删除不为首页的第一个页签
              if (!this.data[i].isIndex) {
                this.removeTab(this.data[i].id);
                break;
              }
            }
            this.data.push(tab);
          } else {
            this.data.push(tab);
          }
        }
        this.activeTab(tab.menuId);
        this.$nextTick(function () {
          // 路由跳转
          if (!tab.frame) {
            yufp.router.to(tab.routeId, tab.data, 'tabBox_' + tab.menuId);
          }
          // 最后添加的tab 计算width
          this.data[this.data.length - 1].width = this.$refs['ref_' + tab.menuId][0].offsetWidth;
          // 计算tab 并显示或隐藏对应的页签
          this.checkTabs();
        });
      },
      /**
      * 移除页签
      * @param id 菜单id数据
      */
      removeTab: function (id, event) {
        // 阻止事件冒泡
        if (event) {
          event.stopPropagation();
        }
        var tabs = yufp.clone(this.data, []);
        for (var i = 0; i < tabs.length; i++) {
          var element = tabs[i];
          if (element.id === id && element.isIndex !== true) {
            // 释放资源
            if (!element.frame) {
              yufp.router.unMount('tabBox_' + element.menuId);
            }
            this.data.splice(i, 1);
            // 数组中移除对应项
            // 如果是关闭当前，则激活前一个页签
            if (this.activedTab.menuId == element.id) {
              var nextTab = this.data[i - 1] || this.data[i + 1];
              if (nextTab) {
                // 前一个tab 可能是隐藏的
                nextTab.show = true;
                this.$nextTick(function () {
                  this.activeTab(nextTab.menuId);
                });
              }
            } else {
              if (element.show !== false) {
                this.checkTabs();
              }
            }
            break;
          }
        }
        // part 模式，已关闭所有时，显示首页
        if (this.model == 'part' && this.data.length == 0) {
          this.partFlag = true;
          this.$emit('active-tab', {menuId: this.homePage.menuId});
        }

        // 向外暴露移除事件
        this.$emit('remove-tab', id);
      },
      /**
      * 刷新表格
      * @param tab 页签
      */
      refreshTab: function (tab) {
        // 获取到数据然后才跳转
        if (tab.routeId) {
          this.$nextTick(function () {
            if (!tab.frame) {
              yufp.router.to(tab.routeId, tab.data, 'tabBox_' + tab.menuId);// 路由跳转
            } else {
              var url = tab.url;
              tab.url = '';
              this.$nextTick(function () {
                tab.url = url;
              });
            }
          });
        }
      },
      /**
      * 关闭全部
      */
      removeAllTabs: function () {
        var tmpData = yufp.extend(true, [], this.data);
        for (var i = 0; i < tmpData.length; i++) {
          this.removeTab(tmpData[i].id);
        }
      },
      /**
      * 关闭其他
      * @param tab 页签
      */
      removeOtherTabs: function (tab) {
        var tmpData = yufp.extend(true, [], this.data);
        for (var i = 0; i < tmpData.length; i++) {
          if (tmpData[i].id != tab.id && tmpData[i].isIndex !== true) {
            this.removeTab(tmpData[i].id);
          }
        }
      },
      /**
      * 激活页签
      * @param menuId 菜单id
      */
      activeTab: function (menuId, event) {
        for (var i = 0, length = this.data.length; i < length; i++) {
          var tmp = this.data[i];
          if (tmp.id == menuId) {
            // 存储当前激活的tab
            this.activedTab = tmp;
            this.$set(tmp, 'checked', true);
            this.$set(tmp, 'show', true);
            this.$emit('active-tab', tmp);
            // 渲染完成后再计算宽度
            this.$nextTick(function () {
              this.checkTabs();
            });
          } else {
            this.$set(tmp, 'checked', false);
          }
        }
      },
      /**
      *  获取页签参数
      * @param id  页签标识，无id时，返回当前激活的tab id
      */
      getTab: function (id) {
        var _data = this.data;
        var id = id || this.activedTab.id;
        for (var i = 0, length = _data.length; i < length; i++) {
          if (_data[i].id == id) {
            return _data[i];
          }
        }
      },
      /**
      * 获取时间
      */
      getTimestamp: function () {
        return (new Date()).valueOf();
      },
      /**
      * tab 的点击事件
      * @param tab 对象
      * @param event 事件对象
      */
      handleClick: function (tab, event) {
        this.activeTab(tab.menuId);
        // 对外暴露 tab 点击事件
        this.$emit('tab-click', tab, event);
      },
      /**
      * 双击刷新
      * @param tab 对象
      * @param event 事件对象
      */
      handleDblClick: function (tab, event) {
        if (this.doubleClickRefresh) {
          this.refreshTab(tab);
        }
      },
      /**
      * 右击事件
      * @param tab tab对象
      * @param event 事件对象
      */
      handleContextMenu: function (tab, event) {
        this.tmpTab = tab;
        this.preventDefault();
        // 首页没有右键功能
        if (tab.id == this.homePage.id) {
          return;
        }
        // 获取我们自定义的右键菜单
        var menu = this.$refs.tabContextMenu;
        // 改变自定义菜单的宽，让它显示出来
        menu.style = 'display:block;position:fixed';
        // 根据事件对象中鼠标点击的位置，进行定位
        menu.style.left = event.clientX + 'px';
        if (this.tabPosition == 'bottom') {
          // tmpContextMenuHeight 为-1 表示没有计算过右键菜单高度，否则计算过，后面直接用值
          if (this.tmpContextMenuHeight == -1) {
            this.$nextTick(function () {
              this.tmpContextMenuHeight = menu.clientHeight;
              var tmp = (event.clientY - this.tmpContextMenuHeight) + 'px';
              menu.style.top = tmp;
            });
          } else {
            // 计算过，后面直接用值
            menu.style.top = (event.clientY - this.tmpContextMenuHeight) + 'px';
          }
        } else {
          menu.style.top = event.clientY + 'px';
        }
        this.rightClickFlag = true;
      },
      /**
      * 刷新事件
      */
      handleRefreshTab: function () {
        this.activeTab(this.tmpTab.menuId);
        this.refreshTab(this.tmpTab);
        this.setDisplyNone();
      },
      /**
      * 关闭当前页签
      */
      handleCloseCurrentTab: function () {
        this.removeTab(this.tmpTab.id);
        this.setDisplyNone();
      },
      /**
      * 关闭其他页签
      */
      handleCloseOtherTabs: function () {
        this.removeOtherTabs(this.tmpTab);
        this.setDisplyNone();
      },
      /**
      * 关闭全部页签
      */
      handleCloseAllTabs: function () {
        this.removeAllTabs();
        this.setDisplyNone();
      },
      /**
      * 获取tab页属性
      */
      handleGetPageProperty: function () {
        var tab = this.getTab(this.tmpTab.id);
        var router = yufp.router.getRoute(tab.routeId);
        var h = this.$createElement;
        var s1 = {style: 'display:block;clear:left;padding: 3px 0;font-size:14px;position: relative;height: auto;'};
        var s2 = {style: 'float:left;text-align:right;width:100px;left:0;top:3px;position: absolute;'};
        var s3 = {style: 'float:left;display:block;margin-left:100px;word-break: break-all;'};
        var _this = this;
        this.$msgbox({
          title: '页面属性',
          confirmButtonText: '关闭',
          callback: function () {},
          message: h('div', [
            h('p', s1, [
              h('label', s2, 'tab title：'),
              h('span', s3, tab.title)
            ]),
            h('p', s1, [
              h('label', s2, 'tab key：'),
              h('span', s3, tab.menuId)
            ]),
            h('p', s1, [
              h('label', s2, 'tab id：'),
              h('span', s3, tab.routeId)
            ]),
            h('p', s1, [
              h('label', s2, 'router html：'),
              h('span', { style: s3.style}, [router.html, h('el-button', {props: {type: 'primary', size: 'mini'},
                attrs: {id: 'htmlBtn'},
                on: {
                  click: function () {

                  }
                }}, '复制')])

            ]),
            h('p', s1, [
              h('label', s2, 'router js：'),
              h('span', s3, router.js)
            ])
          ])
        });
        setTimeout(function () {
          yufp.util.setClipBoardData('#htmlBtn', router.html, function () {
            _this.$message({
              type: 'info',
              message: '复制成功！'
            });
          }, function () {
            _this.$message({
              type: 'error',
              message: '当前浏览器不支持此功能，请手动复制。'
            });
          });
        }, 500);

        this.setDisplyNone();
      },
      /**
      * 鼠标离开事件
      * @param tab tab对象
      * @param event 事件对象
      */
      handleMouseLeave: function (tab, event) {
        // mouseleave事件，右键也会触发（未查明），所以添加标志处理
        if (!this.rightClickFlag) {
          this.$refs.tabContextMenu.style.display = 'none';
        } else {
          this.rightClickFlag = false;
        }
      },
      /**
      * 取消默认事件
      */
      preventDefault: function () {
        var event = window.event || event;
        if (document.all) {
          // 支持IE
          event.returnValue = false;
        } else {
          // IE不支持
          event.preventDefault();
        }
      },
      /**
      * 设置右键菜单的样式
      */
      setDisplyNone: function () {
        this.$refs.tabContextMenu.style.display = 'none';
      },
      /**
      * 鼠标移到页签上的事件
      * @param tab tab对象
      * @param event 事件对象
      */
      mouseEnter: function (tab, event) {
        this.$emit('mouse-enter', tab, event);
      },
      /**
      * 菜单右侧下拉框点击事件
      */
      tabDMenuBtMouseEnter: function () {
        if (this.tabPosition == 'bottom') {
          var menuBt = this.$refs.idxTabDMenuBt;
          menuBt.style.top = -menuBt.clientHeight + 'px';
        }
      },
      /**
      * 页签按钮显示适配
      */
      checkTabs: function () {
        var _this = this;
        // 单页签模式时不用计算页签适配
        if (this.model == 'single') {
          return;
        }
        // 获取当前tab按钮容器宽度
        var _getSW = function () {
          if (_this.tabPosition == 'top') {
            return _this.$refs.idxTabs.children[0].offsetWidth;
          } else if (_this.tabPosition == 'bottom') {
            return _this.$refs.idxTabsBottom.children[0].offsetWidth;
          }
        };
        // 获取tab按钮可显示的最大空间宽度
        var _getMaxW = function () {
          if (_this.tabPosition === 'top') {
            return _this.$refs.idxTabs.offsetWidth - _this.tabDropdownMenuWidth - 5;
          } else if (_this.tabPosition === 'bottom') {
            return _this.$refs.idxTabsBottom.offsetWidth - _this.tabDropdownMenuWidth - 5;
          }
        };
        var maxw = _getMaxW();
        var sw = _getSW();
        if (sw > maxw && maxw > 0) {
          this.calcEnlarge(sw, maxw);
        } else {
          this.calReduce(sw, maxw);
        }
      },
      /**
      * tab 页签增加或者已经有页签隐藏然后被激活后
      * 递归计算当前页签width是否大于最大宽度
      * @param sw tab页签的总宽度
      * @param maxwidth tab按钮可显示的最大空间宽度
      */
      calcEnlarge: function (sw, maxwidth) {
        for (var i = 0; i < this.data.length; i++) {
          var element = this.data[i];
          // show 为true 且id 不为当前激活的页签（如果不加id判断，可能导致第一个激活的一直隐藏）,且非首页
          if (element.show && this.activedTab.id !== element.id && element.isIndex !== true) {
            element.show = false;
            sw = sw - element.width;
            if (sw > maxwidth) {
              this.$nextTick(function () {
                this.calcEnlarge(sw, maxwidth);
              });
            }
            break;
          }
        }
      },
      /**
      * tab页签较少时调用
      * 递归计算
      * @param sw tab页签的总宽度
      * @param maxwidth tab按钮可显示的最大空间宽度
      */
      calReduce: function (sw, maxwidth) {
        for (var i = 0; i < this.data.length; i++) {
          var element = this.data[i];
          if (!element.show) {
            sw = sw + element.width;
            if (sw <= maxwidth) {
              element.show = true;
              this.$nextTick(function () {
                this.calReduce(sw, maxwidth);
              });
            }
            break;
          }
        }
      },
      /**
      * 设置页面内容的size
      */
      getContentSize: function () {
        // tab 页时高度计算
        var content = {};
        if (this.model != 'single' && this.data.length != 0) {
          // 计算高度
          // 页面高度
          content = this.$refs.idxTabBox;
        } else {
          // 单页签时的高度计算
          content = this.$refs.singleTab;
        }
        // 页面高度,宽度
        return {
          height: content.clientHeight,
          width: content.clientWidth
        };
      }
    },
    mounted: function () {
      // 只支持 bottom和其他变量
      if (this.position == 'bottom') {
        this.tabPosition = this.position;
      } else {
        this.tabPosition = 'top';
      }
      // 分组模式时，单组标志位false
      if (this.model != 'part') {
        this.partFlag = false;
      }
      // bottom 时调整样式
      // if (this.tabPosition == 'bottom') {
      //   this.$refs.idxTabs.style = 'position:fixed;width:100%;z-index: 1;bottom:6px;';
      // }
    },
    destory: function () {
      window.onresize = null;
    }
  });
}(Vue, 'yu-base-tab'));