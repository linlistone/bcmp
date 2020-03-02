package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmDuty;
import cn.com.yusys.icsp.service.AdminSmDutyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 系统岗位表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-02 09:16:03
 */
@RestController
@RequestMapping("/api/adminSmDuty")
public class AdminSmDutyResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(AdminSmDutyResource.class);

	@Autowired
	private AdminSmDutyService adminSmDutyService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增系统岗位表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody AdminSmDuty adminSmDuty) throws Exception {
		int result = adminSmDutyService.create(adminSmDuty);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:系统岗位表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<AdminSmDuty> show(@RequestParam("dutyId") String dutyId) throws Exception {
		return ResultDto.success(adminSmDutyService.show(dutyId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:系统岗位表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<AdminSmDuty>> index(QueryModel model)
			throws Exception {
		PageInfo<AdminSmDuty> pageInfo = adminSmDutyService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改系统岗位表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody AdminSmDuty adminSmDuty) throws Exception {
		int result =  adminSmDutyService.update(adminSmDuty);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除系统岗位表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{dutyId}")
	public ResultDto<Integer> delete(@PathVariable("dutyId") String dutyId) throws Exception {
		int result = adminSmDutyService.delete(dutyId);
		return ResultDto.success( result);
	}
}
