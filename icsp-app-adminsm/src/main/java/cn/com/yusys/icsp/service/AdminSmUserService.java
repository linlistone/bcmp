package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmUser;
import cn.com.yusys.icsp.repository.mapper.AdminSmUserMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 系统用户表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-02 17:23:53
 */
@Service
@Transactional
public class AdminSmUserService extends BaseService {

	@Autowired
	private AdminSmUserMapper adminSmUserMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(AdminSmUser adminSmUser) throws Exception {
		adminSmUser.setUserId(createUUId());
		return adminSmUserMapper.insert(adminSmUser);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by UserId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public AdminSmUser show(String userId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("userId", userId);
		PageInfo<AdminSmUser> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + userId);
		}
		AdminSmUser adminSmUser = pageInfo.getList().get(0);
		return  adminSmUser;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<AdminSmUser> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmUser> list = adminSmUserMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(AdminSmUser adminSmUser) throws Exception {
		return adminSmUserMapper.updateByPrimaryKey(adminSmUser);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String userId) throws Exception {
		return adminSmUserMapper.deleteByPrimaryKey(userId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return adminSmUserMapper.deleteByIds(ids);
	}
}

