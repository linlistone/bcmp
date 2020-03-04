package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.bean.HostAgnetBean;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AgentRegistryInfo;
import cn.com.yusys.icsp.service.BcmpSmAgentListService;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 代理服务器查询
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:08
 */
@RestController
@RequestMapping("/api/agent")
public class BcmpSmAgentListResource {

    private Logger logger = LoggerFactory.getLogger(BcmpSmAgentListResource.class);

    @Autowired
    private BcmpSmAgentListService bcmpSmAgentListService;

    /**
     * @方法名称: create
     * @方法描述: 代理服务器注册
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/registry")
    public ResultDto<Integer> create(@RequestBody AgentRegistryInfo agentRegistryInfo) throws Exception {
        int result = bcmpSmAgentListService.registry(agentRegistryInfo);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: create
     * @方法描述: 新增主机信息配置
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<HostAgnetBean>> index(QueryModel model) throws Exception {
        PageInfo<HostAgnetBean> pageInfo = bcmpSmAgentListService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     *
     * @方法名称: rebootAgentBatch
     * @方法描述: 批量重启
     * @参数与返回说明: ips 代理服务IP
     * @算法描述:
     */
    @PostMapping("/rebootAgentBatch")
    public ResultDto<Map<String,Integer>> rebootAgentBatch(String ips) throws Exception {
        int n=0;
        Map<String,Integer> result=new HashMap<>();
        if(ips !=null&&!"".equals(ips)) {
            String[] idStr=ips.toString().split(",");
            int nodeletes=0;
            String delete="";
            for(int i=0;i<idStr.length;i++)
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
//
//    /**
//     *
//     * @方法名称: startAppBatch
//     * @方法描述: 批量停止
//     * @参数与返回说明: ips 代理服务IP
//     * @算法描述:
//     */
//    @PostMapping("/startAppBatch")
//    public ResultDto<Map<String,Integer>> startAppBatch(String nodeInfoIds) throws Exception {
//        int n=0;
//        Map<String,Integer> result=new HashMap<>();
//        if(nodeInfoIds !=null&&!"".equals(nodeInfoIds)) {
//            String[] idStr=nodeInfoIds.toString().split(",");
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
//
//    /**
//     *
//     * @方法名称: shutdownAppBatch
//     * @方法描述: 批量停止
//     * @参数与返回说明: ips 代理服务IP
//     * @算法描述:
//     */
//    @PostMapping("/shutdownAgentBatch")
//    public ResultDto<Map<String,Integer>> shutdownAppBatch(String ips) throws Exception {
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
