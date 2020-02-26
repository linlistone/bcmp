package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.domain.AdminSmInstu;
import cn.com.yusys.icsp.service.AdminSmInstuService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 金融机构表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 16:47:36
 */
@RestController
@RequestMapping("/api/adminSmInstu")
public class AdminSmInstuResource extends BaseResouce {


    @Autowired
    private AdminSmInstuService adminSmInstuService;

    /**
     * @方法名称: create
     * @方法描述: 新增金融机构表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmInstu adminSmInstu) throws Exception {
        int result = adminSmInstuService.create(adminSmInstu);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:金融机构表信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<AdminSmInstu> show(@RequestParam("instuId") String instuId) throws Exception {
        return ResultDto.success(adminSmInstuService.show(instuId));
    }

    /**
     * @方法名称:index
     * @方法描述:金融机构表查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmInstu>> index(QueryModel model)
            throws Exception {
        PageInfo<AdminSmInstu> list = adminSmInstuService.index(model);
        return ResultDto.success(list);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改金融机构表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmInstu adminSmInstu) throws Exception {
        int result =  adminSmInstuService.update(adminSmInstu);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除金融机构表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{instuId}")
    public ResultDto<Integer> delete(@PathVariable("instuId") String instuId) throws Exception {
        int result = adminSmInstuService.delete(instuId);
        return ResultDto.success(result);
    }
}
