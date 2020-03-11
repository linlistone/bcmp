package cn.com.yusys.icsp.rest;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmAppMod;
import cn.com.yusys.icsp.service.BcmpSmAppModService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 应用模块定义
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-11 10:31:26
 */
@RestController
@RequestMapping("/api/bcmpSmAppMod")
public class BcmpSmAppModResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(BcmpSmAppModResource.class);

	@Autowired
	private BcmpSmAppModService bcmpSmAppModService;

	/**
	 * @方法名称:index
	 * @方法描述:应用模块定义查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/select")
	public ResultDto<List<BcmpSmAppMod>> select(QueryModel model)
			throws Exception {
		List<BcmpSmAppMod> pageInfo = bcmpSmAppModService.all(model);
		return ResultDto.success( pageInfo);
	}


	/**
	 * @方法名称: create
	 * @方法描述: 新增应用模块定义
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpSmAppMod bcmpSmAppMod) throws Exception {
		int result = bcmpSmAppModService.create(bcmpSmAppMod);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:应用模块定义信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpSmAppMod> show(@RequestParam("appModId") String appModId) throws Exception {
		return ResultDto.success(bcmpSmAppModService.show(appModId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:应用模块定义查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpSmAppMod>> index(QueryModel model)
			throws Exception {
		PageInfo<BcmpSmAppMod> pageInfo = bcmpSmAppModService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改应用模块定义
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpSmAppMod bcmpSmAppMod) throws Exception {
		int result =  bcmpSmAppModService.update(bcmpSmAppMod);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除应用模块定义
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{appModId}")
	public ResultDto<Integer> delete(@PathVariable("appModId") String appModId) throws Exception {
		int result = bcmpSmAppModService.delete(appModId);
		return ResultDto.success( result);
	}
}
