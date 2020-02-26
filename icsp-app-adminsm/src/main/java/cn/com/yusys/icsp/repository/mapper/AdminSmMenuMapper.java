package cn.com.yusys.icsp.repository.mapper;

import cn.com.yusys.icsp.domain.AdminSmMenu;
import cn.com.yusys.icsp.domain.MenuBean;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminSmMenuMapper {

	/**
	 * @方法名称: insert
	 * @方法描述: 插入 - 只插入非空字段
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int insert(AdminSmMenu record);

	/**
	 * @方法名称:selectByModel
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<AdminSmMenu> selectByModel(QueryModel model);

	/**
	 * @方法名称: updateByPrimaryKey
	 * @方法描述: 根据主键更新
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int updateByPrimaryKey(AdminSmMenu record);

	/**
	 * @方法名称: deleteByPrimaryKey
	 * @方法描述: 根据主键删除
	 * @参数与返回说明: menuId - 主键
	 * @算法描述: 无
	 */
	int deleteByPrimaryKey(@Param("menuId") String menuId);

	/**
	 * @方法名称: deleteByIds
	 * @方法描述: 根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int deleteByIds(@Param("ids") String ids);

	/**
	 * @方法名称:getMenuInfo
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	MenuBean getMenuBean(String menuId);

	/**
	 * @方法名称:getDeleteMenuId
	 * @方法描述:删除时查询是否有子节点菜单，获取选中菜单menuId及相应的子节点菜单menuId
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<String> getDeleteMenuIds(String menuId);
}