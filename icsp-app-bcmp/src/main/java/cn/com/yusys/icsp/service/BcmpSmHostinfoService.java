package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.repository.mapper.BcmpSmHostinfoMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 主机信息配置
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-01 16:35:25
 */
@Service
@Transactional
public class BcmpSmHostinfoService extends BaseService {

	@Autowired
	private BcmpSmHostinfoMapper bcmpSmHostinfoMapper;

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmHostinfo bcmpSmHostinfo) throws Exception {
		bcmpSmHostinfo.setHostId(createUUId());
		return bcmpSmHostinfoMapper.insert(bcmpSmHostinfo);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by HostId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmHostinfo show(String hostId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("hostId", hostId);
		PageInfo<BcmpSmHostinfo> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + hostId);
		}
		BcmpSmHostinfo bcmpSmHostinfo = pageInfo.getList().get(0);
		return  bcmpSmHostinfo;
	}

	/*
	 *  @Description : 根据主机IP地址获取主机的详细信息
	 *  @Author : Mr_Jiang
	 *  @Date : 2020/3/7 17:10
	 */
	public BcmpSmHostinfo showByHostIp(String hostIp) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("hostIp", hostIp);
		List<BcmpSmHostinfo>  hostList= bcmpSmHostinfoMapper.selectByModel(model);
		if (hostList == null || hostList.size()==0) {
			throw new ICSPException("主机IP[" + hostIp+"]的数据不存在");
		}
		return  hostList.get(0);
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmHostinfo> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<BcmpSmHostinfo> list = bcmpSmHostinfoMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmHostinfo bcmpSmHostinfo) throws Exception {
		return bcmpSmHostinfoMapper.updateByPrimaryKey(bcmpSmHostinfo);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String hostId) throws Exception {
		return bcmpSmHostinfoMapper.deleteByPrimaryKey(hostId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmHostinfoMapper.deleteByIds(ids);
	}
}

