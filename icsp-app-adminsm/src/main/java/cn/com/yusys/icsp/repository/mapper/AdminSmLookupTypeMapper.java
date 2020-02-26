package cn.com.yusys.icsp.repository.mapper;

import cn.com.yusys.icsp.domain.AdminSmLookupType;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;



/**
 * 字典分类别
 * 
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:30:35
 */
@Mapper
public interface AdminSmLookupTypeMapper {
	/**
	 * @方法名称: insert
	 * @方法描述: 插入 - 只插入非空字段
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int insert(AdminSmLookupType record);

	/**
	 * @方法名称:selectByModel
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<AdminSmLookupType> selectByModel(QueryModel model);

	/**
	 * @方法名称: updateByPrimaryKey
	 * @方法描述: 根据主键更新
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int updateByPrimaryKey(AdminSmLookupType record);

	/**
	 * @方法名称: deleteByPrimaryKey
	 * @方法描述: 根据主键删除
	 * @参数与返回说明: modId - 主键
	 * @算法描述: 无
	 */
	int deleteByPrimaryKey(@Param("lookupTypeId") String lookupTypeId);

	/**
	 * @方法名称: deleteByIds
	 * @方法描述: 根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int deleteByIds(@Param("ids") String ids);
	
	
}
