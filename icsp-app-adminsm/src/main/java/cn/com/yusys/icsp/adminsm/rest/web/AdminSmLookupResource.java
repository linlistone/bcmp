package cn.com.yusys.icsp.adminsm.rest.web;

import cn.com.yusys.icsp.adminsm.domain.AdminSmLookup;
import cn.com.yusys.icsp.adminsm.service.AdminSmLookupService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public ResultDto<Integer> create(AdminSmLookup domain) throws Exception {
        int result = adminSmLookupService.create(domain);
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("添加数据字典表" + domain.getLookupId() + "创建成功！ ");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称:show
     * @方法描述:数据字典表信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmLookup> show(String lookupId) throws Exception {
        return new ResultDto<AdminSmLookup>(1, adminSmLookupService.show(lookupId));
    }

    /**
     * @方法名称:index
     * @方法描述:数据字典表查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmLookup>> index(QueryModel model) throws Exception {
        List<AdminSmLookup> list = adminSmLookupService.index(model);
        PageInfo<AdminSmLookup> pageInfo = new PageInfo<>(list);
        return new ResultDto<List<AdminSmLookup>>(pageInfo.getTotal(), list);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改数据字典表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(AdminSmLookup domain) throws Exception {
        int result = adminSmLookupService.update(domain);
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("模块" + domain.getLookupId() + "修改成功！");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除数据字典表
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/delete")
    public ResultDto<Integer> delete(String lookupId, String lookupCode) throws Exception {
        int result = adminSmLookupService.delete(lookupId, lookupCode);
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("成功删除模块" + lookupId + "");
        }
        resultDto.setData(result);
        return resultDto;
    }
}
