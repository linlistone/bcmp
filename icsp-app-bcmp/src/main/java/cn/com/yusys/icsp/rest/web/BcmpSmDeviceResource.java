package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDevice;
import cn.com.yusys.icsp.service.BcmpSmDeviceService;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 设备登记表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:29
 */
@RestController
@RequestMapping("/api/bcmpSmDevice")
public class BcmpSmDeviceResource extends BaseResouce {

    private static final Logger logger = LoggerFactory.getLogger(BcmpSmDeviceResource.class);

    @Autowired
    private BcmpSmDeviceService bcmpSmDeviceService;



    /**
     * @方法名称: create
     * @方法描述: 新增设备登记表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody BcmpSmDevice bcmpSmDevice) throws Exception {
        int result = bcmpSmDeviceService.create(bcmpSmDevice);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:设备登记表信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<BcmpSmDevice> show(@RequestParam("deviceId") String deviceId) throws Exception {
        return ResultDto.success(bcmpSmDeviceService.show(deviceId));
    }

    /**
     * @方法名称:index
     * @方法描述:设备登记表查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<BcmpSmDevice>> index(QueryModel model)
            throws Exception {
        PageInfo<BcmpSmDevice> pageInfo = bcmpSmDeviceService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改设备登记表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody BcmpSmDevice bcmpSmDevice) throws Exception {
        int result = bcmpSmDeviceService.update(bcmpSmDevice);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除设备登记表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{deviceId}")
    public ResultDto<Integer> delete(@PathVariable("deviceId") String deviceId) throws Exception {
        int result = bcmpSmDeviceService.delete(deviceId);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: 'usebatch'
     * @方法描述: 启用
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/usebatch")
    public ResultDto<Integer> usebatch(@RequestBody Map<String, Object> data) throws Exception {
        int result = bcmpSmDeviceService.updateBatch("usebatch", data);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: unusebatch
     * @方法描述: 停用
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/unusebatch")
    public ResultDto<Integer> unusebatch(@RequestBody Map<String, Object> data) throws Exception {
        int result = bcmpSmDeviceService.updateBatch("unusebatch", data);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: 'logoffbatch'
     * @方法描述: 注册
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/logoffbatch")
    public ResultDto<Integer> logoffbatch(@RequestBody Map<String, Object> data) throws Exception {
        int result = bcmpSmDeviceService.updateBatch("logoffbatch", data);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: link
     * @方法描述: 领用设备登记表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/link")
    public ResultDto<Integer> link(@RequestBody BcmpSmDevice bcmpSmDevice) throws Exception {
        int result = bcmpSmDeviceService.link(bcmpSmDevice);
        return ResultDto.success(result);
    }


}
