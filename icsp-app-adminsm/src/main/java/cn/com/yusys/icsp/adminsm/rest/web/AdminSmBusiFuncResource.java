package cn.com.yusys.icsp.adminsm.rest.web;

import cn.com.yusys.icsp.adminsm.domain.AdminSmBusiFunc;
import cn.com.yusys.icsp.adminsm.service.AdminSmBusiFuncService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/adminSmBusiFunc")
public class AdminSmBusiFuncResource extends BaseResouce {

	@Autowired
	private AdminSmBusiFuncService adminSmBusiFuncService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增模块
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody AdminSmBusiFunc adminSmFuncMod) throws Exception {
		int result = adminSmBusiFuncService.create(adminSmFuncMod);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加模块" + adminSmFuncMod.getFuncName()
					+ "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @throws Exception
	 * @方法名称:show
	 * @方法描述:模块节点信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<AdminSmBusiFunc> show(@RequestParam("funcId") String funcId)
			throws Exception {
		return new ResultDto<AdminSmBusiFunc>(1, adminSmBusiFuncService.show(funcId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:模块树初始化查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<AdminSmBusiFunc>> index(QueryModel model)
			throws Exception {
		List<AdminSmBusiFunc> list = adminSmBusiFuncService.index(model);
		PageInfo<AdminSmBusiFunc> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmBusiFunc>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改模块
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody AdminSmBusiFunc adminSmMenu) throws Exception {
		int result = adminSmBusiFuncService.update(adminSmMenu);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("模块" + adminSmMenu.getFuncName() + "修改成功！");
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
	@PostMapping(value = "/delete/{funcId}")
	public ResultDto<Integer> delete(@PathVariable("funcId") String funcId) throws Exception {
		int result = adminSmBusiFuncService.delete(funcId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + funcId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}
}