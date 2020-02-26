package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpCmNodeinfo;
import cn.com.yusys.icsp.repository.mapper.BcmpCmNodeinfoMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;

import cn.com.yusys.icsp.common.util.DateUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 节点信息表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:08
 */
@Service
@Transactional
public class BcmpCmNodeinfoService extends BaseService {


	@Autowired
	private BcmpCmNodeinfoMapper bcmpCmNodeinfoMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpCmNodeinfo bcmpCmNodeinfo) throws Exception {
		bcmpCmNodeinfo.setNodeId(createUUId());
		bcmpCmNodeinfo.setLastChgDt(DateUtil.getFormatDateTime());
		return bcmpCmNodeinfoMapper.insert(bcmpCmNodeinfo);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by NodeId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpCmNodeinfo show(String nodeId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("nodeId", nodeId);
		PageInfo<BcmpCmNodeinfo> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + nodeId);
		}
		BcmpCmNodeinfo bcmpCmNodeinfo = pageInfo.getList().get(0);
		return  bcmpCmNodeinfo;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpCmNodeinfo> index(QueryModel model)
			throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<BcmpCmNodeinfo> list = bcmpCmNodeinfoMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpCmNodeinfo bcmpCmNodeinfo) throws Exception {
		bcmpCmNodeinfo.setLastChgDt(DateUtil.getFormatDateTime());
		return bcmpCmNodeinfoMapper.updateByPrimaryKey(bcmpCmNodeinfo);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String nodeId) throws Exception {
		return bcmpCmNodeinfoMapper.deleteByPrimaryKey(nodeId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpCmNodeinfoMapper.deleteByIds(ids);
	}
}

