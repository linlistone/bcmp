package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.domain.AdminSmLookup;
import cn.com.yusys.icsp.service.AdminSmLookupService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 数据字典表
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:47:03
 */
@RestController
@RequestMapping("/api/adminSmLookup")
public class AdminSmLookupResource extends BaseResouce {

    @Autowired
    private AdminSmLookupService adminSmLookupService;

    /**
     * @方法名称: create
     * @方法描述: 新增数据字典表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmLookup domain) throws Exception {
        int result = adminSmLookupService.create(domain);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:数据字典表信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmLookup> show(@RequestParam("lookupId") String lookupId) throws Exception {
        return ResultDto.success(adminSmLookupService.show(lookupId));
    }

    /**
     * @方法名称:index
     * @方法描述:数据字典表查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmLookup>> index(QueryModel model) throws Exception {
        PageInfo<AdminSmLookup> list = adminSmLookupService.index(model);
        return ResultDto.success( list);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改数据字典表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmLookup domain) throws Exception {
        int result = adminSmLookupService.update(domain);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除数据字典表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete")
    public ResultDto<Integer> delete(@RequestBody Map<String, Object> data) throws Exception {
        String lookupId = (String) data.get("lookupId");
        String lookupCode = (String) data.get("lookupCode");
        int result = adminSmLookupService.delete(lookupId, lookupCode);
        return ResultDto.success(result);
    }
}
