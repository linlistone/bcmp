package cn.com.yusys.icsp.repository.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceLocation;



/**
 * 设备定位历史
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 22:39:18
 */
//@Mapper
public interface BcmpSmDeviceLocationMapper {
	/**
	 * @方法名称: insert
	 * @方法描述: 插入 - 只插入非空字段
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int insert(BcmpSmDeviceLocation record);

	/**
	 * @方法名称:selectByModel
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<BcmpSmDeviceLocation> selectByModel(QueryModel model);

	/**
	 * @方法名称: updateByPrimaryKey
	 * @方法描述: 根据主键更新
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int updateByPrimaryKey(BcmpSmDeviceLocation record);

	/**
	 * @方法名称: deleteByPrimaryKey
	 * @方法描述: 根据主键删除
	 * @参数与返回说明: modId - 主键
	 * @算法描述: 无
	 */
	int deleteByPrimaryKey(@Param("locationId") String locationId);

	/**
	 * @方法名称: deleteByIds
	 * @方法描述: 根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int deleteByIds(@Param("ids") String ids);
	
}
