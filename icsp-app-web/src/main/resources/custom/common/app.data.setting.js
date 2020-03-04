/**
 * @Created by zhangkun6 zhangkun6@yusys.com.cn on 2019-9-4.
 * @updated by
 * @description 组件属性全局配置文件 。
 * 1.在$YUWPUI_CONF 对象中添加需要修改属性的组件名称（组件名称规则：去掉组件名称中“yu-”，并将剩余名称中包含的短横线去掉。例如：yu-xform-item组件，在这里配置名称未xformitem）
 * 2.组件对象中对应的属性名称（api中为短横线（-）的属性，请按照驼峰方式填写）
 */
window.$YUWPUI_CONF = {
  // 示例
  /**
  xtable: {
    jsonData: 'data.dataList'
  }
   */

  xtable: {
	// 请求展示的loading配置项
    requestLoadOption: function() {
      return {
        // 是否展示加载loading
        show: true
      };
    }
  }
};