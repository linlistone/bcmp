package cn.com.yusys.icsp.adminsm.rest.web;

import cn.com.yusys.icsp.adminsm.domain.MenuContrBean;
import cn.com.yusys.icsp.adminsm.domain.UserBean;
import cn.com.yusys.icsp.adminsm.service.UserService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserResource extends BaseResouce {

    private static final Logger logger = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private UserService userService;

    /**
     * 用户会话信息
     *
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/info")
    public ResultDto<UserBean> info() throws Exception {
        logger.debug("用户会话信息 ");
        ResultDto<UserBean> resultDto = new ResultDto<UserBean>();
        UserBean userBean=userService.getUserInfo("admin", SYSID);
        resultDto.setData(userBean);
        return resultDto;
    }

    /**
     * 用户会话信息
     *
     * @param
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/menuandcontr")
    public ResultDto<MenuContrBean> menuandcontr()
            throws Exception {
        logger.debug("用户会话信息 ");
        ResultDto<MenuContrBean> resultDto = new ResultDto<MenuContrBean>();
        String sessionId = "admin";
        MenuContrBean menuContrDTO = userService.getMenuandContr(
                sessionId, SYSID);
        resultDto.setData(menuContrDTO);
        return resultDto;
    }

}