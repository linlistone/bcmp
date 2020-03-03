package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmOrg;
import cn.com.yusys.icsp.service.AdminSmOrgService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 系统机构表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-26 20:10:01
 */
@RestController
@RequestMapping("/api/adminSmOrg")
public class AdminSmOrgResource extends BaseResouce {


	@Autowired
	private AdminSmOrgService adminSmOrgService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增系统机构表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody AdminSmOrg adminSmOrg) throws Exception {
		int result = adminSmOrgService.create(adminSmOrg);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:系统机构表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<AdminSmOrg> show(@RequestParam("orgId") String orgId) throws Exception {
		return ResultDto.success(adminSmOrgService.show(orgId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:系统机构表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<AdminSmOrg>> index(QueryModel model)
			throws Exception {
		PageInfo<AdminSmOrg> pageInfo = adminSmOrgService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改系统机构表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody AdminSmOrg adminSmOrg) throws Exception {
		int result =  adminSmOrgService.update(adminSmOrg);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除系统机构表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{orgId}")
	public ResultDto<Integer> delete(@PathVariable("orgId") String orgId) throws Exception {
		int result = adminSmOrgService.delete(orgId);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:index
	 * @方法描述:系统机构表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/tree")
	public ResultDto<List<AdminSmOrg>> tree(@RequestParam("instuId") String instuId)
			throws Exception {
		List<AdminSmOrg> allList = adminSmOrgService.tree(instuId);
		return ResultDto.success( allList);
	}
}
