package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.service.BcmpSmNodeinfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 节点信息表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-01 22:17:48
 */
@RestController
@RequestMapping("/api/bcmpSmNodeinfo")
public class BcmpSmNodeinfoResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(BcmpSmNodeinfoResource.class);

	@Autowired
	private BcmpSmNodeinfoService bcmpSmNodeinfoService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增节点信息表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
		int result = bcmpSmNodeinfoService.create(bcmpSmNodeinfo);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:节点信息表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpSmNodeinfo> show(@RequestParam("nodeId") String nodeId) throws Exception {
		return ResultDto.success(bcmpSmNodeinfoService.show(nodeId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:节点信息表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpSmNodeinfo>> index(QueryModel model)
			throws Exception {
		PageInfo<BcmpSmNodeinfo> pageInfo = bcmpSmNodeinfoService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改节点信息表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
		int result =  bcmpSmNodeinfoService.update(bcmpSmNodeinfo);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除节点信息表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{nodeId}")
	public ResultDto<Integer> delete(@PathVariable("nodeId") String nodeId) throws Exception {
		int result = bcmpSmNodeinfoService.delete(nodeId);
		return ResultDto.success( result);
	}
}
