package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.agent.AgentClient;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.shell.ShellScriptManager;
import cn.com.yusys.icsp.bean.HostAgentBean;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmAgent;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.*;

/**
 * @description: bcmp服务器集群信息Service
 * @author: Mr_Jiang
 * @create: 2020-03-07 15:37
 */
@Service
@Transactional
public class BcmpSmServerClusterService extends BaseService {
    //初始化日志信息
    private Logger logger = LoggerFactory.getLogger(BcmpSmServerClusterService.class);
    //注入websocket消息服务
    @Autowired
    private BcmpWebSocketService bcmpWebSocketService;
    //注入主机信息服务
    @Autowired
    private BcmpSmHostinfoService bcmpSmHostinfoService;
    //注入节点信息服务
    @Autowired
    private BcmpSmNodeinfoService bcmpSmNodeinfoService;
    //注入服务器节点机器信息服务
    @Autowired
    private BcmpSmNodeMonitorService bcmpSmNodeMonitorService;
    //代理服务器信息
    @Autowired
    private BcmpSmAgentService bcmpSmAgentService;


    /*
     *  @Description : 获取服务器上版本文件的文件列表
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:05
     */
    public List<String> listVersion(String type, String nodeType) {
        File outFile = new File(type.toLowerCase() + File.separator + nodeType.toLowerCase());
        logger.info("listVersion:{}", outFile.getAbsolutePath());
        File files[] = outFile.listFiles();
        List<String> list = new ArrayList<>();
        if (files == null) {
            return list;
        }
        for (File file2 : files) {
            list.add(file2.getName());
        }
        // 排序
        Collections.sort(list, new Comparator<String>() {
            public int compare(String o1, String o2) {
                return o2.compareToIgnoreCase(o1);
            }
        });
        return list;
    }

    /*
     *  @Description : 获取节点信息
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 17:50
     */
    public Map<String, Object> getNodeDetailInfo(String hostIp, String nodeName) {
        Map<String, Object> response = new HashMap<>();
        try {
            //从数据库获取主机信息,并赋值给服务器信息中的主机信息Bean
            BcmpSmHostinfo bcmpSmHostinfo = bcmpSmHostinfoService.showByHostIp(hostIp);
            //从数据库获取节点信息,并赋值给服务器信息中的节点信息Bean
            BcmpSmNodeinfo bcmpSmNodeinfo = bcmpSmNodeinfoService.showByHostMessage(hostIp, nodeName);
            //从Agent注册列表获取Agent信息,并赋值给服务器信息中的Agent注册信息Bean
            BcmpSmAgent agentRegistryInfo = bcmpSmAgentService.getBcmpSmAgent(hostIp);
            //有参构造函数初始化服务器信息
            HostAgentBean hostAgentBean = new HostAgentBean(bcmpSmHostinfo, bcmpSmNodeinfo, agentRegistryInfo);
            /**---------------------------------通过Agent代理方式获取--------------------------------**/
            //获取CPU使用率
            response.put("CPUUSAGE", String.valueOf(bcmpSmNodeMonitorService.getCpuUsage(hostAgentBean)));
            //获取磁盘分区情况
            response.put("PartitionState", bcmpSmNodeMonitorService.getPartitionState(hostAgentBean));
            /**-------------------------------------------------------------------------------------**/

            /**----------------------------------通过JVM连接方式获取----------------------------------**/
            //初始化JVM环境
            bcmpSmNodeMonitorService.prepareJvm(bcmpSmNodeinfo.getHostIp(), bcmpSmNodeinfo.getJvmPort());
            //获取总内存大小
            response.put("TOTALMEMORY", String.valueOf(bcmpSmNodeMonitorService.getTotalMemorySize(hostAgentBean)));
            //获取系统运行时间
            response.put("RUNNINGTIME", String.valueOf(bcmpSmNodeMonitorService.getRunningTime(bcmpSmNodeinfo)));
            //获取峰值线程数
            response.put("PEEKTHREADCOUNT", String.valueOf(bcmpSmNodeMonitorService.getPeakThreadCount(bcmpSmNodeinfo)));
            //获取守护线程数
            response.put("DAEMONTHREADCOUNT", String.valueOf(bcmpSmNodeMonitorService.getDaemonThreadCount(bcmpSmNodeinfo)));
            //获取当前活动线程数
            response.put("THREADCOUNT", String.valueOf(bcmpSmNodeMonitorService.getThreadCount(bcmpSmNodeinfo)));
            //获取已经启动过的线程数
            response.put("STARTEDTHREDCOUNT", String.valueOf(bcmpSmNodeMonitorService.getTotalStartedThreadCount(bcmpSmNodeinfo)));
            //获取JVM输入参数
            String[] args = bcmpSmNodeMonitorService.getJvmInputArguments(bcmpSmNodeinfo);
            StringBuilder sb = new StringBuilder();
            for (int i = 0, len = args.length; i < len; i++) {
                sb.append(args[i]);
                sb.append("|");
            }
            response.put("JvmInputArguments", sb.toString());
            //获取当前加载的类数量
            response.put("LoadedClassCount", String.valueOf(bcmpSmNodeMonitorService.getLoadedClassCount(bcmpSmNodeinfo)));
            /**-------------------------------------------------------------------------------------**/

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new ICSPException("节点状态获取异常", e);
        } finally {
            bcmpSmNodeMonitorService.releaseJvm();
        }
        return response;
    }

