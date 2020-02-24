package cn.com.yusys.icsp.adminsm.service;

import cn.com.yusys.icsp.adminsm.domain.*;
import cn.com.yusys.icsp.adminsm.repository.mapper.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {
    @Autowired
    private LoginMapper loginMapper;


    /**
     * 用户登录校验
     *
     * @param loginCode
     * @param sysId
     * @return
     */
    public UserBean getUserInfo(String loginCode, String sysId) {

        UserBean userDto = loginMapper.selectUserInfo(loginCode);
        if (userDto == null) {
            throw new RuntimeException("用户不存在" + loginCode);
        }

        List<AdminSmRole> roles = loginMapper
                .selectUserRoles(loginCode, userDto.getOrgId());

        userDto.setRoles(roles);

        AdminSmLogicSys logicSys = loginMapper.selectLogicSys(sysId);

        userDto.setLogicSys(logicSys);

        return userDto;
    }

    public MenuContrBean getMenuandContr(String loginCode, String sysId) {
        MenuContrBean menuContrDTO = new MenuContrBean();

        List<MenuBean> menuList = loginMapper.selectAllMenu(sysId);

        menuContrDTO.setMenus(menuList);

        List<ContrBean> contrList = new ArrayList<ContrBean>();

        menuContrDTO.setContrs(contrList);

        return menuContrDTO;

    }
}