package cn.com.yusys.icsp.adminsm.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.adminsm.domain.AdminSmRole;
import cn.com.yusys.icsp.adminsm.repository.mapper.AdminSmRoleMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;

import cn.com.yusys.icsp.common.util.DateUtil;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 系统角色表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-26 11:59:53
 */
@Service
@Transactional
public class AdminSmRoleService extends BaseService {


	@Autowired
	private AdminSmRoleMapper adminSmRoleMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(AdminSmRole adminSmRole) throws Exception {
		adminSmRole.setRoleId(createUUId());
		adminSmRole.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmRoleMapper.insert(adminSmRole);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by RoleId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public AdminSmRole show(String roleId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("roleId", roleId);
		List<AdminSmRole> list = index(model);
		if (list == null || list.isEmpty()) {
			throw new ICSPException("数据不存在" + roleId);
		}
		AdminSmRole adminSmRole = list.get(0);
		return  adminSmRole;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public List<AdminSmRole> index(QueryModel model)
			throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmRole> list = adminSmRoleMapper.selectByModel(model);
		PageHelper.clearPage();
		return list;
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(AdminSmRole adminSmRole) throws Exception {
		adminSmRole.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmRoleMapper.updateByPrimaryKey(adminSmRole);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String roleId) throws Exception {
		return adminSmRoleMapper.deleteByPrimaryKey(roleId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return adminSmRoleMapper.deleteByIds(ids);
	}
}
