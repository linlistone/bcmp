package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmUser;
import cn.com.yusys.icsp.service.AdminSmUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 系统用户表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-02 17:23:53
 */
@RestController
@RequestMapping("/api/adminSmUser")
public class AdminSmUserResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(AdminSmUserResource.class);

	@Autowired
	private AdminSmUserService adminSmUserService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增系统用户表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody AdminSmUser adminSmUser) throws Exception {
		int result = adminSmUserService.create(adminSmUser);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:系统用户表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<AdminSmUser> show(@RequestParam("userId") String userId) throws Exception {
		return ResultDto.success(adminSmUserService.show(userId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:系统用户表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<AdminSmUser>> index(QueryModel model)
			throws Exception {
		PageInfo<AdminSmUser> pageInfo = adminSmUserService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改系统用户表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody AdminSmUser adminSmUser) throws Exception {
		int result =  adminSmUserService.update(adminSmUser);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除系统用户表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{userId}")
	public ResultDto<Integer> delete(@PathVariable("userId") String userId) throws Exception {
		int result = adminSmUserService.delete(userId);
		return ResultDto.success( result);
	}
}
