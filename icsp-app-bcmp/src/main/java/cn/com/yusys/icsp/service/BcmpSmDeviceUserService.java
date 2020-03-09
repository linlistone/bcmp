package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceUser;
import cn.com.yusys.icsp.repository.mapper.BcmpSmDeviceUserMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 设备领用记录
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 21:40:08
 */
@Service
@Transactional
public class BcmpSmDeviceUserService extends BaseService {


	@Autowired
	private BcmpSmDeviceUserMapper bcmpSmDeviceUserMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmDeviceUser bcmpSmDeviceUser) throws Exception {
		bcmpSmDeviceUser.setLinkId(createUUId());
		return bcmpSmDeviceUserMapper.insert(bcmpSmDeviceUser);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by LinkId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmDeviceUser show(String linkId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("linkId", linkId);
		PageInfo<BcmpSmDeviceUser> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + linkId);
		}
		BcmpSmDeviceUser bcmpSmDeviceUser = pageInfo.getList().get(0);
		return  bcmpSmDeviceUser;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmDeviceUser> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<BcmpSmDeviceUser> list = bcmpSmDeviceUserMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmDeviceUser bcmpSmDeviceUser) throws Exception {
		return bcmpSmDeviceUserMapper.updateByPrimaryKey(bcmpSmDeviceUser);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String linkId) throws Exception {
		return bcmpSmDeviceUserMapper.deleteByPrimaryKey(linkId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmDeviceUserMapper.deleteByIds(ids);
	}
}

