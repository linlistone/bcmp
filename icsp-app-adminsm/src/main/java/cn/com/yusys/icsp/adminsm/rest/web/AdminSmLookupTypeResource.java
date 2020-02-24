package cn.com.yusys.icsp.adminsm.rest.web;

import cn.com.yusys.icsp.adminsm.domain.AdminSmLookupType;
import cn.com.yusys.icsp.adminsm.service.AdminSmLookupTypeService;
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
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("添加字典分类别" + domain.getLookupTypeId() + "创建成功！ ");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称:show
     * @方法描述:字典分类别信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmLookupType> show(@RequestParam("lookupTypeId") String lookupTypeId) throws Exception {
        return new ResultDto<AdminSmLookupType>(1, adminSmLookupTypeService.show(lookupTypeId));
    }

    /**
     * @方法名称:index
     * @方法描述:字典分类别查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmLookupType>> index(QueryModel model) throws Exception {
        List<AdminSmLookupType> list = adminSmLookupTypeService.index(model);
        PageInfo<AdminSmLookupType> pageInfo = new PageInfo<>(list);
        return new ResultDto<List<AdminSmLookupType>>(pageInfo.getTotal(), list);
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
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("模块" + domain.getLookupTypeId() + "修改成功！");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除字典分类别
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete")
    public ResultDto<Integer> delete(@RequestBody Map<String, Object> reqMap) throws Exception {
        String data = (String) reqMap.get("data");
        int result = adminSmLookupTypeService.delete(data);
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("成功删除模块" + data + "");
        }
        resultDto.setData(result);
        return resultDto;
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
        List<AdminSmLookupType> list = adminSmLookupTypeService.index(model);
        PageInfo<AdminSmLookupType> pageInfo = new PageInfo<>(list);
        return new ResultDto<List<AdminSmLookupType>>(pageInfo.getTotal(), list);
    }
}
