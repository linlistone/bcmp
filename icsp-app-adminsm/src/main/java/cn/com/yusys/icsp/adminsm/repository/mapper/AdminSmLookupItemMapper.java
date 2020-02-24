package cn.com.yusys.icsp.adminsm.repository.mapper;

import cn.com.yusys.icsp.adminsm.domain.AdminSmLookupItem;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @项目名称：yusp-admin
 * @类名称：AdminSmLookupItemMapper
 * @类描述：数据字典内容
 * @功能描述:
 * @创建人：liaoxd@yusys.com.cn @创建时间：2017-12-12 21:22 @修改备注：
 * @修改日期 修改人员 修改原因 -------- -------- ----------------------------------------
 * @version 1.0.0
 * @Copyright (c) 2017宇信科技-版权所有
 */
public interface AdminSmLookupItemMapper {

	/**
	 * @方法名称: insert
	 * @方法描述: 插入 - 只插入非空字段
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int insert(AdminSmLookupItem record);

	/**
	 * @方法名称:selectByModel
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<AdminSmLookupItem> selectByModel(QueryModel model);

	/**
	 * @方法名称: updateByPrimaryKey
	 * @方法描述: 根据主键更新
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int updateByPrimaryKey(AdminSmLookupItem record);

	/**
	 * @方法名称: deleteByPrimaryKey
	 * @方法描述: 根据主键删除
	 * @参数与返回说明: modId - 主键
	 * @算法描述: 无
	 */
	int deleteByPrimaryKey(@Param("lookupItemId") String lookupItemId);

	/**
	 * @方法名称: deleteByLookupCode
	 * @方法描述: 根据lookupId删除
	 * @参数与返回说明: - 主键
	 * @算法描述: 无
	 */
	int deleteByLookupCode(@Param("lookupCode") String lookupCode);

	/**
	 * @方法名称: deleteByIds
	 * @方法描述: 根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int deleteByIds(@Param("ids") String ids);

	/**
	 * @方法名称: getLookupCodeListByLookUpCodes
	 * @方法描述: 数据字典
	 * @参数与返回说明:
	 * @算法描述: 无
	 * @param params
	 * @return
	 */
	List<AdminSmLookupItem> getLookupCodeListByLookUpCodes(List<?> params);

	int deleteBylookupTypes(@Param("ids") String ids);
}
