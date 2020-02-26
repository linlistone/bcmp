package cn.com.yusys.icsp.repository.mapper;

import cn.com.yusys.icsp.base.bean.UserBean;
import org.apache.ibatis.annotations.Param;

public interface CommonMapper {

    /**
     * 查询用户信息
     *
     * @param userId
     * @return
     */
    public UserBean selectUserInfo(@Param("userId") String userId);


}
