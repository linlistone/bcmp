package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.enums.ResultHttpCode;
import cn.com.yusys.icsp.domain.AdminSmFuncMod;
import cn.com.yusys.icsp.service.AdminSmFuncModService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adminSmFuncMod")
public class AdminSmFuncModResource extends BaseResouce {

    @Autowired
    private AdminSmFuncModService adminSmFuncModService;

    /**
     * @方法名称: create
     * @方法描述: 新增模块
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmFuncMod adminSmFuncMod) throws Exception {
        int result = adminSmFuncModService.create(adminSmFuncMod);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:模块节点信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmFuncMod> show(@RequestParam("modId") String modId) throws Exception {
        return ResultDto.success(adminSmFuncModService.show(modId));
    }

    /**
     * @方法名称:index
     * @方法描述:模块查询
     * @参数与返回说明: return ResultDto.success(adminSmFuncModService.show(modId));
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmFuncMod>> index(QueryModel model)
            throws Exception {
        PageInfo<AdminSmFuncMod> pageInfo = adminSmFuncModService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改模块
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmFuncMod adminSmFuncMod) throws Exception {
        int result = adminSmFuncModService.update(adminSmFuncMod);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除模块
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{modId}")
    public ResultDto<Integer> delete(@PathVariable("modId") String modId) throws Exception {
        int result = adminSmFuncModService.delete(modId);
        return ResultDto.success(result);
    }
}