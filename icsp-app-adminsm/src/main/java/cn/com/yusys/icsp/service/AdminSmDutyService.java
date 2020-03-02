package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import cn.com.yusys.icsp.domain.AdminSmDuty;
import cn.com.yusys.icsp.repository.mapper.AdminSmDutyMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 系统岗位表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-02 09:16:03
 */
@Service
@Transactional
public class AdminSmDutyService extends BaseService {


	@Autowired
	private AdminSmDutyMapper adminSmDutyMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(AdminSmDuty adminSmDuty) throws Exception {
		adminSmDuty.setDutyId(createUUId());
		adminSmDuty.setBelongOrgId("000000");
		adminSmDuty.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmDutyMapper.insert(adminSmDuty);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by DutyId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public AdminSmDuty show(String dutyId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("dutyId", dutyId);
		PageInfo<AdminSmDuty> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + dutyId);
		}
		AdminSmDuty adminSmDuty = pageInfo.getList().get(0);
		return  adminSmDuty;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<AdminSmDuty> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmDuty> list = adminSmDutyMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(AdminSmDuty adminSmDuty) throws Exception {
		adminSmDuty.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmDutyMapper.updateByPrimaryKey(adminSmDuty);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String dutyId) throws Exception {
		return adminSmDutyMapper.deleteByPrimaryKey(dutyId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return adminSmDutyMapper.deleteByIds(ids);
	}
}

