package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.bean.HostAgentBean;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.service.BcmpSmAgentListService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 代理服务器查询
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:08
 */
@RestController
@RequestMapping("/api/agent")
public class BcmpSmAgentListResource {
    //注入Agent服务列表
    @Autowired
    private BcmpSmAgentListService bcmpSmAgentListService;
    /**
     * @方法名称: create
     * @方法描述: 新增主机信息配置
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<HostAgentBean>> index(QueryModel model) throws Exception {
        PageInfo<HostAgentBean> pageInfo = bcmpSmAgentListService.index(model);
        return ResultDto.success(pageInfo);
    }
    /**
     * @方法名称: rebootAgentBatch
     * @方法描述: 批量重启
     * @参数与返回说明: ips 代理服务IP
     * @算法描述:
     */
    @PostMapping("/rebootAgentBatch")
    public ResultDto<Map<String, Integer>> rebootAgentBatch(String ips) throws Exception {
        int n = 0;
        Map<String, Integer> result = new HashMap<>();
        if (ips != null && !"".equals(ips)) {
            String[] idStr = ips.toString().split(",");
            int nodeletes = 0;
            String delete = "";
            for (int i = 0; i < idStr.length; i++)
                if (!"".equals(idStr[i])) {
                    int res = bcmpSmAgentListService.retbootAgent(idStr[i]);
                    result.put(idStr[i], res);
                }
        }
        return ResultDto.success(result);
    }

//    /**
//     *
//     * @方法名称: shutdownAgentBatch
//     * @方法描述: 批量停止
//     * @参数与返回说明: ips 代理服务IP
//     * @算法描述:
//     */
//    @PostMapping("/shutdownAgentBatch")
//    public ResultDto<Map<String,Integer>> shutdownAgentBatch(String ips) throws Exception {
//        int n=0;
//        Map<String,Integer> result=new HashMap<>();
//        if(ips !=null&&!"".equals(ips)) {
//            String[] idStr=ips.toString().split(",");
//            int nodeletes=0;
//            String delete="";
//            for(int i=0;i<idStr.length;i++)
//                if (!"".equals(idStr[i])) {
//                    int res = bcmpSmAgentListService.shutdownAgent(idStr[i]);
//                    result.put(idStr[i], res);
//                }
//        }
//        return ResultDto.success(result);
//    }

}
