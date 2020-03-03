/*
 * 代码生成器自动生成的
 * Since 2008 - 2019
 *
 */
package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.service.AdminSmAuthRecoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0.0
 * @项目名称: sp-platform-oca-core模块
 * @类名称: AdminSmAuthRecoResource
 * @类描述: #资源类
 * @功能描述:
 * @创建人: c00177
 * @创建时间: 2019-06-26 18:23
 * @修改备注:
 * @修改记录: 修改时间 修改人员 修改原因
 * -------------------------------------------------------------
 * @Copyright (c) 2017宇信科技-版权所有
 */
@RestController
@RequestMapping("/api/adminSmAuthteco")
public class AdminSmAuthRecoResource extends BaseResouce {
    @Autowired
    private AdminSmAuthRecoService service;

    private Logger logger = LoggerFactory.getLogger(AdminSmAuthRecoResource.class);


    @GetMapping({"/menutreequery"})
    public ResultDto<List<Map<String, Object>>> selectMenuTree(String sysId) {
        sysId = SYSID;
        List<Map<String, Object>> list = this.service.selectMenuTree(sysId);
        return new ResultDto((long) list.size(), (Object) list);
    }

    /**
     * @方法名称: getRecoInfo
     * @方法描述: 查询对象资源关系数据
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping("/queryinfo")
    @ResponseBody
    public ResultDto<List<Map<String, Object>>> getRecoInfo(@RequestParam(name = "objectType", required = false) String objectType,
                                                            @RequestParam(name = "resType", required = false) String resType, @RequestParam(name = "objectId", required = false) String objectId,
                                                            @RequestParam(name = "sysId", required = false) String sysId) {
        logger.info("查询对象资源关系数据");
        List<Map<String, Object>> list = service.getList(objectType, resType, objectId, sysId);
        return new ResultDto((long) list.size(), (Object) list);
    }


    @PostMapping({"/saveinfo"})
    public ResultDto<Object> saveInfo(@RequestBody final Map<?, ?> t) throws Exception {
        int result = 0;
        if (t != null) {
            final List<Map<String, Object>> menus = (List<Map<String, Object>>) t.get("menuData");
            final List<Map<String, Object>> ctrs = (List<Map<String, Object>>) t.get("ctrData");
            result = this.service.insertBatch(menus, ctrs);
            logger.info("修改象资源关系数据");
        }
        return ResultDto.success(result);
    }

}
