package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.service.BcmpSmServerClusterService;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @description: bcmp服务器集群信息接口API
 * @author: Mr_Jiang
 * @create: 2020-03-07 15:37
 */
@RestController
@RequestMapping("/api/cluster")
@EnableAsync
public class BcmpSmServerClusterResource {
    //初始化日志信息
    private Logger logger = LoggerFactory.getLogger(BcmpSmServerClusterResource.class);
    //注入服务器集群信息Service
    @Autowired
    private BcmpSmServerClusterService bcmpSmServerClusterService;

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
    public ResultDto<Integer> startDeploy(@RequestBody JSONObject deployBean) throws Exception {
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

    /*
     *  @Description : 获取服务器应用版本号
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/9 16:24
     */
    @GetMapping(value = "/getServiceVersion")
    public ResultDto<String> getServiceVersion() throws Exception {
        bcmpSmServerClusterService.getServiceVersion();
        return ResultDto.success("请求成功");
    }

}
