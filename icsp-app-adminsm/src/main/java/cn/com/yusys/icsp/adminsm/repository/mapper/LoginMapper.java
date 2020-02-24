package cn.com.yusys.icsp.adminsm.repository.mapper;

import cn.com.yusys.icsp.adminsm.domain.AdminSmLogicSys;
import cn.com.yusys.icsp.adminsm.domain.AdminSmRole;
import cn.com.yusys.icsp.adminsm.domain.MenuBean;
import cn.com.yusys.icsp.adminsm.domain.UserBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LoginMapper {
    /**
     * 查询所有menu
     *
     * @param sysId
     * @return
     */
    public List<MenuBean> selectAllMenu(@Param("sysId") String sysId);

    /**
     * 查询用户信息
     *
     * @param userId
     * @return
     */
    public UserBean selectUserInfo(@Param("userId") String userId);

    /**
     * 查询用户角色信息
     *
     * @param userId
     * @param orgId
     * @return
     */
    public List<AdminSmRole> selectUserRoles(@Param("userId") String userId,
                                             @Param("orgId") String orgId);

    /**
     * 查询指定逻辑系统
     *
     * @param sysId
     * @return
     */
    public AdminSmLogicSys selectLogicSys(@Param("sysId") String sysId);
}
