/**
 * 通用页面，用于嵌入iframe
 */
define(function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          commStyle: {
            height: yufp.frame.size().height - 10 + 'px',
            overflow: 'auto',
            overflowX: 'hidden',
            width: '100%'
          },
          pageurl: ''
        };
      },
      mounted: function () {
        var router = yufp.router.getRoute(hashCode);
        var html = router.html;
        this.pageurl = decodeURIComponent(html.substring(html.indexOf('?url=http') + 5, html.length));
      }
    });
  };
});