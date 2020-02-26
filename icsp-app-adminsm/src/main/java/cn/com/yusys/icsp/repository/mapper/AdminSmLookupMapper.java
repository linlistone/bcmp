package cn.com.yusys.icsp.repository.mapper;

import cn.com.yusys.icsp.domain.AdminSmLookup;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 数据字典表
 * 
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:47:03
 */
//@Mapper
public interface AdminSmLookupMapper {
	/**
	 * @方法名称: insert
	 * @方法描述: 插入 - 只插入非空字段
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int insert(AdminSmLookup record);

	/**
	 * @方法名称:selectByModel
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<AdminSmLookup> selectByModel(QueryModel model);

	/**
	 * @方法名称: updateByPrimaryKey
	 * @方法描述: 根据主键更新
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int updateByPrimaryKey(AdminSmLookup record);

	/**
	 * @方法名称: deleteByPrimaryKey
	 * @方法描述: 根据主键删除
	 * @参数与返回说明: modId - 主键
	 * @算法描述: 无
	 */
	int deleteByPrimaryKey(@Param("lookupId") String lookupId);

	/**
	 * @方法名称: deleteByIds
	 * @方法描述: 根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int deleteByIds(@Param("ids") String ids);

	
	int deleteBylookupTypes(@Param("ids") String ids);

}
