package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.domain.AdminSmLookupType;
import cn.com.yusys.icsp.service.AdminSmLookupTypeService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 字典分类别
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:30:35
 */
@RestController
@RequestMapping("/api/adminSmLookupType")
public class AdminSmLookupTypeResource extends BaseResouce {

    @Autowired
    private AdminSmLookupTypeService adminSmLookupTypeService;


    /**
     * @方法名称: create
     * @方法描述: 新增字典分类别
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmLookupType domain) throws Exception {
        int result = adminSmLookupTypeService.create(domain);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:字典分类别信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmLookupType> show(@RequestParam("lookupTypeId") String lookupTypeId) throws Exception {
        return ResultDto.success(adminSmLookupTypeService.show(lookupTypeId));
    }

    /**
     * @方法名称:index
     * @方法描述:字典分类别查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmLookupType>> index(QueryModel model) throws Exception {
        PageInfo<AdminSmLookupType> pageInfo = adminSmLookupTypeService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改字典分类别
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmLookupType domain) throws Exception {
        int result = adminSmLookupTypeService.update(domain);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除字典分类别
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete")
    public ResultDto<Integer> delete(@RequestBody Map<String, Object> reqMap) throws Exception {
        List<String> data = (List<String>) reqMap.get("data");
        int result = adminSmLookupTypeService.delete(data);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:index
     * @方法描述:字典树初始化查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/tree")
    public ResultDto<List<AdminSmLookupType>> tree(String instuId) throws Exception {
        QueryModel model = new QueryModel();
        if (instuId != null)
            model.addCondition("instuId", instuId);
        model.setSize(9999);// 最多显示9999个
        PageInfo<AdminSmLookupType> list = adminSmLookupTypeService.index(model);
        return ResultDto.success(list);
    }
}
