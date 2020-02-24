package cn.com.yusys.icsp.adminsm.rest.web;

import java.util.List;

import com.github.pagehelper.PageInfo;

import service.common.base.BaseResouce;
import service.common.bean.JsonRequest;
import service.common.bean.ResultDto;
import service.common.mybatis.QueryModel;
import service.oca.domain.AdminSmLookupType;
import service.oca.domain.AdminSmMenu;
import service.oca.service.AdminSmLookupTypeService;

/**
 * 字典分类别
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:30:35
 */
public class AdminSmLookupTypeResource extends BaseResouce {

	/**
	 * 字典分类别
	 */
	public AdminSmLookupTypeResource() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @方法名称: create
	 * @方法描述: 新增字典分类别
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> create(JsonRequest request) throws Exception {
		AdminSmLookupType domain = formJsonRequest(request, AdminSmLookupType.class);
		int result = AdminSmLookupTypeService.create(domain);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加字典分类别" + domain.getLookupTypeId() + "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:字典分类别信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<AdminSmLookupType> show(JsonRequest request) throws Exception {
		String lookupTypeId = request.getAsString("lookupTypeId");
		return new ResultDto<AdminSmLookupType>(1, AdminSmLookupTypeService.show(lookupTypeId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:字典分类别查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmLookupType>> index(JsonRequest request) throws Exception {
		QueryModel model = toQueryModel(request);
		List<AdminSmLookupType> list = AdminSmLookupTypeService.index(model);
		PageInfo<AdminSmLookupType> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmLookupType>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改字典分类别
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> update(JsonRequest request) throws Exception {
		AdminSmLookupType domain = formJsonRequest(request, AdminSmLookupType.class);
		int result = AdminSmLookupTypeService.update(domain);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("模块" + domain.getLookupTypeId() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除字典分类别
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> delete(JsonRequest request) throws Exception {
		String data = request.getAsString("data");
		int result = AdminSmLookupTypeService.delete(data);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + data + "");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:index
	 * @方法描述:字典树初始化查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmLookupType>> tree(JsonRequest request) throws Exception {
		String instuId = request.getAsString("instuId");
		QueryModel model = new QueryModel();
		if (instuId != null)
			model.addCondition("instuId", instuId);
		model.setSize(9999);// 最多显示9999个
		List<AdminSmLookupType> list = AdminSmLookupTypeService.index(model);
		PageInfo<AdminSmLookupType> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmLookupType>>(pageInfo.getTotal(), list);
	}
}
