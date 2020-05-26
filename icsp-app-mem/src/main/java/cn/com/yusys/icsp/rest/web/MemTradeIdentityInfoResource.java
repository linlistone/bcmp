package cn.com.yusys.icsp.rest;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.MemTradeIdentityInfo;
import cn.com.yusys.icsp.service.MemTradeIdentityInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * MEM_ TRADE_ IDEHTITY_INFO
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-05-23 16:50:09
 */
@RestController
@RequestMapping("/api/memTradeIdentityInfo")
public class MemTradeIdentityInfoResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(MemTradeIdentityInfoResource.class);

	@Autowired
	private MemTradeIdentityInfoService memTradeIdentityInfoService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增MEM_ TRADE_ IDEHTITY_INFO
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody MemTradeIdentityInfo memTradeIdentityInfo) throws Exception {
		int result = memTradeIdentityInfoService.create(memTradeIdentityInfo);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:MEM_ TRADE_ IDEHTITY_INFO信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<MemTradeIdentityInfo> show(@RequestParam("memTradeIdentityId") String memTradeIdentityId) throws Exception {
		return ResultDto.success(memTradeIdentityInfoService.show(memTradeIdentityId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:MEM_ TRADE_ IDEHTITY_INFO查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<MemTradeIdentityInfo>> index(QueryModel model)
			throws Exception {
		PageInfo<MemTradeIdentityInfo> pageInfo = memTradeIdentityInfoService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改MEM_ TRADE_ IDEHTITY_INFO
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody MemTradeIdentityInfo memTradeIdentityInfo) throws Exception {
		int result =  memTradeIdentityInfoService.update(memTradeIdentityInfo);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除MEM_ TRADE_ IDEHTITY_INFO
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{memTradeIdentityId}")
	public ResultDto<Integer> delete(@PathVariable("memTradeIdentityId") String memTradeIdentityId) throws Exception {
		int result = memTradeIdentityInfoService.delete(memTradeIdentityId);
		return ResultDto.success( result);
	}
}
