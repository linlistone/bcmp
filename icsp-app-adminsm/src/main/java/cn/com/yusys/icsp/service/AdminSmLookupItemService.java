package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.domain.AdminSmLookupItem;
import cn.com.yusys.icsp.repository.mapper.AdminSmLookupItemMapper;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0.0
 * @项目名称：yusp-admin
 * @类名称：AdminSmLookupItemService
 * @类描述：数据字典内容
 * @功能描述:
 * @创建人：liaoxd@yusys.com.cn @创建时间：2017-12-13 11:18 @修改备注：
 * @修改日期 修改人员 修改原因 -------- -------- ----------------------------------------
 * @Copyright (c) 2017宇信科技-版权所有
 */
@Service
@Transactional
public class AdminSmLookupItemService extends BaseService {

	@Autowired
	private AdminSmLookupItemMapper adminSmLookupItemMapper;

	public  int create(AdminSmLookupItem adminSmLookupItem)
			throws Exception {
		adminSmLookupItem.setLookupItemId(createUUId());
		adminSmLookupItem.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmLookupItemMapper.insert(adminSmLookupItem);
	}

	/**
	 * @throws ICSPException
	 * @方法名称: getMenuInfo
	 * @方法描述: 查询菜单信息 by menuId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  AdminSmLookupItem show(String lookupItemId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("lookupItemId", lookupItemId);
		PageInfo<AdminSmLookupItem> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + lookupItemId);
		}
		AdminSmLookupItem smMenu = pageInfo.getList().get(0);
		return smMenu;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有菜单 按系统编号
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  PageInfo<AdminSmLookupItem> index(QueryModel model)
			throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmLookupItem> list = adminSmLookupItemMapper
				.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * 根据数据库主建更新
	 * 
	 * @param adminSmLookupItem
	 * @return
	 */
	public  int update(AdminSmLookupItem adminSmLookupItem)
			throws Exception {

		adminSmLookupItem.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmLookupItemMapper.updateByPrimaryKey(adminSmLookupItem);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int delete(String lookupItemId) throws Exception {

		return adminSmLookupItemMapper.deleteByPrimaryKey(lookupItemId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int deleteByIds(String ids) throws Exception {

		return adminSmLookupItemMapper.deleteByIds(ids);
	}

	/**
	 * 返回数据字典项
	 * 
	 * @param lookupCode
	 * @return
	 */
	public  Map<String, List<Map<String, String>>> getLookupCodeList(
			String lookupCode) {
		List<String> param = new ArrayList<String>();
		param.add(lookupCode);
		List<AdminSmLookupItem> retList = adminSmLookupItemMapper
				.getLookupCodeListByLookUpCodes(param);
		return cacheInputMap(retList, lookupCode);
	}

	/**
	 * @方法名称:cacheInputMap
	 * @方法描述:组装字典码列表加入缓存的数据格式
	 * @参数与返回说明:
	 * @算法描述:
	 */
	private  Map<String, List<Map<String, String>>> cacheInputMap(
			List<AdminSmLookupItem> list, String lookupCode) {
		Map<String, List<Map<String, String>>> resultMap = new HashMap<String, List<Map<String, String>>>();
		List<Map<String, String>> itemList = new ArrayList<Map<String, String>>();
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				lookupCode = list.get(i).getLookupCode();
				if (!resultMap.containsKey(lookupCode)) {
					itemList = new ArrayList<Map<String, String>>();
				} else {
					itemList = resultMap.get(lookupCode);
				}
				Map<String, String> itemMap = new HashMap<String, String>();
				String lookupItemCode = list.get(i).getLookupItemCode();
				String lookupItemName = list.get(i).getLookupItemName();
				itemMap.put("key", lookupItemCode);
				itemMap.put("value", lookupItemName);
				itemList.add(itemMap);
				resultMap.put(lookupCode, itemList);
			}
		}
		return resultMap;
	}

}