    /*
     *  @Description :
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:07
     */
    public int startDeploy(JSONObject deployBean) {
        logger.info("准备部署的服务器列表及其文件:{}", deployBean.toString());
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
            this.deploy(webSocketClientCode, deployNode, version);
        }
        return 0;
    }

    @Async
    public void deploy(String webSocketClientCode, JSONObject deployNode, String version) {
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
            BcmpSmAgent agentRegistryInfo = bcmpSmAgentService.getBcmpSmAgent(deployNode.getString("ip"));
            HostDescriptor hostDescriptor = new HostDescriptor(agentRegistryInfo);
            AgentClient agentClient = new AgentClient(hostDescriptor);
            bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "准备环境完成...");
            //休眠3秒
            bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "正在开始上传文件...");
            File versionPackage = new File("deploy" + File.separator + deployNode.getString("nodetype") + File.separator + version);
            agentClient.upload(versionPackage, version, deployNode.getString("applyPath") + "/workspace/versions/", false);
            bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "文件上传成功...");

            bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "开始解压文件...");
            String remoteVersionPath = deployNode.getString("applyPath") + "/workspace/versions/";
            String remoteVersionUnzipPath = deployNode.getString("applyPath") + "/workspace/";
            String[] unzipProcessMessages = agentClient.goCmd("unzip -o " + remoteVersionPath + version + " -d " + remoteVersionUnzipPath).split("\n");
            for (String unzipProcessMessage : unzipProcessMessages) {
                bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + unzipProcessMessage);
            }
            bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "解压文件完成...");
        } catch (Exception e) {
            e.printStackTrace();
            bcmpWebSocketService.AppointSending(webSocketClientCode, nodeMessageHeader + "解压文件完成...");
            logger.error("部署服务器异常中止", e);
        }
    }

    /*
     *  @Description : 启动选中服务器中的应用 异步执行
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:33
     */
    @Async
    public void startAppBatch(JSONObject request) throws Exception {
        //获取选中节点主机信息
        JSONArray checkedNodeList = request.getJSONArray("checkedNodeList");
        //判断传入的参数是否为空
        if (checkedNodeList == null || checkedNodeList.isEmpty()) {
            throw new ICSPException("选中的待启动服务器列表为空!", 900);
        }
        startUpOrshutdown("startup", checkedNodeList);
    }

    /*
     *  @Description : 停止选中服务器中的应用 异步执行
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:39
     */
    @Async
    public void shutdownAppBatch(JSONObject request) throws Exception {
        //获取选中节点主机信息
        JSONArray checkedNodeList = request.getJSONArray("checkedNodeList");
        //判断传入的参数是否为空
        if (checkedNodeList == null || checkedNodeList.isEmpty()) {
            throw new ICSPException("选中的待停止服务器列表为空!", 900);
        }
        startUpOrshutdown("shutdown", checkedNodeList);
    }

    /*
     *  @Description : 定时获取服务器列表的状态
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 17:27
     */
    @Async
    public void getNodesState() throws Exception {
        try {
            //从数据库中获取所有服务器列表
            List<BcmpSmNodeinfo> bcmpSmNodeinfos = bcmpSmNodeinfoService.selectAll(new QueryModel());
            //遍历节点信息并获取服务器是否启动的状态
            for (int i = 0; i < bcmpSmNodeinfos.size(); i++) {
                //初始化返回信息
                JSONObject response = new JSONObject();
                //获取节点详细信息
                BcmpSmNodeinfo bcmpSmNodeinfo = bcmpSmNodeinfos.get(i);
                //获取当前服务器agent注册信息
                BcmpSmAgent agentRegistryInfo = bcmpSmAgentService.getBcmpSmAgent(bcmpSmNodeinfo.getHostIp());
                response = JSON.parseObject(JSON.toJSONString(bcmpSmNodeinfo));
                //代理不存在
                if (agentRegistryInfo != null) {
                    //初始化hostDescriptor
                    String checkServerState = checkServerState(agentRegistryInfo, bcmpSmNodeinfo) ? "true" : "false";
                    response.put("wsType", "nodestatus");
                    response.put("wsData", checkServerState);
                } else {
                    response.put("wsType", "nodestatus");
                    response.put("wsData", "UNKNOW");
                }
                //通过websocket发送信息
                bcmpWebSocketService.GroupSending(response.toJSONString());
            }
        } catch (Exception e) {
            logger.error("获取服务器是否启动状态失败!", e);
        }
    }

    /**
     * 启动或停止应用节点服务
     *
     * @param type
     * @param checkedNodeList
     * @return
     * @throws Exception
     */
    private void startUpOrshutdown(String type, JSONArray checkedNodeList) throws Exception {
        //遍历选中节点状态
        for (int i = 0, len = checkedNodeList.size(); i < len; i++) {
            //获取当前节点信息
            JSONObject nodeInfo = checkedNodeList.getJSONObject(i);
            //查询当前节点详细信息
            BcmpSmNodeinfo bcmpSmNodeinfo = bcmpSmNodeinfoService.show(nodeInfo.getString("nodeId"));
            //从agent注册列表中获取服务器agent注册信息
            BcmpSmAgent agentRegistryInfo = bcmpSmAgentService.getBcmpSmAgent(nodeInfo.getString("ip"));
            boolean isStarted = checkServerState(agentRegistryInfo, bcmpSmNodeinfo);
            //输出当前服务器是否启动
            logger.info("服务器[{}-->{}]", new Object[]{nodeInfo.getString("ip"), isStarted});
            String scriptName = null;
            if ("startup".equals(type)) {
                scriptName = !isStarted ? "startup.sh" : null;
            } else if ("shutdown".equals(type)) {
                scriptName = isStarted ? "shutdown.sh" : null;
            }
            logger.info("需要执行脚本名为[{}]", scriptName);
            //判断当前服务器是否启动
            if (scriptName != null) {
                //初始化HostDescriptor
                HostDescriptor hostDescriptor = new HostDescriptor(agentRegistryInfo);
                //读取当前启动脚本
                String startupCmd = ShellScriptManager.getScript(hostDescriptor.getOsName(), scriptName, bcmpSmNodeinfo.getApplyPath());
                logger.info("记录服务器[{}]脚本信息:[{}-->{}]", new Object[]{scriptName, nodeInfo.getString("ip"), startupCmd});
                //执行脚本并获取返回结果
                String execScriptResult = BcmpTools.goCmd(hostDescriptor, startupCmd);
                logger.info("记录服务器[{}]脚本执行结果:{}", new Object[]{scriptName, execScriptResult});
            } else {
                logger.info("当前服务器状态与启动脚本状态一至！");
            }
        }
    }

    /**
     * 校验应用节点启动状态
     *
     * @param agentRegistryInfo 代理对象
     * @param bcmpSmNodeinfo    节点对象
     * @return
     * @throws Exception
     */
    private boolean checkServerState(BcmpSmAgent agentRegistryInfo, BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        HostDescriptor hostDescriptor = new HostDescriptor(agentRegistryInfo);
        //获取查询当前服务器状态脚本
        String checkStateCmd = ShellScriptManager.getScript(hostDescriptor.getOsName(), "checkServerState.sh", bcmpSmNodeinfo.getHttpPort());
        logger.info("记录获取服务器是否启动状态脚本信息:[{}-->{}]", new Object[]{bcmpSmNodeinfo.getHostIp(), checkStateCmd});
        String execScriptResult = BcmpTools.goCmd(hostDescriptor, checkStateCmd).replaceAll("\r|\n", "");
        logger.info("记录获取服务器是否启动状态脚本执行结果:{}", new Object[]{execScriptResult});
        return this.containsKey(execScriptResult, "open");
    }


}
