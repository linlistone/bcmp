package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.bcmp.VersionInfo;
import cn.com.yusys.icsp.domain.AgentRegistryInfo;
import cn.com.yusys.icsp.service.BcmpSmServerClusterService;
import cn.com.yusys.icsp.util.CusAccessObjectUtil;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

/**
 * @description: bcmp服务器集群信息接口API
 * @author: Mr_Jiang
 * @create: 2020-03-07 15:37
 */
@RestController
@RequestMapping("/api/cluster")
public class BcmpSmServerClusterResource {
    //初始化日志信息
    private Logger logger = LoggerFactory.getLogger(BcmpSmAgentListResource.class);
    //注入服务器集群信息Service
    @Autowired
    private BcmpSmServerClusterService bcmpSmServerClusterService;

    /**
     * @方法名称: create
     * @方法描述: 代理服务器注册
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/registry")
    public ResultDto<Integer> create(HttpServletRequest request, @RequestBody AgentRegistryInfo agentRegistryInfo) throws Exception {
        String agentIp = CusAccessObjectUtil.getIpAddress(request);
        agentRegistryInfo.setHostAddress(agentIp);
        int result = bcmpSmServerClusterService.registry(agentRegistryInfo);
        return ResultDto.success(result);
    }

    /*
     *  @Description : 服务器集群信息上传版本文件到服务器
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 15:51
     */
    @PostMapping({"/uploadfile"})
    public ResultDto<Integer> uploadFile(final MultipartFile file, final VersionInfo versionInfo) {
        logger.info("服务[{}],上传文件[{}]->版本号{}", new Object[]{versionInfo.getName(), file.getOriginalFilename(), versionInfo.getVersion()});
        return ResultDto.success(this.bcmpSmServerClusterService.uploadFile(file, versionInfo));
    }

    /*
     *  @Description : 获取服务器上版本文件的文件列表
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:02
     */
    @GetMapping({"/listVersion"})
    public ResultDto<List<String>> listVersion(String type, String nodeType) {
        List<String> list = bcmpSmServerClusterService.listVersion(type, nodeType);
        return ResultDto.success(list);
    }

    /*
     *  @Description : 向选中的服务器开始部署文件
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:08
     */
    @PostMapping({"/startDeploy"})
    public ResultDto<Integer> startDeploy(@RequestBody JSONObject deployBean) {
        int result = bcmpSmServerClusterService.startDeploy(deployBean);
        return ResultDto.success(result);
    }

    /*
     *  @Description : 启动选中服务器中的应用
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:13
     */
    @PostMapping("/startAppBatch")
    public ResultDto<Integer> startAppBatch(@RequestBody JSONObject request) throws Exception {
        bcmpSmServerClusterService.startAppBatch(request);
        return ResultDto.success(0);
    }

    /*
     *  @Description : 停止选中服务器中的应用
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:13
     */
    @PostMapping("/shutdownAppBatch")
    public ResultDto<Integer> shutdownAppBatch(@RequestBody JSONObject request) throws Exception {
        bcmpSmServerClusterService.shutdownAppBatch(request);
        return ResultDto.success(0);
    }

    /*
     *  @Description : 获取服务器集群某个节点的详细信息
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:47
     */
    @GetMapping(value = "/getNodeDetailInfo")
    public ResultDto<Map<String, Object>> getNodeDetailInfo(String hostip, String name) {
        Map<String, Object> response = bcmpSmServerClusterService.getNodeDetailInfo(hostip, name);
        return ResultDto.success(response);
    }

    /*
     *  @Description : 定时获取服务器列表的状态
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 17:30
     */
    @GetMapping(value = "/getNodesState")
    public ResultDto<String> getNodesState() throws Exception {
        bcmpSmServerClusterService.getNodesState();
        return ResultDto.success("请求成功");
    }

}
