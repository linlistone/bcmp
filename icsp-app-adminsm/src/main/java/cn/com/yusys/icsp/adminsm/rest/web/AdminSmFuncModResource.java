package cn.com.yusys.icsp.adminsm.rest.web;

import java.util.List;

import service.common.base.BaseResouce;
import service.common.bean.JsonRequest;
import service.common.bean.ResultDto;
import service.common.mybatis.QueryModel;
import service.oca.domain.AdminSmFuncMod;
import service.oca.service.AdminSmFuncModService;
import com.github.pagehelper.PageInfo;

public class AdminSmFuncModResource extends BaseResouce {

	/**
	 * 
	 */
	public AdminSmFuncModResource() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @方法名称: create
	 * @方法描述: 新增模块
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> create(JsonRequest request) throws Exception {
		AdminSmFuncMod adminSmFuncMod = formJsonRequest(request,
				AdminSmFuncMod.class);
		int result = AdminSmFuncModService.create(adminSmFuncMod);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加模块" + adminSmFuncMod.getModName()
					+ "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:模块节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<AdminSmFuncMod> show(JsonRequest request) throws Exception {
		String modId = request.getAsString("modId");
		return new ResultDto<AdminSmFuncMod>(1, AdminSmFuncModService.show(modId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:模块查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmFuncMod>> index(JsonRequest request)
			throws Exception {
		QueryModel model = toQueryModel(request);
		List<AdminSmFuncMod> list = AdminSmFuncModService.index(model);
		PageInfo<AdminSmFuncMod> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmFuncMod>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改模块
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> update(JsonRequest request) throws Exception {
		AdminSmFuncMod adminSmFuncMod = formJsonRequest(request,
				AdminSmFuncMod.class);
		int result = AdminSmFuncModService.update(adminSmFuncMod);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("模块" + adminSmFuncMod.getModName() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除模块
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> delete(JsonRequest request) throws Exception {
		String modId = request.getAsString("modId");
		int result = AdminSmFuncModService.delete(modId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + modId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}
}