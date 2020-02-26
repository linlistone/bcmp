package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmRole;
import cn.com.yusys.icsp.service.AdminSmRoleService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * 系统角色表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-26 17:29:11
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
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:系统角色表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<AdminSmRole> show(@RequestParam("roleId") String roleId) throws Exception {
		return ResultDto.success(adminSmRoleService.show(roleId));
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
		PageInfo<AdminSmRole> pageInfo = adminSmRoleService.index(model);
		return ResultDto.success( pageInfo);
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
		return ResultDto.success( result);
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
		return ResultDto.success( result);
	}
}
