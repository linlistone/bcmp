package cn.com.yusys.icsp.adminsm.service;

import cn.com.yusys.icsp.adminsm.domain.AdminSmFuncMod;
import cn.com.yusys.icsp.adminsm.repository.mapper.AdminSmFuncModMapper;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AdminSmFuncModService  extends BaseService {

	@Autowired
	private AdminSmFuncModMapper adminSmFuncModMapper;

	public  int create(AdminSmFuncMod adminSmMenu) throws Exception {
		adminSmMenu.setModId(createUUId());
		adminSmMenu.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmFuncModMapper.insert(adminSmMenu);
	}

	/**
	 * @throws ICSPException
	 * @方法名称: getMenuInfo
	 * @方法描述: 查询菜单信息 by menuId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  AdminSmFuncMod show(String menuId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("menuId", menuId);
		List<AdminSmFuncMod> list = index(model);
		if (list == null || list.isEmpty()) {
			throw new ICSPException("数据不存在" + menuId);
		}
		AdminSmFuncMod smMenu = list.get(0);
		return smMenu;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有菜单 按系统编号
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public  List<AdminSmFuncMod> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<AdminSmFuncMod> list = adminSmFuncModMapper.selectByModel(model);
		PageHelper.clearPage();
		return list;
	}

	/**
	 * 根据数据库主建更新
	 * 
	 * @param adminSmMenu
	 * @return
	 */
	public int update(AdminSmFuncMod adminSmMenu) throws Exception {
		adminSmMenu.setLastChgDt(DateUtil.getFormatDateTime());
		return adminSmFuncModMapper.updateByPrimaryKey(adminSmMenu);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int delete(String menuId) throws Exception {
		return adminSmFuncModMapper.deleteByPrimaryKey(menuId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public  int deleteByIds(String ids) throws Exception {
		return adminSmFuncModMapper.deleteByIds(ids);
	}

}