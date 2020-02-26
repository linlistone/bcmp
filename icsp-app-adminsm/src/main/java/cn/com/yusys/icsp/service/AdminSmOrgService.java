package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmOrg;
import cn.com.yusys.icsp.repository.mapper.AdminSmOrgMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 系统机构表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-26 20:10:01
 */
@Service
@Transactional
public class AdminSmOrgService extends BaseService {


	@Autowired
	private AdminSmOrgMapper adminSmOrgMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(AdminSmOrg adminSmOrg) throws Exception {
		adminSmOrg.setOrgId(createUUId());
		return adminSmOrgMapper.insert(adminSmOrg);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by OrgId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public AdminSmOrg show(String orgId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("orgId", orgId);
		PageInfo<AdminSmOrg> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + orgId);
		}
		AdminSmOrg adminSmOrg = pageInfo.getList().get(0);
		return  adminSmOrg;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<AdminSmOrg> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmOrg> list = adminSmOrgMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(AdminSmOrg adminSmOrg) throws Exception {
		return adminSmOrgMapper.updateByPrimaryKey(adminSmOrg);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String orgId) throws Exception {
		return adminSmOrgMapper.deleteByPrimaryKey(orgId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return adminSmOrgMapper.deleteByIds(ids);
	}
}

