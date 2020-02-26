package cn.com.yusys.icsp.adminsm.rest.web;

import java.util.Arrays;
import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.adminsm.domain.AdminSmRole;
import cn.com.yusys.icsp.adminsm.service.AdminSmRoleService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 系统角色表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-26 11:59:53
 */
@RestController
@RequestMapping("/api/adminSmRole")
public class AdminSmRoleResource extends BaseResouce {


	@Autowired
	private AdminSmRoleService adminSmRoleService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增系统角色表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody AdminSmRole adminSmRole) throws Exception {
		int result = adminSmRoleService.create(adminSmRole);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加系统角色表" + adminSmRole.getRoleId()
					+ "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:系统角色表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<AdminSmRole> show(@RequestParam("roleId") String roleId) throws Exception {
		return new ResultDto<AdminSmRole>(1, adminSmRoleService.show(roleId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:系统角色表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<AdminSmRole>> index(QueryModel model)
			throws Exception {
		List<AdminSmRole> list = adminSmRoleService.index(model);
		PageInfo<AdminSmRole> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<AdminSmRole>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改系统角色表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody AdminSmRole adminSmRole) throws Exception {
		int result =  adminSmRoleService.update(adminSmRole);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("模块" + adminSmRole.getRoleId() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除系统角色表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{roleId}")
	public ResultDto<Integer> delete(@PathVariable("roleId") String roleId) throws Exception {
		int result = adminSmRoleService.delete(roleId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + roleId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}
}
