package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceLocation;
import cn.com.yusys.icsp.service.BcmpSmDeviceLocationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 设备定位历史
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 22:39:18
 */
@RestController
@RequestMapping("/api/bcmpSmDeviceLocation")
public class BcmpSmDeviceLocationResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(BcmpSmDeviceLocationResource.class);

	@Autowired
	private BcmpSmDeviceLocationService bcmpSmDeviceLocationService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增设备定位历史
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpSmDeviceLocation bcmpSmDeviceLocation) throws Exception {
		int result = bcmpSmDeviceLocationService.create(bcmpSmDeviceLocation);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:设备定位历史信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpSmDeviceLocation> show(@RequestParam("locationId") String locationId) throws Exception {
		return ResultDto.success(bcmpSmDeviceLocationService.show(locationId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:设备定位历史查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpSmDeviceLocation>> index(QueryModel model)
			throws Exception {
		PageInfo<BcmpSmDeviceLocation> pageInfo = bcmpSmDeviceLocationService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改设备定位历史
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpSmDeviceLocation bcmpSmDeviceLocation) throws Exception {
		int result =  bcmpSmDeviceLocationService.update(bcmpSmDeviceLocation);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除设备定位历史
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{locationId}")
	public ResultDto<Integer> delete(@PathVariable("locationId") String locationId) throws Exception {
		int result = bcmpSmDeviceLocationService.delete(locationId);
		return ResultDto.success( result);
	}
}
