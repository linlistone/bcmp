package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceUser;
import cn.com.yusys.icsp.service.BcmpSmDeviceUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 设备领用记录
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 21:40:08
 */
@RestController
@RequestMapping("/api/bcmpSmDeviceUser")
public class BcmpSmDeviceUserResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(BcmpSmDeviceUserResource.class);

	@Autowired
	private BcmpSmDeviceUserService bcmpSmDeviceUserService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增设备领用记录
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpSmDeviceUser bcmpSmDeviceUser) throws Exception {
		int result = bcmpSmDeviceUserService.create(bcmpSmDeviceUser);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:设备领用记录信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpSmDeviceUser> show(@RequestParam("linkId") String linkId) throws Exception {
		return ResultDto.success(bcmpSmDeviceUserService.show(linkId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:设备领用记录查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpSmDeviceUser>> index(QueryModel model)
			throws Exception {
		PageInfo<BcmpSmDeviceUser> pageInfo = bcmpSmDeviceUserService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改设备领用记录
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpSmDeviceUser bcmpSmDeviceUser) throws Exception {
		int result =  bcmpSmDeviceUserService.update(bcmpSmDeviceUser);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除设备领用记录
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{linkId}")
	public ResultDto<Integer> delete(@PathVariable("linkId") String linkId) throws Exception {
		int result = bcmpSmDeviceUserService.delete(linkId);
		return ResultDto.success( result);
	}
}
