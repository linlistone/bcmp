package cn.com.yusys.icsp.repository.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpCmNodeinfo;



/**
 * 节点信息表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:08
 */
//@Mapper
public interface BcmpCmNodeinfoMapper {
	/**
	 * @方法名称: insert
	 * @方法描述: 插入 - 只插入非空字段
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int insert(BcmpCmNodeinfo record);

	/**
	 * @方法名称:selectByModel
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<BcmpCmNodeinfo> selectByModel(QueryModel model);

	/**
	 * @方法名称: updateByPrimaryKey
	 * @方法描述: 根据主键更新
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int updateByPrimaryKey(BcmpCmNodeinfo record);

	/**
	 * @方法名称: deleteByPrimaryKey
	 * @方法描述: 根据主键删除
	 * @参数与返回说明: modId - 主键
	 * @算法描述: 无
	 */
	int deleteByPrimaryKey(@Param("nodeId" ) String nodeId);

	/**
	 * @方法名称: deleteByIds
	 * @方法描述: 根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int deleteByIds(@Param("ids" ) String ids);
	
}
