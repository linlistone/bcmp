package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.domain.AdminSmLookupItem;
import cn.com.yusys.icsp.service.AdminSmLookupItemService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adminSmLookupItem")
public class AdminSmLookupItemResource extends BaseResouce {

    @Autowired
    private AdminSmLookupItemService adminSmLookupItemService;

    /**
     * @方法名称: create
     * @方法描述: 新增LookupItem
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmLookupItem adminSmLookupItem) throws Exception {
        int result = adminSmLookupItemService.create(adminSmLookupItem);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:LookupItem节点信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmLookupItem> show(@RequestParam("lookupItemId") String lookupItemId)
            throws Exception {
        return ResultDto.success(
                adminSmLookupItemService.show(lookupItemId));
    }

    /**
     * @方法名称:index
     * @方法描述:LookupItem树初始化查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmLookupItem>> index(QueryModel model)
            throws Exception {
        PageInfo<AdminSmLookupItem> list = adminSmLookupItemService.index(model);
        return ResultDto.success(list);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改LookupItem
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmLookupItem adminSmLookupItem) throws Exception {
        int result = adminSmLookupItemService.update(adminSmLookupItem);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除LookupItem
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{lookupItemId}")
    public ResultDto<Integer> delete(@PathVariable("lookupItemId") String lookupItemId) throws Exception {
        int result = adminSmLookupItemService.delete(lookupItemId);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:index
     * @方法描述:LookupItem树初始化查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/weblist")
    public ResultDto<Map<String, List<Map<String, String>>>> weblist(
            @RequestParam("lookupCodes") String lookupCodes) throws Exception {
        Map<String, List<Map<String, String>>> object = new HashMap<String, List<Map<String, String>>>();
        if (lookupCodes.contains(",")) {
            String[] idstr = lookupCodes.split(",");
            for (int id = 0; id < idstr.length; id++) {
                Map<String, List<Map<String, String>>> map = adminSmLookupItemService
                        .getLookupCodeList(idstr[id]);
                object.putAll(map);
            }
        } else {
            object = adminSmLookupItemService.getLookupCodeList(lookupCodes);
        }
        return ResultDto.success(object);

    }
}