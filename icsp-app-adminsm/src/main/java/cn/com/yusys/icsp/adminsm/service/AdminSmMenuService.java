package cn.com.yusys.icsp.adminsm.service;

import cn.com.yusys.icsp.adminsm.domain.AdminSmMenu;
import cn.com.yusys.icsp.adminsm.domain.MenuBean;
import cn.com.yusys.icsp.adminsm.repository.mapper.AdminSmMenuMapper;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import cn.com.yusys.icsp.common.util.StringUtilEx;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class AdminSmMenuService extends BaseService {

	@Autowired
	private AdminSmMenuMapper adminSmMenuMapper;

	public  int create(AdminSmMenu adminSmMenu) throws Exception {
		adminSmMenu.setMenuId(createUUId());
		adminSmMenu.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmMenuMapper.insert(adminSmMenu);
	}

	/**
	 * @方法名称: getMenuInfo
	 * @方法描述: 查询菜单信息 by menuId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  MenuBean show(String menuId) {
		MenuBean smMenu = adminSmMenuMapper.getMenuBean(menuId);
		return smMenu;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有菜单 按系统编号
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  List<AdminSmMenu> index(QueryModel model) {
		if(StringUtilEx.isNullOrEmpty(model.getSort())){
			model.setSort("menuOrder ASC");
		}
		List<AdminSmMenu> list = adminSmMenuMapper.selectByModel(model);
		return list;
	}

	/**
	 * 根据数据库主建更新
	 * 
	 * @param adminSmMenu
	 * @return
	 */
	public  int update(AdminSmMenu adminSmMenu) {
		return adminSmMenuMapper.updateByPrimaryKey(adminSmMenu);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int delete(String menuId) {
		int n = 0;
		List<String> list = adminSmMenuMapper.getDeleteMenuIds(menuId);
		for (int i = 0, listLen = list.size(); i < listLen; i++) {
			// this.adminSmAuthRecoMapper.deleteMenuInfo(list.get(i));
			n = n + adminSmMenuMapper.deleteByPrimaryKey(list.get(i));
		}
		return adminSmMenuMapper.deleteByPrimaryKey(menuId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int deleteByIds(String ids) {
		return adminSmMenuMapper.deleteByIds(ids);
	}

}