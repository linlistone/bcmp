/**
 * @created by jiangcheng 2017-11-15
 * @updated by
 * @description 登录页
 */
define(['./libs/jsencrypt/jsencrypt.min.js'],function (require, exports) {
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
      var encodePwd = encodePassword(pwdEl.value );
      var data = {
        username: nameEl.value,
        password: encodePwd,
        grant_type: 'password',
        passwordType:'2',
        sysId:'1cab27def8fb4c0f9486dcf844b783c0'
      };
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Basic d2ViX2FwcDo='
      };
      yufp.service.request({
        needToken: false,
        // url: backend.uaaService + '/common/login',
        path: microServiceHost.uaaService+"/oauth/token",
        method: 'POST',
        headers: headers,
        data: data,
        callback: function (code, message, response) {
          //登录成功
          if (response && response.access_token) {
            //登录成功(警告超过120天未修改密码)
            if (response.code && response.code == '100002') {
              var strategyMessage = response.strategyMessage;
              // if (strategyMessage) {
              //   var i = 0;
              //   var warn = setInterval(function () {
              //     _this.$notify({
              //       message: strategyMessage[i].message,
              //       type: response.level
              //     });
              //     if (i < strategyMessage.length - 1) {
              //       i++;
              //     } else {
              //       clearInterval(warn);
              //     }
              //   }, 10);
              // }
              // console.log('fox.eae111111111111111', fox.router)
            }
            // if (response.creStrategyName == 'LOGIN_FIRST_RULE') {
              // _this.localToken = response;
              // _this.dialogVisible = true;
            // } else {
              yufp.service.putToken({
                access_token: response.access_token,
                refresh_token: response.refresh_token,
                expires_in: response.expires_in
              });
              yufp.session.loadUserSession(function () {
                yufp.router.to('frame');
              });
              // fox.localsession.loadUserSession(function () {
                // var userStore = fox.localsession.storageGet(fox.localsession.settings.userStoreKey);
                // let m_menu_data = fox.localsession.storageGet(fox.localsession.settings.menuStoreKey);
                //
                // //保存到session中
                // fox.sessionStorage.put("global", {
                //   menu: m_menu_data,
                //   title: "统一门户",
                //   name: userStore.userName,
                //   level: "VIP",
                //   head: "themes/pc/default/images/img.png"
                // })
                // fox.router.to('frame');
              // });
            // }
          } else {
            var msgEl1 = document.getElementById('msg');
            var msg = response && response.message ? response.message : '登录失败，请联系系统管理员！';
            msgEl1.innerText = msg;
            msgEl1.style.display = 'block';
          }

          // if (code == '0') {
            // var token = response.data.sessionId;
            // yufp.service.putToken(token);
            // yufp.session.loadUserSession(function () {
            //   yufp.router.to('frame');
            // });
          // } else {
            // var msgEl1 = document.getElementById('msg');
            // var msg = message != undefined ? message : '登录失败，请联系系统管理员！';
            // msgEl1.innerText = msg;
            // msgEl1.style.display = 'block';
          // }
        }
      });
    };
    // 登录密码加密
    var encodePassword = function (pwd) {
      var encrypt = new window.JSEncrypt();
      encrypt.setPublicKey(yufp.settings.RSAPublicKey);
      var encryptPwd = encrypt.encrypt(pwd);
      var encodePwd = encodeURIComponent(encryptPwd);
      return encodePwd;
    };
    // 匹配密码加密
    var matchPassword = function (pwd) {
      var encrypt = new window.JSEncrypt();
      encrypt.setPublicKey(yufp.settings.RSAPublicKey);
      var encryptPwd = encrypt.encrypt(pwd);
      return encryptPwd;
    };
    document.getElementById('submitBtn').onclick = loginFn;
  };
  exports.destroy = function (id, cite) {
    // document.getElementById('submitBtn').onclick = null;
  };
});