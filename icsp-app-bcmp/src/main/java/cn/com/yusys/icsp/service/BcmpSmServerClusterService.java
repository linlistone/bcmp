package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.agent.AgentClient;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.constant.DBOperateType;
import cn.com.yusys.icsp.bcmp.constant.DeployStep;
import cn.com.yusys.icsp.bcmp.constant.OS;
import cn.com.yusys.icsp.bcmp.constant.WebSocketProtocol;
import cn.com.yusys.icsp.bcmp.shell.ShellScriptManager;
import cn.com.yusys.icsp.bean.HostAgentBean;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import cn.com.yusys.icsp.domain.BcmpSmAgent;
import cn.com.yusys.icsp.domain.BcmpSmDeploy;
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
    //注入版本部署明细服务
    @Autowired
    private BcmpSmDeployService bcmpSmDeployService;
    //代理服务器信息
    @Autowired
    private BcmpSmAgentService bcmpSmAgentService;


    /*
     *  @Description : 获取服务器上版本文件的文件列表
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 16:05
     */
    public List<String> listVersion(String type, String nodeType) {
        File outFile = new File(type.toLowerCase() + OS.LINUXSEPARATOR.getName() + nodeType.toLowerCase());
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
            BcmpSmAgent bcmpSmAgent = bcmpSmAgentService.getBcmpSmAgent(hostIp);
            //有参构造函数初始化服务器信息
            HostAgentBean hostAgentBean = new HostAgentBean(bcmpSmHostinfo, bcmpSmNodeinfo, bcmpSmAgent);
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
    public int startDeploy(JSONObject deployBean) throws Exception {
        logger.info("准备部署的服务器列表及其文件:{}", deployBean.toString());
        //部署节点信息
        JSONArray deployNodes = deployBean.getJSONArray("nodes");
        //应用节点信息
        JSONObject appMod = deployBean.getJSONObject("appmod");
        //获取版本信息
        JSONObject version = deployBean.getJSONObject("version");
        /**--------------------获取传入信息--------------------*/
        //获取执行当前操作的用户编号
        String operatorUser = deployBean.getString("userId");
        //获取是否需要重启
        String needRestart = deployBean.getString("needRestart");
        //遍历部署节点信息
        for (int i = 0; i < deployNodes.size(); i++) {
            //获取每个节点信息
            JSONObject deployNode = deployNodes.getJSONObject(i);
            //创建当前节点线程
            this.deploy(deployNode, appMod , version, needRestart, operatorUser);
        }
        return 0;
    }

    /*
     *  @Description : 文件部署
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/9 15:23
     */
    @Async
    public void deploy(JSONObject deployNode, JSONObject appMod, JSONObject versionInfo, String needRestart, String operatorUser) throws Exception {
        String nodeMessageHeader = deployNode.getString("hostIp") + "_" + deployNode.getString("nodeName") + "_" + deployNode.getString("nodeType") + "_"+appMod.getString("appModName")+": ";
        String deployUUId = createUUId();
        BcmpSmDeploy bcmpSmDeploy = new BcmpSmDeploy(deployUUId, versionInfo.getString("versionId"), deployNode.getString("nodeId"),appMod.getString("appModId") , operatorUser, DateUtil.getFormatDateTime());
        try {
            /*
             *  步骤1: 正在准备环境
             *  步骤2: 准备环境完成
             *  步骤3: 开始上传文件
             *  步骤4: 文件上传成功
             *  步骤5: 开始解压文件
             *  步骤6: 解压文件完成[若不需要重启则执行[步骤9],否则执行[步骤7]]
             *  步骤7: 开始重启服务
             *  步骤8: 重启服务完成
             *  步骤9: 开始写入版本
             *  步骤10: 版本写入完成
             *  步骤11: 文件部署结束
             */
            //步骤1: 正在准备环境
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.INSERT, nodeMessageHeader, DeployStep.正在准备环境, null, null);
            //创建Agent信息
            BcmpSmAgent bcmpSmAgent = bcmpSmAgentService.getBcmpSmAgent(deployNode.getString("ip"));
            HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmAgent);
            AgentClient agentClient = new AgentClient(hostDescriptor);
            //步骤2: 准备环境完成
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.准备环境完成, null, null);
            //步骤3: 开始上传文件
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.开始上传文件, null, null);
            File versionPackage = new File(versionInfo.getString("versionPath"));
            agentClient.upload(versionPackage, versionPackage.getName(), deployNode.getString("applyPath") + OS.LINUXSEPARATOR.getName() +"workspace"+OS.LINUXSEPARATOR.getName()+"versions", false);
            //步骤4: 文件上传成功
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.文件上传成功, null, null);
            //步骤5: 开始解压文件
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.开始解压文件, null, null);
            String remoteVersionPath = deployNode.getString("applyPath") + OS.LINUXSEPARATOR.getName()+"workspace"+OS.LINUXSEPARATOR.getName()+"versions";
            String remoteVersionUnzipPath ;
            if("M".equalsIgnoreCase(appMod.getString("appModType"))){
                remoteVersionUnzipPath = deployNode.getString("updateDirectory");
            }else if ("C".equalsIgnoreCase(appMod.getString("appModType"))){
                remoteVersionUnzipPath = deployNode.getString("updateDirectory")+OS.LINUXSEPARATOR.getName()+appMod.getString("appModDeployPath");
            }else{
                remoteVersionUnzipPath = deployNode.getString("updateDirPath");
            }
            String[] unzipProcessMessages = agentClient.goCmd("unzip -o " + remoteVersionPath + OS.LINUXSEPARATOR.getName() + versionPackage.getName() + " -d " + remoteVersionUnzipPath).split("\n");
            for (String unzipProcessMessage : unzipProcessMessages) {
                logger.info(nodeMessageHeader + unzipProcessMessage);
            }
            //步骤6: 解压文件完成
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.解压文件完成, null, null);
            //判断是否需要重启服务
            if ("true".equalsIgnoreCase(needRestart)) {
                //步骤7: 开始重启服务
                updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.开始重启服务, null, null);
                //判断当前节点状态
                while ((checkServerState(bcmpSmAgent, deployNode.getString("hostIp"), deployNode.getString("httpPort")) ? "true" : "false").equals("true")) {
                    startUpOrshutdown("shutdown", deployNode.getString("nodeId"));
                    //休眠1秒
                    Thread.sleep(2000);
                }
                startUpOrshutdown("startup", deployNode.getString("nodeId"));
                //步骤8: 重启服务完成
                updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.重启服务完成, null, null);
            }
            //步骤9: 开始写入版本
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.开始写入版本, null, null);
            //步骤10: 版本写入完成
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.版本写入完成, null, null);
            //步骤11: 文件部署结束
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UPDATE, nodeMessageHeader, DeployStep.文件部署结束, null, null);
        } catch (Exception e) {
            e.printStackTrace();
            updateDeployStepStatus(bcmpSmDeploy, DBOperateType.UNKNOWN, null, null,  e.getMessage(), e);
        }
    }

    /*
     *  @Description : 更新部署节点状态
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/9 14:18
     */
    private void updateDeployStepStatus(BcmpSmDeploy bcmpSmDeploy, DBOperateType type, String header, DeployStep deployStep, String remark, Exception exception) throws Exception {

        //判断当前是否为异常状态,若为异常,则不更新节点步骤及步骤状态
        if (!type.equals(DBOperateType.UNKNOWN)) {
            bcmpSmDeploy.setDeployStep(deployStep.getStep());
            bcmpSmDeploy.setDeployStepStatus(deployStep.toString());
            if (DeployStep.文件部署结束.getStep().equals(deployStep.getStep())){
                bcmpSmDeploy.setDeployResult("文件部署到服务器成功!");
            }
            logger.info(header + deployStep);
        } else {
            bcmpSmDeploy.setDeployResult("文件部署到服务器异常并中止!");
            bcmpSmDeploy.setDeployRemark(remark);
            logger.error(remark, exception);
        }
        //判断当前状态是否为新增,若为新增,则执行插入操作,否则执行更新操作
        if (type.equals(DBOperateType.INSERT)) {
            bcmpSmDeployService.create(bcmpSmDeploy);
        } else {
            bcmpSmDeployService.updateStep(bcmpSmDeploy);
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
        for (int i = 0; i < checkedNodeList.size(); i++) {
            startUpOrshutdown("shutdown", checkedNodeList.getJSONObject(i).getString("nodeId"));
        }
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
        for (int i = 0; i < checkedNodeList.size(); i++) {
            startUpOrshutdown("shutdown", checkedNodeList.getJSONObject(i).getString("nodeId"));
        }

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
                BcmpSmAgent bcmpSmAgent = bcmpSmAgentService.getBcmpSmAgent(bcmpSmNodeinfo.getHostIp());
                response = JSON.parseObject(JSON.toJSONString(bcmpSmNodeinfo));
                //代理不存在
                if (bcmpSmAgent != null) {
                    //初始化hostDescriptor
                    String checkServerState = checkServerState(bcmpSmAgent, bcmpSmNodeinfo.getHostIp(), bcmpSmNodeinfo.getHttpPort()) ? "true" : "false";
                    response.put("wsType", WebSocketProtocol.nodestatus.toString());
                    response.put("wsData", checkServerState);
                } else {
                    response.put("wsType", WebSocketProtocol.nodestatus.toString());
                    response.put("wsData", "UNKNOWN");
                }
                //通过websocket发送信息
                bcmpWebSocketService.GroupSending(response.toJSONString());
            }
        } catch (Exception e) {
            logger.error("获取服务器是否启动状态失败!", e);
        }
    }

    /*
     *  @Description : 异步获取服务器应用版本
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/9 16:39
     */
    @Async
    public void getServiceVersion() throws Exception {
        //初始化返回信息
        JSONObject response = new JSONObject();
        try {
            //从数据库中获取所有服务器列表
            List<BcmpSmNodeinfo> bcmpSmNodeinfos = bcmpSmNodeinfoService.selectAll(new QueryModel());
            //遍历节点信息并获取服务器是否启动的状态
            for (int i = 0; i < bcmpSmNodeinfos.size(); i++) {

                //获取节点详细信息
                BcmpSmNodeinfo bcmpSmNodeinfo = bcmpSmNodeinfos.get(i);
                //获取当前服务器agent注册信息
                BcmpSmAgent bcmpSmAgent = bcmpSmAgentService.getBcmpSmAgent(bcmpSmNodeinfo.getHostIp());
                response = JSON.parseObject(JSON.toJSONString(bcmpSmNodeinfo));
                //代理不存在
                if (bcmpSmAgent != null) {
                    //初始化hostDescriptor
                    String appVersion = getServerAppVersion(bcmpSmAgent, bcmpSmNodeinfo.getHostIp(), bcmpSmNodeinfo.getApplyPath() + "/workspace/" + bcmpSmNodeinfo.getNodeName());
                    response.put("wsType", WebSocketProtocol.servicevsesion.toString());
                    response.put("wsData", appVersion);
                } else {
                    response.put("wsType", WebSocketProtocol.servicevsesion.toString());
                    response.put("wsData", "UNKNOWN");
                }
            }
        } catch (Exception e) {
            response.put("wsType", WebSocketProtocol.servicevsesion.toString());
            response.put("wsData", "UNKNOWN");
            logger.error("获取服务器应用节点版本号失败!", e);
        } finally {
            //通过websocket发送信息
            bcmpWebSocketService.GroupSending(response.toJSONString());
        }
    }

    /**
     * 启动或停止应用节点服务
     *
     * @param type
     * @param nodeId
     * @return
     * @throws Exception
     */
    private void startUpOrshutdown(String type, String nodeId) throws Exception {
        //查询当前节点详细信息
        BcmpSmNodeinfo bcmpSmNodeinfo = bcmpSmNodeinfoService.show(nodeId);
        //从agent注册列表中获取服务器agent注册信息
        BcmpSmAgent bcmpSmAgent = bcmpSmAgentService.getBcmpSmAgent(bcmpSmNodeinfo.getHostIp());
        boolean isStarted = checkServerState(bcmpSmAgent, bcmpSmNodeinfo.getHostIp(), bcmpSmNodeinfo.getHttpPort());
        //输出当前服务器是否启动
        logger.info("服务器[{}-->{}]", new Object[]{bcmpSmNodeinfo.getHostIp(), isStarted});
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
            HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmAgent);
            //读取当前启动脚本
            String startupCmd = ShellScriptManager.getScript(hostDescriptor.getOsName(), scriptName, bcmpSmNodeinfo.getApplyPath());
            logger.info("记录服务器[{}]脚本信息:[{}-->{}]", new Object[]{scriptName, bcmpSmNodeinfo.getHostIp(), startupCmd});
            //执行脚本并获取返回结果
            String execScriptResult = BcmpTools.goCmd(hostDescriptor, startupCmd);
            logger.info("记录服务器[{}]脚本执行结果:{}", new Object[]{scriptName, execScriptResult});
        } else {
            logger.info("当前服务器状态与启动脚本状态一至！");
        }
    }

    /**
     * 校验应用节点启动状态
     *
     * @param bcmpSmAgent 代理对象
     * @param hostIp      节点主机地址
     * @param httpPort    节点http端口号
     * @return
     * @throws Exception
     */
    private boolean checkServerState(BcmpSmAgent bcmpSmAgent, String hostIp, String httpPort) throws Exception {
        HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmAgent);
        //获取查询当前服务器状态脚本
        String checkStateCmd = ShellScriptManager.getScript(hostDescriptor.getOsName(), "checkServerState.sh", httpPort);
        logger.info("记录获取服务器是否启动状态脚本信息:[{}-->{}]", new Object[]{hostIp, checkStateCmd});
        String execScriptResult = BcmpTools.goCmd(hostDescriptor, checkStateCmd).replaceAll("\r|\n", "");
        logger.info("记录获取服务器是否启动状态脚本执行结果:{}", new Object[]{execScriptResult});
        return this.containsKey(execScriptResult, "open");
    }

    /*
     *  @Description : 获取服务器应用版本号
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/9 16:54
     */
    private String getServerAppVersion(BcmpSmAgent bcmpSmAgent, String hostIp, String versionPath) throws Exception {
        //初始化HostDescriptor
        HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmAgent);
        //初始化AgentClient
        AgentClient agentClient = new AgentClient(hostDescriptor);
        //返回执行结果
        String execScriptResult = agentClient.goCmd("cat " + versionPath + "/version.ini").replaceAll("\r|\n", "");
        logger.info("记录获取服务器应用节点版本号脚本执行结果:{}", new Object[]{execScriptResult});
        return execScriptResult;
    }
}
