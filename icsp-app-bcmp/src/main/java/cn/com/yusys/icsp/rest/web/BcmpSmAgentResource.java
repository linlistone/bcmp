package cn.com.yusys.icsp.rest.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmAgent;
import cn.com.yusys.icsp.service.BcmpSmAgentService;
import cn.com.yusys.icsp.util.CusAccessObjectUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 代理服务表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:39
 */
@RestController
@RequestMapping("/api/agent")
public class BcmpSmAgentResource extends BaseResouce {

    private static final Logger logger = LoggerFactory.getLogger(BcmpSmAgentResource.class);

    @Autowired
    private BcmpSmAgentService bcmpSmAgentService;

    /**
     * @方法名称: registry
     * @方法描述: 代理服务器注册
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/registry")
    public ResultDto<Integer> registry(HttpServletRequest request, @RequestBody BcmpSmAgent bcmpSmAgent) throws Exception {
        String agentIp = CusAccessObjectUtil.getIpAddress(request);
        bcmpSmAgent.setHostAddress(agentIp);
        int result = bcmpSmAgentService.create(bcmpSmAgent);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: registry
     * @方法描述: 代理服务器注册
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/status")
    public ResultDto<String> registry(@RequestParam("hostAddress") String hostAddress) throws Exception {
        return ResultDto.success(bcmpSmAgentService.queryAgentStatus(hostAddress));
    }

    /**
     * @方法名称: rebootAgentBatch
     * @方法描述: 批量重启
     * @参数与返回说明: ips 代理服务IP
     * @算法描述:
     */
    @PostMapping("/shutdown/{hostAddresses}")
    public ResultDto<Map<String, String>> shutdown(@PathVariable("hostAddresses") String hostAddresses) throws Exception {
        int n = 0;
        Map<String, String> result = new HashMap<>();
        if (hostAddresses != null && !"".equals(hostAddresses)) {
            String[] ipStr = hostAddresses.toString().split(",");
            int nodeletes = 0;
            String delete = "";
            for (int i = 0; i < ipStr.length; i++)
                if (!"".equals(ipStr[i])) {
                    String res = bcmpSmAgentService.agentShutdown(ipStr[i]);
                    result.put(ipStr[i], res);
                }
        }
        return ResultDto.success(result);
    }

    /**
     * @方法名称:show
     * @方法描述:代理服务表信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<BcmpSmAgent> show(@RequestParam("agentId") String agentId) throws Exception {
        return ResultDto.success(bcmpSmAgentService.show(agentId));
    }

    /**
     * @方法名称:index
     * @方法描述:代理服务表查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<BcmpSmAgent>> index(QueryModel model)
            throws Exception {
        PageInfo<BcmpSmAgent> pageInfo = bcmpSmAgentService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改代理服务表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody BcmpSmAgent bcmpSmAgent) throws Exception {
        int result = bcmpSmAgentService.update(bcmpSmAgent);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除代理服务表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{agentId}")
    public ResultDto<Integer> delete(@PathVariable("agentId") String agentId) throws Exception {
        int result = bcmpSmAgentService.delete(agentId);
        return ResultDto.success(result);
    }
}
