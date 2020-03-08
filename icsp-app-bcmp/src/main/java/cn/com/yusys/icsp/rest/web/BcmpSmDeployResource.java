package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeploy;
import cn.com.yusys.icsp.service.BcmpSmDeployService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 应用部署表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:34
 */
@RestController
@RequestMapping("/api/bcmpSmDeploy")
public class BcmpSmDeployResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(BcmpSmDeployResource.class);

	@Autowired
	private BcmpSmDeployService bcmpSmDeployService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增应用部署表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpSmDeploy bcmpSmDeploy) throws Exception {
		int result = bcmpSmDeployService.create(bcmpSmDeploy);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:应用部署表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpSmDeploy> show(@RequestParam("deployId") String deployId) throws Exception {
		return ResultDto.success(bcmpSmDeployService.show(deployId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:应用部署表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpSmDeploy>> index(QueryModel model)
			throws Exception {
		PageInfo<BcmpSmDeploy> pageInfo = bcmpSmDeployService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改应用部署表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpSmDeploy bcmpSmDeploy) throws Exception {
		int result =  bcmpSmDeployService.update(bcmpSmDeploy);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除应用部署表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{deployId}")
	public ResultDto<Integer> delete(@PathVariable("deployId") String deployId) throws Exception {
		int result = bcmpSmDeployService.delete(deployId);
		return ResultDto.success( result);
	}
}
