package cn.com.yusys.icsp.service;


import cn.com.yusys.icsp.domain.AdminSmLookupType;
import cn.com.yusys.icsp.repository.mapper.AdminSmLookupItemMapper;
import cn.com.yusys.icsp.repository.mapper.AdminSmLookupMapper;
import cn.com.yusys.icsp.repository.mapper.AdminSmLookupTypeMapper;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import com.alibaba.fastjson.JSONArray;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 字典分类别
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:30:35
 */
@Service
@Transactional
public class AdminSmLookupTypeService extends BaseService {

	@Autowired
	private AdminSmLookupTypeMapper adminSmLookupTypeMapper;
	@Autowired
	private AdminSmLookupMapper adminSmLookupMapper;
	@Autowired
	private AdminSmLookupItemMapper adminSmLookupItemMapper;

	public  int create(AdminSmLookupType domain) throws Exception {
		domain.setLookupTypeId(createUUId());
		domain.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmLookupTypeMapper.insert(domain);
	}

	/**
	 * @throws ICSPException
	 * @方法名称: getMenuInfo
	 * @方法描述: 查询信息 by LookupTypeId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  AdminSmLookupType show(String lookupTypeId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("lookupTypeId", lookupTypeId);
		PageInfo<AdminSmLookupType> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + lookupTypeId);
		}
		AdminSmLookupType domain = pageInfo.getList().get(0);
		return domain;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  PageInfo<AdminSmLookupType> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmLookupType> list = adminSmLookupTypeMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * 根据数据库主建更新
	 * 
	 * @param adminSmLookupType
	 * @return
	 */
	public  int update(AdminSmLookupType adminSmLookupType) throws Exception {
		adminSmLookupType.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmLookupTypeMapper.updateByPrimaryKey(adminSmLookupType);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int delete(String data) throws Exception {
		JSONArray array = JSONArray.parseArray(data);
		int ret = 0;
		StringBuffer ids = new StringBuffer();
		for (int i = 0; i < array.size(); i++) {
			ids.append(array.getString(i));
			if (i + 1 < array.size())
				ids.append(",");
		}
		ret = adminSmLookupTypeMapper.deleteByIds(ids.toString());
		ret += adminSmLookupMapper.deleteBylookupTypes(ids.toString());
		ret += adminSmLookupItemMapper.deleteBylookupTypes(ids.toString());
		return ret;
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int deleteByIds(String ids) throws Exception {
		return adminSmLookupTypeMapper.deleteByIds(ids);
	}
}
