package cn.com.yusys.icsp.repository.mapper;

import cn.com.yusys.icsp.domain.AdminSmResContr;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 系统功能控制点表
 * 
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-10 00:05:20
 */
//@Mapper
public interface AdminSmResContrMapper {
	/**
	 * @方法名称: insert
	 * @方法描述: 插入 - 只插入非空字段
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int insert(AdminSmResContr record);

	/**
	 * @方法名称:selectByModel
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<AdminSmResContr> selectByModel(QueryModel model);

	/**
	 * @方法名称: updateByPrimaryKey
	 * @方法描述: 根据主键更新
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int updateByPrimaryKey(AdminSmResContr record);

	/**
	 * @方法名称: deleteByPrimaryKey
	 * @方法描述: 根据主键删除
	 * @参数与返回说明: modId - 主键
	 * @算法描述: 无
	 */
	int deleteByPrimaryKey(@Param("contrId") String contrId);

	/**
	 * @方法名称: deleteByIds
	 * @方法描述: 根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	int deleteByIds(@Param("ids") String ids);

	/**
	 * 初始化左侧树,层级为模块、业务功能管理
	 * 
	 * @param model
	 * @return
	 */
	List<Map<String, Object>> getFuncTree(QueryModel model);

	/**
	 * @方法名称: ifCodeRepeat
	 * @方法描述: 保存控制点信息前，判断业务功能是否已关联相同控制操作代码的控制点
	 * @参数与返回说明:
	 * @算法描述:
	 */
	List<Map<String, Object>> ifCodeRepeat(Map<?, ?> map);

}
