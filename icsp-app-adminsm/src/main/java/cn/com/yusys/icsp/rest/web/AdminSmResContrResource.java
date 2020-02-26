package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AdminSmResContr;
import cn.com.yusys.icsp.service.AdminSmResContrService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 系统功能控制点表
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-10 00:05:20
 */
@RestController
@RequestMapping("/api/adminSmResContr")
public class AdminSmResContrResource extends BaseResouce {
    @Autowired
    private AdminSmResContrService adminSmResContrService;

    /**
     * @方法名称: create
     * @方法描述: 新增系统功能控制点表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmResContr adminSmResContr) throws Exception {
        int result = adminSmResContrService.create(adminSmResContr);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:系统功能控制点表信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmResContr> show(@RequestParam("contrId") String contrId) throws Exception {
        return ResultDto.success(adminSmResContrService.show(contrId));
    }

    /**
     * @方法名称:index
     * @方法描述:系统功能控制点表查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmResContr>> index(QueryModel model) throws Exception {
        PageInfo<AdminSmResContr> list = adminSmResContrService.index(model);
        return ResultDto.success(list);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改系统功能控制点表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmResContr adminSmResContr) throws Exception {
        int result = adminSmResContrService.update(adminSmResContr);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除系统功能控制点表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{contrId}")
    public ResultDto<Integer> delete(@PathVariable("contrId") String contrId) throws Exception {
        int result = adminSmResContrService.delete(contrId);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: getFuncTree
     * @方法描述:初始化左侧树,层级为模块、业务功能管理
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/funcTree")
    public ResultDto<List<Map<String, Object>>> funcTree(QueryModel model) throws Exception {
        model.addCondition("sysId", SYSID);
        ResultDto<List<Map<String, Object>>> resultDto = new ResultDto<>();
        List<Map<String, Object>> list = adminSmResContrService.getFuncTree(model);
        resultDto.setData(list);
        return resultDto;
    }

    /**
     * @方法名称: getFuncTree
     * @方法描述:初始化左侧树,层级为模块、业务功能管理
     * @参数与返回说明:
     * @算法描述:
     */
    @SuppressWarnings("unchecked")
    @GetMapping(value = "/ifcoderepeat")
    public ResultDto<List<Map<String, Object>>> ifcoderepeat(Map<String, Object> model) throws Exception {
        ResultDto<List<Map<String, Object>>> resultDto = new ResultDto<>();
        List<Map<String, Object>> list = adminSmResContrService.ifCodeRepeat(model);
        resultDto.setData(list);
        return resultDto;
    }

}
