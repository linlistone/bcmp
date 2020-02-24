package cn.com.yusys.icsp.adminsm.rest.web;

import java.util.List;

import cn.com.yusys.icsp.base.base.BaseResouce;
import service.common.base.BaseResouce;
import service.common.bean.JsonRequest;
import service.common.bean.ResultDto;
import service.common.mybatis.QueryModel;
import service.oca.domain.AdminSmMenu;
import service.oca.domain.MenuBean;
import service.oca.service.AdminSmMenuService;

import com.github.pagehelper.PageInfo;

public class AdminSmMenuResource extends BaseResouce {

	/**
	 * 
	 */
	public AdminSmMenuResource() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @方法名称: create
	 * @方法描述: 新增菜单
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> create(JsonRequest request) throws Exception {
		AdminSmMenu adminSmMenu = formJsonRequest(request, AdminSmMenu.class);
		int result = AdminSmMenuService.create(adminSmMenu);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加菜单" + adminSmMenu.getMenuName() + "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:菜单节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<MenuBean> show(JsonRequest request) throws Exception {
		String menuId = request.getAsString("menuId");
		return new ResultDto<MenuBean>(1, AdminSmMenuService.show(menuId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:菜单树初始化查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmMenu>> index(JsonRequest request)
			throws Exception {
		QueryModel model = toQueryModel(request);
		List<AdminSmMenu> list = AdminSmMenuService.index(model);
		PageInfo<AdminSmMenu> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmMenu>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改菜单
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> update(JsonRequest request) throws Exception {
		AdminSmMenu adminSmMenu = formJsonRequest(request, AdminSmMenu.class);
		int result = AdminSmMenuService.update(adminSmMenu);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("菜单" + adminSmMenu.getMenuName() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除菜单
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> delete(JsonRequest request) throws Exception {
		String menuId = request.getAsString("menuId");
		int result = AdminSmMenuService.delete(menuId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除菜单" + menuId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:index
	 * @方法描述:菜单树初始化查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmMenu>> tree(JsonRequest request)
			throws Exception {
		String sysId = request.getAsString("sysId");
		QueryModel model = new QueryModel();
		model.addCondition("sysId", sysId);
		model.setSize(9999);//最多显示9999个
		List<AdminSmMenu> list = AdminSmMenuService.index(model);
		PageInfo<AdminSmMenu> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmMenu>>(pageInfo.getTotal(), list);
	}

}