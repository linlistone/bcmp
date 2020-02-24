package cn.com.yusys.icsp.adminsm.rest.web;

import java.util.List;

import com.github.pagehelper.PageInfo;

import service.common.base.BaseResouce;
import service.common.bean.JsonRequest;
import service.common.bean.ResultDto;
import service.common.mybatis.QueryModel;
import service.oca.domain.AdminSmLookup;
import service.oca.service.AdminSmLookupService;

/**
 * 数据字典表
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:47:03
 */
public class AdminSmLookupResource extends BaseResouce {

	/**
	 * 数据字典表
	 */
	public AdminSmLookupResource() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @方法名称: create
	 * @方法描述: 新增数据字典表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> create(JsonRequest request) throws Exception {
		AdminSmLookup domain = formJsonRequest(request, AdminSmLookup.class);
		int result = AdminSmLookupService.create(domain);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加数据字典表" + domain.getLookupId() + "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:数据字典表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<AdminSmLookup> show(JsonRequest request) throws Exception {
		String lookupId = request.getAsString("lookupId");
		return new ResultDto<AdminSmLookup>(1, AdminSmLookupService.show(lookupId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:数据字典表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmLookup>> index(JsonRequest request) throws Exception {
		QueryModel model = toQueryModel(request);
		List<AdminSmLookup> list = AdminSmLookupService.index(model);
		PageInfo<AdminSmLookup> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmLookup>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改数据字典表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> update(JsonRequest request) throws Exception {
		AdminSmLookup domain = formJsonRequest(request, AdminSmLookup.class);
		int result = AdminSmLookupService.update(domain);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("模块" + domain.getLookupId() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除数据字典表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> delete(JsonRequest request) throws Exception {
		String lookupId = request.getAsString("lookupId");
		String lookupCode = request.getAsString("lookupCode");
		int result = AdminSmLookupService.delete(lookupId, lookupCode);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + lookupId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}
}
