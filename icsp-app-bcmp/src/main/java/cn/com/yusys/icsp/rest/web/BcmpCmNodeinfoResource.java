package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpCmNodeinfo;
import cn.com.yusys.icsp.service.BcmpCmNodeinfoService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 节点信息表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:08
 */
@RestController
@RequestMapping("/api/bcmpCmNodeinfo")
public class BcmpCmNodeinfoResource extends BaseResouce {


	@Autowired
	private BcmpCmNodeinfoService bcmpCmNodeinfoService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增节点信息表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpCmNodeinfo bcmpCmNodeinfo) throws Exception {
		int result = bcmpCmNodeinfoService.create(bcmpCmNodeinfo);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:节点信息表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpCmNodeinfo> show(@RequestParam("nodeId") String nodeId) throws Exception {
		return ResultDto.success(bcmpCmNodeinfoService.show(nodeId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:节点信息表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpCmNodeinfo>> index(QueryModel model)
			throws Exception {
		PageInfo<BcmpCmNodeinfo> pageInfo = bcmpCmNodeinfoService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改节点信息表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpCmNodeinfo bcmpCmNodeinfo) throws Exception {
		int result =  bcmpCmNodeinfoService.update(bcmpCmNodeinfo);
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
		int result = bcmpCmNodeinfoService.delete(nodeId);
		return ResultDto.success( result);
	}
}
