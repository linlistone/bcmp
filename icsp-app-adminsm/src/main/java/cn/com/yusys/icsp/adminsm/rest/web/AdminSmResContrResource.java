package cn.com.yusys.icsp.adminsm.rest.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.com.yusys.icsp.adminsm.domain.AdminSmResContr;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.common.base.BaseResouce;
import service.common.bean.JsonRequest;
import service.common.bean.ResultDto;
import service.common.mybatis.QueryModel;
import service.oca.domain.AdminSmResContr;
import service.oca.service.AdminSmResContrService;

/**
 * 系统功能控制点表
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-10 00:05:20
 */
@RestController
@RequestMapping("/api/adminSmResContr")
public class AdminSmResContrResource extends BaseResouce {
	@autowi
	private AdminSmResContrService adminSmResContrService;
	/**
	 * @方法名称: create
	 * @方法描述: 新增系统功能控制点表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> create(AdminSmResContr adminSmResContr) throws Exception {
		int result = AdminSmResContrService.create(adminSmResContr);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加系统功能控制点表" + domain.getContrId() + "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:系统功能控制点表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<AdminSmResContr> show(JsonRequest request) throws Exception {
		String contrId = request.getAsString("contrId");
		return new ResultDto<AdminSmResContr>(1, AdminSmResContrService.show(contrId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:系统功能控制点表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<AdminSmResContr>> index(JsonRequest request) throws Exception {
		QueryModel model = toQueryModel(request);
		List<AdminSmResContr> list = AdminSmResContrService.index(model);
		PageInfo<AdminSmResContr> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmResContr>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改系统功能控制点表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> update(JsonRequest request) throws Exception {
		AdminSmResContr domain = formJsonRequest(request, AdminSmResContr.class);
		int result = AdminSmResContrService.update(domain);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("模块" + domain.getContrId() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除系统功能控制点表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<Integer> delete(JsonRequest request) throws Exception {
		String contrId = request.getAsString("contrId");
		int result = AdminSmResContrService.delete(contrId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + contrId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: getFuncTree
	 * @方法描述:初始化左侧树,层级为模块、业务功能管理
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public ResultDto<List<Map<String, Object>>> funcTree(JsonRequest request) throws Exception {
		String sysId = request.getAsString("sysId");
		QueryModel model = new QueryModel();
		model.addCondition("sysId", sysId);
		ResultDto<List<Map<String, Object>>> resultDto = new ResultDto<>();
		List<Map<String, Object>> list = AdminSmResContrService.getFuncTree(model);
		resultDto.setData(list);
		return resultDto;
	}

	/**
	 * @方法名称: getFuncTree
	 * @方法描述:初始化左侧树,层级为模块、业务功能管理
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@SuppressWarnings("unchecked")
	public ResultDto<List<Map<String, Object>>> ifcoderepeat(JsonRequest request) throws Exception {
		Map<String, Object> model = JSONObject.toJavaObject(request.getData(), Map.class);
		ResultDto<List<Map<String, Object>>> resultDto = new ResultDto<>();
		List<Map<String, Object>> list = AdminSmResContrService.ifCodeRepeat(model);
		resultDto.setData(list);
		return resultDto;
	}

}
