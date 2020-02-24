package cn.com.yusys.icsp.adminsm.rest.web;

import cn.com.yusys.icsp.adminsm.domain.AdminSmFuncMod;
import cn.com.yusys.icsp.adminsm.service.AdminSmFuncModService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/adminSmFuncMod")
public class AdminSmFuncModResource extends BaseResouce {

	@Autowired
	private AdminSmFuncModService adminSmFuncModService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增模块
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(AdminSmFuncMod adminSmFuncMod) throws Exception {
		int result = adminSmFuncModService.create(adminSmFuncMod);
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
	@GetMapping(value = "/show")
	public ResultDto<AdminSmFuncMod> show(String modId) throws Exception {
		return new ResultDto<AdminSmFuncMod>(1, adminSmFuncModService.show(modId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:模块查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<AdminSmFuncMod>> index(QueryModel model)
			throws Exception {
		List<AdminSmFuncMod> list = adminSmFuncModService.index(model);
		PageInfo<AdminSmFuncMod> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmFuncMod>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改模块
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(AdminSmFuncMod adminSmFuncMod) throws Exception {
		int result = adminSmFuncModService.update(adminSmFuncMod);
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
	@GetMapping(value = "/delete")
	public ResultDto<Integer> delete(String modId) throws Exception {
		int result = adminSmFuncModService.delete(modId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + modId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}
}