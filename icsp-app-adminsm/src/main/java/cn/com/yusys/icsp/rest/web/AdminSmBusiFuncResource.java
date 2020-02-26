package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.domain.AdminSmBusiFunc;
import cn.com.yusys.icsp.service.AdminSmBusiFuncService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.enums.ResultHttpCode;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adminSmBusiFunc")
public class AdminSmBusiFuncResource extends BaseResouce {

    @Autowired
    private AdminSmBusiFuncService adminSmBusiFuncService;

    /**
     * @方法名称: create
     * @方法描述: 新增模块
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmBusiFunc adminSmFuncMod) throws Exception {
        int result = adminSmBusiFuncService.create(adminSmFuncMod);
        return ResultDto.success(result);
    }

    /**
     * @throws Exception
     * @方法名称:show
     * @方法描述:模块节点信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmBusiFunc> show(@RequestParam("funcId") String funcId)
            throws Exception {
        return ResultDto.success(adminSmBusiFuncService.show(funcId));
    }

    /**
     * @方法名称:index
     * @方法描述:模块树初始化查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmBusiFunc>> index(QueryModel model)
            throws Exception {
        PageInfo<AdminSmBusiFunc> pageInfo = adminSmBusiFuncService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改模块
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmBusiFunc adminSmMenu) throws Exception {
        int result = adminSmBusiFuncService.update(adminSmMenu);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除模块
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{funcId}")
    public ResultDto<Integer> delete(@PathVariable("funcId") String funcId) throws Exception {
        int result = adminSmBusiFuncService.delete(funcId);
        return ResultDto.success(result);
    }
}