package cn.com.yusys.icsp.bcmp.rest.web;

import java.util.Arrays;
import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.bcmp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.bcmp.service.BcmpSmHostinfoService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 主机信息配置
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:17
 */
@RestController
@RequestMapping("/api/bcmpSmHostinfo")
public class BcmpSmHostinfoResource extends BaseResouce {


	@Autowired
	private BcmpSmHostinfoService bcmpSmHostinfoService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增主机信息配置
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpSmHostinfo bcmpSmHostinfo) throws Exception {
		int result = bcmpSmHostinfoService.create(bcmpSmHostinfo);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("添加主机信息配置" + bcmpSmHostinfo.getHostId()
					+ "创建成功！ ");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称:show
	 * @方法描述:主机信息配置信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpSmHostinfo> show(@RequestParam("hostId") String hostId) throws Exception {
		return new ResultDto<BcmpSmHostinfo>(1, bcmpSmHostinfoService.show(hostId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:主机信息配置查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpSmHostinfo>> index(QueryModel model)
			throws Exception {
		List<BcmpSmHostinfo> list = bcmpSmHostinfoService.index(model);
		PageInfo<BcmpSmHostinfo> pageInfo = new PageInfo<>(list);
		return new ResultDto<List<BcmpSmHostinfo>>(pageInfo.getTotal(), list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改主机信息配置
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpSmHostinfo bcmpSmHostinfo) throws Exception {
		int result =  bcmpSmHostinfoService.update(bcmpSmHostinfo);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("模块" + bcmpSmHostinfo.getHostId() + "修改成功！");
		}
		resultDto.setData(result);
		return resultDto;
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除主机信息配置
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{hostId}")
	public ResultDto<Integer> delete(@PathVariable("hostId") String hostId) throws Exception {
		int result = bcmpSmHostinfoService.delete(hostId);
		ResultDto<Integer> resultDto = new ResultDto<>();
		if (result >= 1) {
			resultDto.setMessage("成功删除模块" + hostId + "");
		}
		resultDto.setData(result);
		return resultDto;
	}
}
