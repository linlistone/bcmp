package cn.com.yusys.icsp.common.web.rest;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.enums.StatusCode;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/common")
public class LoginResource extends BaseResouce {

    private static final Logger logger = LoggerFactory.getLogger(LoginResource.class);

    /**
     * 用户登录
     *
     * @param username
     * @param password
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/login")
    public ResultDto<Map<String, Object>> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        logger.debug("用户校验 username:" + username + " password:" + password);
        ResultDto<Map<String, Object>> resultDto = new ResultDto<>();
        //校验验证码
        try {
            //提交登录
            Map<String, Object> map = new HashMap<>();
          //  UserBean userBean = loginService.getUserInfo(username, "");
            map.put("sessionId", username);
            resultDto.setData(map);
        } catch (Exception e) {
            return new ResultDto(StatusCode.UnknownError);
        }
        return resultDto;
    }

    /**
     * 用户退出
     *
     * @param
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/logout")
    public ResultDto<Boolean> logout() {
        logger.debug("用户退出");
        ResultDto<Boolean> resultDto = new ResultDto<Boolean>();
        return resultDto;
    }


}