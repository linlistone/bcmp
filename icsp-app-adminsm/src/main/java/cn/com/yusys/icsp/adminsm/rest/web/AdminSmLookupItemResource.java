package cn.com.yusys.icsp.adminsm.rest.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import service.common.base.BaseResouce;
import service.common.bean.JsonRequest;
import service.common.bean.ResultDto;
import service.common.mybatis.QueryModel;
import service.oca.domain.AdminSmLookupItem;
import service.oca.service.AdminSmLookupItemService;

import com.github.pagehelper.PageInfo;

public class AdminSmLookupItemResource extends BaseResouce {

	/**
	 * 
	 */
	public AdminSmLookupItemResource() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @方法名称: create
	 * @方法描述: 新增LookupItem
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> create(JsonRequest request) throws Exception {
		AdminSmLookupItem adminSmLookupItem = formJsonRequest(request,
				AdminSmLookupItem.class);
		int result = AdminSmLookupItemService.create(adminSmLookupItem);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加LookupItem"
					+ adminSmLookupItem.getLookupItemCode() + "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:LookupItem节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<AdminSmLookupItem> show(JsonRequest request)
			throws Exception {
		String menuId = request.getAsString("menuId");
		return new ResultDto<AdminSmLookupItem>(1,
				AdminSmLookupItemService.show(menuId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:LookupItem树初始化查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmLookupItem>> index(JsonRequest request)
			throws Exception {

		QueryModel model = toQueryModel(request);
		List<AdminSmLookupItem> list = AdminSmLookupItemService.index(model);
		PageInfo<AdminSmLookupItem> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmLookupItem>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改LookupItem
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> update(JsonRequest request) throws Exception {
		AdminSmLookupItem adminSmLookupItem = formJsonRequest(request,
				AdminSmLookupItem.class);
		int result = AdminSmLookupItemService.update(adminSmLookupItem);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("LookupItem"
					+ adminSmLookupItem.getLookupItemName() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除LookupItem
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> delete(JsonRequest request) throws Exception {
//		  lookupItemId: currentItemRow[0].lookupItemId,
//          lookupCode: currentItemRow[0].lookupCode
		String lookupItemId=request.getAsString("lookupItemId");
		int result = AdminSmLookupItemService.delete(lookupItemId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除LookupItem" + lookupItemId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:index
	 * @方法描述:LookupItem树初始化查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Map<String, List<Map<String, String>>>> weblist(
			JsonRequest request) throws Exception {
		String lookupCodes = request.getAsString("lookupCodes");
		Map<String, List<Map<String, String>>> object = new HashMap<String, List<Map<String, String>>>();
		if (lookupCodes.contains(",")) {
			String[] idstr = lookupCodes.split(",");
			for (int id = 0; id < idstr.length; id++) {
				Map<String, List<Map<String, String>>> map = AdminSmLookupItemService
						.getLookupCodeList(idstr[id]);
				object.putAll(map);
			}
		} else {
			object = AdminSmLookupItemService.getLookupCodeList(lookupCodes);
		}

		return new ResultDto<Map<String, List<Map<String, String>>>>(
				object.size(), object);

	}

	// /**
	// * @方法名称: getLookupCode
	// * @方法描述: 前台WEB加载字典（需要在此封装逻辑，不然service层无法用到原子REDIS查询）
	// * @参数与返回说明:
	// * @算法描述:
	// */
	// public ResultDto<Map<String, List<Map<String, String>>>> getLookupCode(
	// String lookupCodes) {
	//
	// }
}