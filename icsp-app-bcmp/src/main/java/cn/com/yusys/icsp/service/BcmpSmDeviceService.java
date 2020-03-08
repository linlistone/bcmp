package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDevice;
import cn.com.yusys.icsp.repository.mapper.BcmpSmDeviceMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 设备登记表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:29
 */
@Service
@Transactional
public class BcmpSmDeviceService extends BaseService {


	@Autowired
	private BcmpSmDeviceMapper bcmpSmDeviceMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmDevice bcmpSmDevice) throws Exception {
		bcmpSmDevice.setDeviceId(createUUId());
		return bcmpSmDeviceMapper.insert(bcmpSmDevice);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by DeviceId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmDevice show(String deviceId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("deviceId", deviceId);
		PageInfo<BcmpSmDevice> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + deviceId);
		}
		BcmpSmDevice bcmpSmDevice = pageInfo.getList().get(0);
		return  bcmpSmDevice;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmDevice> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<BcmpSmDevice> list = bcmpSmDeviceMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmDevice bcmpSmDevice) throws Exception {
		return bcmpSmDeviceMapper.updateByPrimaryKey(bcmpSmDevice);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String deviceId) throws Exception {
		return bcmpSmDeviceMapper.deleteByPrimaryKey(deviceId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmDeviceMapper.deleteByIds(ids);
	}
}

