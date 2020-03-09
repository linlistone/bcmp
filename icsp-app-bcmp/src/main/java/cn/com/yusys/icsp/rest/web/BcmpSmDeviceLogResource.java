package cn.com.yusys.icsp.rest.web;

import java.util.List;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceLog;
import cn.com.yusys.icsp.service.BcmpSmDeviceLogService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 设备日志上传表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 23:02:18
 */
@RestController
@RequestMapping("/api/bcmpSmDeviceLog")
public class BcmpSmDeviceLogResource extends BaseResouce {

	private static final Logger logger = LoggerFactory.getLogger(BcmpSmDeviceLogResource.class);

	@Autowired
	private BcmpSmDeviceLogService bcmpSmDeviceLogService;

	/**
	 * @方法名称: create
	 * @方法描述: 新增设备日志上传表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/create")
	public ResultDto<Integer> create(@RequestBody BcmpSmDeviceLog bcmpSmDeviceLog) throws Exception {
		int result = bcmpSmDeviceLogService.create(bcmpSmDeviceLog);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称:show
	 * @方法描述:设备日志上传表信息查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/show")
	public ResultDto<BcmpSmDeviceLog> show(@RequestParam("deviceLogId") String deviceLogId) throws Exception {
		return ResultDto.success(bcmpSmDeviceLogService.show(deviceLogId));
	}

	/**
	 * @方法名称:index
	 * @方法描述:设备日志上传表查询
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@GetMapping(value = "/index")
	public ResultDto<List<BcmpSmDeviceLog>> index(QueryModel model)
			throws Exception {
		PageInfo<BcmpSmDeviceLog> pageInfo = bcmpSmDeviceLogService.index(model);
		return ResultDto.success( pageInfo);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 修改设备日志上传表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/update")
	public ResultDto<Integer> update(@RequestBody BcmpSmDeviceLog bcmpSmDeviceLog) throws Exception {
		int result =  bcmpSmDeviceLogService.update(bcmpSmDeviceLog);
		return ResultDto.success( result);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 删除设备日志上传表
	 * @参数与返回说明:
	 * @算法描述:
	 */
	@PostMapping(value = "/delete/{deviceLogId}")
	public ResultDto<Integer> delete(@PathVariable("deviceLogId") String deviceLogId) throws Exception {
		int result = bcmpSmDeviceLogService.delete(deviceLogId);
		return ResultDto.success( result);
	}

	/**
	 * 生download
	 */
	@RequestMapping("/download")
	@ResponseBody
	public void download(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String deviceLogId = request.getParameter("deviceLogId");
		byte[] data = (deviceLogId+"log").getBytes();
		response.reset();
		response.setHeader("Content-Disposition", "attachment; filename=\""+deviceLogId+"_log.zip\"");
		response.addHeader("Content-Length", "" + data.length);
		response.setContentType("application/octet-stream; charset=UTF-8");
		IOUtils.write(data, response.getOutputStream());
	}
}
