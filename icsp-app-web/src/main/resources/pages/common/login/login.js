/**
 * @created by jiangcheng 2017-11-15
 * @updated by
 * @description 登录页
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var loginFn = function () {
      var nameEl = document.getElementById('username');
      var pwdEl = document.getElementById('password');
      var msgEl = document.getElementById('msg');
      if (nameEl.value == '') {
        msgEl.innerText = '请输入用户名!';
        msgEl.style.display = 'block';
        nameEl.focus();
        return;
      }
      if (pwdEl.value == '') {
        msgEl.innerText = '请输入密码!';
        msgEl.style.display = 'block';
        pwdEl.focus();
        return;
      }
      msgEl.style.display = 'none';

      var data = {
        username: nameEl.value,
        password: pwdEl.value,
        grantType: 'password'
      };
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Basic d2ViX2FwcDo='
      };
      yufp.service.request({
        needToken: false,
        url: backend.uaaService + '/common/login',
        method: 'post',
        headers: headers,
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            var token = response.data.sessionId;
            yufp.service.putToken(token);
            yufp.session.loadUserSession(function () {
              yufp.router.to('frame');
            });
          } else {
            var msgEl1 = document.getElementById('msg');
            var msg = message != undefined ? message : '登录失败，请联系系统管理员！';
            msgEl1.innerText = msg;
            msgEl1.style.display = 'block';
          }
        }
      });
    };
    document.getElementById('submitBtn').onclick = loginFn;
  };
  exports.destroy = function (id, cite) {
    // document.getElementById('submitBtn').onclick = null;
  };
});