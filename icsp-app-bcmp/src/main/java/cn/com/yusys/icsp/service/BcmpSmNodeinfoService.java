package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.repository.mapper.BcmpSmNodeinfoMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
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
 * @date 2020-03-01 22:17:48
 */
@Service
@Transactional
public class BcmpSmNodeinfoService extends BaseService {

	@Autowired
	private BcmpSmNodeinfoMapper bcmpSmNodeinfoMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
		bcmpSmNodeinfo.setNodeId(createUUId());
		bcmpSmNodeinfo.setLastChgDt(DateUtil.getFormatDateTime());
		return bcmpSmNodeinfoMapper.insert(bcmpSmNodeinfo);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by NodeId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmNodeinfo show(String nodeId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("nodeId", nodeId);
		PageInfo<BcmpSmNodeinfo> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + nodeId);
		}
		BcmpSmNodeinfo bcmpSmNodeinfo = pageInfo.getList().get(0);
		return  bcmpSmNodeinfo;
	}
	/*
	 *  @Description : 通过主机IP和节点名称获取节点详细信息
	 *  @Author : Mr_Jiang
	 *  @Date : 2020/3/7 17:06
	 */
	public BcmpSmNodeinfo showByHostMessage(String hostIp,String nodeName) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("hostIp", hostIp);
		model.addCondition("nodeName", nodeName);
		List<BcmpSmNodeinfo> nodeList = bcmpSmNodeinfoMapper.selectByModel(model);
		if (nodeList == null || nodeList.size()==0) {
			throw new ICSPException("主机IP[" + hostIp+"],节点名称["+nodeName+"]的数据不存在");
		}
		return  nodeList.get(0);
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmNodeinfo> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		if(model.getSort()==null||"".equals(model.getSort()))
			model.setSort("lastChgDt asc");
		List<BcmpSmNodeinfo> list = bcmpSmNodeinfoMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有不需要分页
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public List<BcmpSmNodeinfo> selectAll(QueryModel model) throws Exception {
		List<BcmpSmNodeinfo> list = bcmpSmNodeinfoMapper.selectByModel(model);
		return list;
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
		bcmpSmNodeinfo.setLastChgDt(DateUtil.getFormatDateTime());
		return bcmpSmNodeinfoMapper.updateByPrimaryKey(bcmpSmNodeinfo);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String nodeId) throws Exception {
		return bcmpSmNodeinfoMapper.deleteByPrimaryKey(nodeId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmNodeinfoMapper.deleteByIds(ids);
	}
}

