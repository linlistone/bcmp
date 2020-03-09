package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceLog;
import cn.com.yusys.icsp.repository.mapper.BcmpSmDeviceLogMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 设备日志上传表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 23:02:18
 */
@Service
@Transactional
public class BcmpSmDeviceLogService extends BaseService {


	@Autowired
	private BcmpSmDeviceLogMapper bcmpSmDeviceLogMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmDeviceLog bcmpSmDeviceLog) throws Exception {
		bcmpSmDeviceLog.setDeviceLogId(createUUId());
		return bcmpSmDeviceLogMapper.insert(bcmpSmDeviceLog);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by DeviceLogId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmDeviceLog show(String deviceLogId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("deviceLogId", deviceLogId);
		PageInfo<BcmpSmDeviceLog> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + deviceLogId);
		}
		BcmpSmDeviceLog bcmpSmDeviceLog = pageInfo.getList().get(0);
		return  bcmpSmDeviceLog;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmDeviceLog> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		if(model.getSort()==null||"".equals(model.getSort())){
			model.setSort("uploadDate desc");
		}
		List<BcmpSmDeviceLog> list = bcmpSmDeviceLogMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmDeviceLog bcmpSmDeviceLog) throws Exception {
		return bcmpSmDeviceLogMapper.updateByPrimaryKey(bcmpSmDeviceLog);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String deviceLogId) throws Exception {
		return bcmpSmDeviceLogMapper.deleteByPrimaryKey(deviceLogId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmDeviceLogMapper.deleteByIds(ids);
	}
}

