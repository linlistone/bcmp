package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.MemTradeIdentityInfo;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.mapper.MemTradeIdentityInfoMapper;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * MEM_ TRADE_ IDEHTITY_INFO
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-05-23 16:50:09
 */
@Service
@Transactional
public class MemTradeIdentityInfoService extends BaseService {


	@Autowired
	private MemTradeIdentityInfoMapper memTradeIdentityInfoMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(MemTradeIdentityInfo memTradeIdentityInfo) throws Exception {
		memTradeIdentityInfo.setMemTradeIdentityId(createUUId());
		return memTradeIdentityInfoMapper.insert(memTradeIdentityInfo);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by MemTradeIdentityId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public MemTradeIdentityInfo show(String memTradeIdentityId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("memTradeIdentityId", memTradeIdentityId);
		PageInfo<MemTradeIdentityInfo> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + memTradeIdentityId);
		}
		MemTradeIdentityInfo memTradeIdentityInfo = pageInfo.getList().get(0);
		return  memTradeIdentityInfo;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<MemTradeIdentityInfo> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<MemTradeIdentityInfo> list = memTradeIdentityInfoMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(MemTradeIdentityInfo memTradeIdentityInfo) throws Exception {
		return memTradeIdentityInfoMapper.updateByPrimaryKey(memTradeIdentityInfo);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String memTradeIdentityId) throws Exception {
		return memTradeIdentityInfoMapper.deleteByPrimaryKey(memTradeIdentityId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return memTradeIdentityInfoMapper.deleteByIds(ids);
	}
}

