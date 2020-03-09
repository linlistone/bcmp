package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceLocation;
import cn.com.yusys.icsp.repository.mapper.BcmpSmDeviceLocationMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 设备定位历史
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 22:39:18
 */
@Service
@Transactional
public class BcmpSmDeviceLocationService extends BaseService {


	@Autowired
	private BcmpSmDeviceLocationMapper bcmpSmDeviceLocationMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmDeviceLocation bcmpSmDeviceLocation) throws Exception {
		bcmpSmDeviceLocation.setLocationId(createUUId());
		return bcmpSmDeviceLocationMapper.insert(bcmpSmDeviceLocation);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by LocationId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmDeviceLocation show(String locationId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("locationId", locationId);
		PageInfo<BcmpSmDeviceLocation> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + locationId);
		}
		BcmpSmDeviceLocation bcmpSmDeviceLocation = pageInfo.getList().get(0);
		return  bcmpSmDeviceLocation;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmDeviceLocation> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		if(model.getSort()==null||"".equals(model.getSort())){
			model.setSort("locationDate desc");
		}
		List<BcmpSmDeviceLocation> list = bcmpSmDeviceLocationMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmDeviceLocation bcmpSmDeviceLocation) throws Exception {
		return bcmpSmDeviceLocationMapper.updateByPrimaryKey(bcmpSmDeviceLocation);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String locationId) throws Exception {
		return bcmpSmDeviceLocationMapper.deleteByPrimaryKey(locationId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmDeviceLocationMapper.deleteByIds(ids);
	}
}

