package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmInstu;
import cn.com.yusys.icsp.repository.mapper.AdminSmInstuMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 金融机构表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 16:47:36
 */
@Service
@Transactional
public class AdminSmInstuService extends BaseService {


	@Autowired
	private AdminSmInstuMapper adminSmInstuMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(AdminSmInstu adminSmInstu) throws Exception {
		adminSmInstu.setInstuId(createUUId());
		//domain.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmInstuMapper.insert(adminSmInstu);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by InstuId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public AdminSmInstu show(String instuId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("instuId", instuId);
		PageInfo<AdminSmInstu> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + instuId);
		}
		AdminSmInstu adminSmInstu = pageInfo.getList().get(0);
		return  adminSmInstu;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<AdminSmInstu> index(QueryModel model)
			throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmInstu> list = adminSmInstuMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(AdminSmInstu adminSmInstu) throws Exception {
		//domain.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmInstuMapper.updateByPrimaryKey(adminSmInstu);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String instuId) throws Exception {
		return adminSmInstuMapper.deleteByPrimaryKey(instuId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return adminSmInstuMapper.deleteByIds(ids);
	}
}

