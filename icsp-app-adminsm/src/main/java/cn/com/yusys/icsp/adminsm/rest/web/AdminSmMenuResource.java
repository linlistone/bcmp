package cn.com.yusys.icsp.adminsm.rest.web;

import cn.com.yusys.icsp.adminsm.domain.AdminSmMenu;
import cn.com.yusys.icsp.adminsm.domain.MenuBean;
import cn.com.yusys.icsp.adminsm.service.AdminSmMenuService;
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
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("添加菜单" + adminSmMenu.getMenuName() + "创建成功！ ");
        }
        resultDto.setData(result);
        return resultDto;
    }

    /**
     * @方法名称:show
     * @方法描述:菜单节点信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<MenuBean> show(@RequestParam("menuId") String menuId) throws Exception {
        return new ResultDto<MenuBean>(1, adminSmMenuService.show(menuId));
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
        List<AdminSmMenu> list = adminSmMenuService.index(model);
        PageInfo<AdminSmMenu> pageInfo = new PageInfo<>(list);
        return new ResultDto<List<AdminSmMenu>>(pageInfo.getTotal(), list);
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
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("菜单" + adminSmMenu.getMenuName() + "修改成功！");
        }
        resultDto.setData(result);
        return resultDto;
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
        ResultDto<Integer> resultDto = new ResultDto<>();
        if (result >= 1) {
            resultDto.setMessage("成功删除菜单" + menuId + "");
        }
        resultDto.setData(result);
        return resultDto;
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
        List<AdminSmMenu> list = adminSmMenuService.index(model);
        PageInfo<AdminSmMenu> pageInfo = new PageInfo<>(list);
        return new ResultDto<List<AdminSmMenu>>(pageInfo.getTotal(), list);
    }

}