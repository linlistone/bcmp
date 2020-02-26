package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import cn.com.yusys.icsp.domain.AdminSmResContr;
import cn.com.yusys.icsp.repository.mapper.AdminSmResContrMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 系统功能控制点表
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-10 00:05:20
 */
@Service
@Transactional
public class AdminSmResContrService extends BaseService {

	@Autowired
	private AdminSmResContrMapper adminSmResContrMapper;

	public  int create(AdminSmResContr domain) throws Exception {
		domain.setContrId(createUUId());
		domain.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmResContrMapper.insert(domain);
	}

	/**
	 * @throws ICSPException
	 * @方法名称: getMenuInfo
	 * @方法描述: 查询信息 by ContrId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  AdminSmResContr show(String contrId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("contrId", contrId);
		PageInfo<AdminSmResContr> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + contrId);
		}
		AdminSmResContr domain = pageInfo.getList().get(0);
		return domain;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  PageInfo<AdminSmResContr> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmResContr> list = adminSmResContrMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * 根据数据库主建更新
	 * 
	 * @param adminSmResContr
	 * @return
	 */
	public  int update(AdminSmResContr adminSmResContr) throws Exception {
		adminSmResContr.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmResContrMapper.updateByPrimaryKey(adminSmResContr);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int delete(String contrId) throws Exception {
		return adminSmResContrMapper.deleteByPrimaryKey(contrId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int deleteByIds(String ids) throws Exception {
		return adminSmResContrMapper.deleteByIds(ids);
	}

	/**
	 * @方法名称: getFuncTree
	 * @方法描述:初始化左侧树,层级为模块、业务功能管理
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  List<Map<String, Object>> getFuncTree(QueryModel mode) throws Exception {
		List<Map<String, Object>> list = adminSmResContrMapper.getFuncTree(mode);
		List<Map<String, Object>> swlist = new ArrayList<Map<String, Object>>();
		for (Map<String, Object> map : list) {
			Map<String, Object> swMap = mapUnderscoreToCamelCase(map);
			swlist.add(swMap);
		}
		return swlist;
	}

	/**
	 * @方法名称: getFuncTree
	 * @方法描述:初始化左侧树,层级为模块、业务功能管理
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  List<Map<String, Object>> ifCodeRepeat(Map<String, Object> map) throws Exception {
		List<Map<String, Object>> list = adminSmResContrMapper.ifCodeRepeat(map);
		return list;
	}

}
