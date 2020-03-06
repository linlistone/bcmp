package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.agent.AgentClient;
import cn.com.yusys.icsp.agent.common.exception.AgentException;
import cn.com.yusys.icsp.agent.constants.AgentConstants;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.VersionInfo;
import cn.com.yusys.icsp.bcmp.bean.DeployBean;
import cn.com.yusys.icsp.bcmp.shell.ShellScriptManager;
import cn.com.yusys.icsp.bean.HostAgentBean;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AgentRegistryInfo;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.service.BcmpSmAgentListService;
import cn.com.yusys.icsp.service.BcmpSmNodeinfoService;
import cn.com.yusys.icsp.service.BcmpWebSocketService;
import cn.com.yusys.icsp.service.NodeMonitorService;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;

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
    //注入Agent服务列表
    @Autowired
    private BcmpSmAgentListService bcmpSmAgentListService;
    @Autowired
    private BcmpSmNodeinfoService bcmpSmNodeinfoService;
    @Autowired
    private NodeMonitorService nodeMonitorService;
    //注入websocket消息服务
    @Autowired
    private BcmpWebSocketService bcmpWebSocketService;

    //agent 端口
    private String agentPort = "1099";

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
    public ResultDto<List<HostAgentBean>> index(QueryModel model) throws Exception {
        PageInfo<HostAgentBean> pageInfo = bcmpSmAgentListService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * 获取应用节点明细
     *
     * @param hostip
     * @param name
     * @return
     */
    @GetMapping(value = "/getNodeDetailInfo")
    public ResultDto<Map<String, Object>> getNodeDetailInfo(String hostip, String name) {
        Map<String, Object> data = nodeMonitorService.getNodeDetailInfo(hostip, name);
        return ResultDto.success(data);
    }

    /**
     * 上传版本文件
     *
     * @param file
     * @param versionInfo
     * @return
     */
    @PostMapping({"/uploadfile"})
    public ResultDto<Integer> uploadFile(final MultipartFile file, final VersionInfo versionInfo) {
        logger.info("服务[{}],上传文件[{}]->版本号{}", new Object[]{versionInfo.getName(), file.getOriginalFilename(), versionInfo.getVersion()});
        return ResultDto.success(this.bcmpSmAgentListService.uploadFile(file, versionInfo));
    }

    /**
     * 获取应用板本
     *
     * @param type
     * @param nodeType
     * @return
     */
    @GetMapping({"/listVersion"})
    public ResultDto<List<String>> listVersion(String type, String nodeType) {
        return ResultDto.success(bcmpSmAgentListService.getVersionList(type, nodeType));
    }

    /**
     * 查询服务器y应用节点状态
     *
     * @return
     */
    @GetMapping({"/nodeInfoStatus"})
    public ResultDto<Integer> nodeInfoStatus() {
        int ret = nodeMonitorService.queryNodeInfoStatus();
        return ResultDto.success(ret);
    }

    @PostMapping({"/startDeploy"})
    public ResultDto<Integer> startDeploy(@RequestBody JSONObject deployBean) {
        logger.info("startDeploy:{}", deployBean.toString());
        //部署节点信息
        JSONArray deployNodes = deployBean.getJSONArray("nodes");
        /**--------------------获取传入信息--------------------*/
        //获取连接的websocket客户端编号
        String webSocketClientCode = deployBean.getString("webSocketClientCode");
        //获取执行当前操作的用户编号
        String operatorUser = deployBean.getString("userId");
        //获取连接的websocket客户端编号
        String version = deployBean.getString("version");
        //获取是否需要重启
        String needRestart = deployBean.getString("needRestart");
        //遍历部署节点信息
        for (int i = 0; i < deployNodes.size(); i++) {
            //获取每个节点信息
            JSONObject deployNode = deployNodes.getJSONObject(i);
            //创建当前节点线程
            new Thread(() -> {
                String nodeMessageHeader = deployNode.getString("ip") + "_" + deployNode.getString("nodename") + "_" + deployNode.getString("nodetype") + ": ";
                try {
                    /*
                     *  步骤1: 开始上传文件
                     *  步骤2: 正在上传文件
                     *  步骤3: 文件上传结束,开始解压文件
                     *  步骤4: 正在解压文件
                     *  步骤5: 文件解压完成。[若不需要重启则操作结束,否则执行[步骤6]]
                     *  步骤6: 重启应用服务器
                     */
                    bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "正在准备环境...");
                    //创建Agent信息
                    AgentRegistryInfo agentRegistryInfo = bcmpSmAgentListService.getAgentHostMapInstance().get(deployNode.getString("ip"));
                    HostDescriptor hostDescriptor = new HostDescriptor(agentRegistryInfo);
                    AgentClient agentClient = new AgentClient(hostDescriptor);
                    bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "准备环境完成...");

                    //休眠3秒
                    bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "正在开始上传文件...");
                    File versionPackage = new File("deploy" + File.separator + deployNode.getString("nodetype") + File.separator + version);
                    agentClient.upload(versionPackage, version, deployNode.getString("applyPath") + "/workspace/versions/", false);
                    bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "文件上传成功...");


                    Thread.sleep(3000);
                    bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "开始解压文件...");
                    String remoteVersionPath = deployNode.getString("applyPath") + "/workspace/versions/";
                    String remoteVersionUnzipPath = deployNode.getString("applyPath") + "/workspace/";
                    String[] unzipProcessMessages = agentClient.goCmd("unzip -o " + remoteVersionPath + version + " -d " + remoteVersionUnzipPath).split("\n");
                    for (String unzipProcessMessage : unzipProcessMessages) {
                        bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + unzipProcessMessage);
                    }

                    bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "解压文件完成...");
                } catch (AgentException agentException) {
                    //String msg = "获取cpu使用率，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort()+ "]";
                    //logger.error(msg, agentException);
                    agentException.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                //return;
            }).start();
        }
        return ResultDto.success(0);
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

    /**
     * @方法名称: startAppBatch
     * @方法描述: 批量停止
     * @参数与返回说明: ips 代理服务IP
     * @算法描述:
     */
    @PostMapping("/startAppBatch")
    public ResultDto<Map<String, Integer>> startAppBatch(@RequestBody JSONObject request) throws Exception {
        Map<String, Integer> response = new LinkedHashMap<>();
        //获取选中节点主机信息
        JSONArray checkedNodeList = request.getJSONArray("checkedNodeList");
        //判断传入的参数是否为空
        if (checkedNodeList == null || checkedNodeList.isEmpty()) {
            return ResultDto.error("选中列表为空");
        }
        //遍历选中节点状态
        for (int i = 0, len = checkedNodeList.size(); i < len; i++) {
            //获取当前节点信息
            JSONObject nodeInfo = checkedNodeList.getJSONObject(i);
            //查询当前节点详细信息
            BcmpSmNodeinfo bcmpSmNodeinfo = bcmpSmNodeinfoService.showByHostMessage(nodeInfo.getString("ip"), nodeInfo.getString("nodename"));

            HostDescriptor hostDescriptor = new HostDescriptor(nodeInfo.getString("ip"), "", "", AgentConstants.DEFAULT_RMI_PORT);
            //初始化AgentClient
            AgentClient agentClient = new AgentClient(hostDescriptor);

            String localServerPath = agentClient.goCmd("pwd");

            String localLoginUser = agentClient.goCmd("whoami");

            String serverStat = agentClient.goCmd("sh checkServerStat.sh " + bcmpSmNodeinfo.getHttpPort()).replaceAll("\r|\n", "");

            System.out.println("查看当前服务器监听端口是否启动:" + serverStat + "         当前脚本位置:" + localServerPath + "        当前登录用户:" + localLoginUser);

            if ("close".equals(serverStat)) {

                String cmd = ShellScriptManager.getScript(hostDescriptor.getOsName(), "startup.sh", bcmpSmNodeinfo.getApplyPath());

                String ret = BcmpTools.goCmd(hostDescriptor, cmd);

                System.out.println("查看读取文本的结果 :" + cmd);

                //String execStartUpResult= agentClient.goCmd(Arrays.toString(commands));

                System.out.println("查看启动返回结果:" + ret);

                response.put(nodeInfo.getString("ip"), 1);
            } else {
                response.put(nodeInfo.getString("ip"), 0);
            }
        }
        return ResultDto.success(response);
    }

    ///**
    // *
    // * @方法名称: shutdownAppBatch
    // * @方法描述: 批量停止
    // * @参数与返回说明: ips 代理服务IP
    // * @算法描述:
    // */
    //@PostMapping("/shutdownAgentBatch")
    //public ResultDto<Map<String,Integer>> shutdownAppBatch(String ips) throws Exception {
    //    int n=0;
    //    Map<String,Integer> result=new HashMap<>();
    //    if(ips !=null&&!"".equals(ips)) {
    //        String[] idStr=ips.toString().split(",");
    //        int nodeletes=0;
    //        String delete="";
    //        for(int i=0;i<idStr.length;i++)
    //            if (!"".equals(idStr[i])) {
    //                int res = bcmpSmAgentListService.shutdownAgent(idStr[i]);
    //                result.put(idStr[i], res);
    //            }
    //    }
    //    return ResultDto.success(result);
    //}

}
