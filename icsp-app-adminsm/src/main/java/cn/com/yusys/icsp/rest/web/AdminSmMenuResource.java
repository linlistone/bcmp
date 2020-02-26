package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.domain.AdminSmMenu;
import cn.com.yusys.icsp.domain.MenuBean;
import cn.com.yusys.icsp.service.AdminSmMenuService;
import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adminSmMenu")
public class AdminSmMenuResource extends BaseResouce {

    @Autowired
    private AdminSmMenuService adminSmMenuService;

    /**
     * @方法名称: create
     * @方法描述: 新增菜单
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody AdminSmMenu adminSmMenu) throws Exception {
        int result = adminSmMenuService.create(adminSmMenu);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:菜单节点信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<MenuBean> show(@RequestParam("menuId") String menuId) throws Exception {
        return ResultDto.success(adminSmMenuService.show(menuId));
    }

    /**
     * @方法名称:index
     * @方法描述:菜单树初始化查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<AdminSmMenu>> index(QueryModel model)
            throws Exception {
        PageInfo<AdminSmMenu> list = adminSmMenuService.index(model);
        return ResultDto.success( list);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改菜单
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody AdminSmMenu adminSmMenu) throws Exception {
        int result = adminSmMenuService.update(adminSmMenu);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除菜单
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{menuId}")
    public ResultDto<Integer> delete(@PathVariable("menuId") String menuId) throws Exception {
        int result = adminSmMenuService.delete(menuId);
        return ResultDto.success(result);
    }

    /**
     * @方法名称:index
     * @方法描述:菜单树初始化查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/tree")
    public ResultDto<List<AdminSmMenu>> tree(@RequestParam("sysId") String sysId)
            throws Exception {
        QueryModel model = new QueryModel();
        model.addCondition("sysId", SYSID);
        model.setSize(9999);//最多显示9999个
        PageInfo<AdminSmMenu> list = adminSmMenuService.index(model);
        return ResultDto.success( list);
    }

}