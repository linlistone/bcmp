package cn.com.yusys.icsp.adminsm.rest.web;

import cn.com.yusys.icsp.adminsm.domain.AdminSmLookupItem;
import cn.com.yusys.icsp.adminsm.service.AdminSmLookupItemService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResultDto<Integer> create(AdminSmLookupItem adminSmLookupItem) throws Exception {
        int result = adminSmLookupItemService.create(adminSmLookupItem);
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("添加LookupItem"
                    + adminSmLookupItem.getLookupItemCode() + "创建成功！ ");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称:show
     * @方法描述:LookupItem节点信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmLookupItem> show(String menuId)
            throws Exception {
        return new ResultDto<AdminSmLookupItem>(1,
                adminSmLookupItemService.show(menuId));
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
        List<AdminSmLookupItem> list = adminSmLookupItemService.index(model);
        PageInfo<AdminSmLookupItem> pageInfo = new PageInfo<>(list);
        return new ResultDto<List<AdminSmLookupItem>>(pageInfo.getTotal(), list);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改LookupItem
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(AdminSmLookupItem adminSmLookupItem) throws Exception {

        int result = adminSmLookupItemService.update(adminSmLookupItem);
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("LookupItem"
                    + adminSmLookupItem.getLookupItemName() + "修改成功！");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除LookupItem
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/delete")
    public ResultDto<Integer> delete(String lookupItemId) throws Exception {
        int result = adminSmLookupItemService.delete(lookupItemId);
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("成功删除LookupItem" + lookupItemId + "");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称:index
     * @方法描述:LookupItem树初始化查询
     * @参数与返回说明:
     * @算法描述:
     */
    public ResultDto<Map<String, List<Map<String, String>>>> weblist(
            String lookupCodes) throws Exception {
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
        return new ResultDto<Map<String, List<Map<String, String>>>>(
                object.size(), object);

    }

    // /**
    // * @方法名称: getLookupCode
    // * @方法描述: 前台WEB加载字典（需要在此封装逻辑，不然service层无法用到原子REDIS查询）
    // * @参数与返回说明:
    // * @算法描述:
    // */
    // public ResultDto<Map<String, List<Map<String, String>>>> getLookupCode(
    // String lookupCodes) {
    //
    // }
}