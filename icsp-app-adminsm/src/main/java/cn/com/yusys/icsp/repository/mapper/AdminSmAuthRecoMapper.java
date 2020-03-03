/*
 * 代码生成器自动生成的
 * Since 2008 - 2019
 *
 */
package cn.com.yusys.icsp.repository.mapper;
import cn.com.yusys.icsp.domain.AdminSmAuthReco;

import java.util.List;
import java.util.Map;

/**
 * @项目名称: sp-platform-oca-core模块
 * @类名称: AdminSmAuthRecoMapper
 * @类描述: #Dao类
 * @功能描述:
 * @创建人: c00177
 * @创建时间: 2019-06-26 18:29:50
 * @修改备注:
 * @修改记录: 修改时间 修改人员 修改原因
 *        -------------------------------------------------------------
 * @version 1.0.0
 * @Copyright (c) 2017宇信科技-版权所有
 */
public interface AdminSmAuthRecoMapper {

    int insert(AdminSmAuthReco reco);

    List<Map<String, Object>> getObjectResourcInfo(Map<String, Object> p0);

    int insertBatchByOracle(List<AdminSmAuthReco> p0);

    int deleteRelInfo(Map<String, Object> p0);
    /**
     *
     * @方法名称: quryUpIdById
     * @方法描述: 根据菜单ID查询所有父节点ID包含本身节点
     * @参数与返回说明:
     * @算法描述:
     */
    List<Map<String, Object>> quryUpIdById(List<?> paramMap);

    List<Map<String, Object>> authEcoExportExcel(Map<String, Object> p0);

    List<Map<String, Object>> queryMenuTree(String p0);

    List<Map<String, Object>> queryDataPowerTree(String p0);

    int deleteMenuInfo(String p0);

    int deleteDataAuth(String[] p0);

    int deleteContrInfo(String[] p0);

}