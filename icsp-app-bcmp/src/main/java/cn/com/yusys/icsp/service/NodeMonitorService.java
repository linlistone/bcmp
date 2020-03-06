package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.bcmp.node.PartitionState;
import cn.com.yusys.icsp.bean.HostAgentBean;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AgentRegistryInfo;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.repository.mapper.BcmpSmHostinfoMapper;
import cn.com.yusys.icsp.repository.mapper.BcmpSmNodeinfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 节点运行信息， 操作服务
 *
 * @author liaozhijie
 */
@Service
@Transactional
public class NodeMonitorService {

    private Logger logger = LoggerFactory.getLogger(NodeMonitorService.class);

    @Autowired
    private BcmpSmNodeinfoMapper bcmpSmNodeinfoMapper;

    @Autowired
    private BcmpSmHostinfoMapper bcmpSmHostinfoMapper;

    @Autowired
    private BcmpHostAgentService bcmpHostAgentService;

    @Autowired
    private BcmpSmAgentListService bcmpSmAgentListService;

    /**
     * 节点已启动
     */
    private String NodeStarted = "01";
    /**
     * 节点已关闭
     */
    private String NodeStoped = "02";
    /**
     * 节点不存在
     */
    private String NodeEmpty = "03";
    /**
     * 节点连接异常
     */
    private String NodeLinkError = "04";

    private int countNodeOfOneThread = 5;
    ///**
    // * 启动节点
    // *
    // * @param request
    // * @return
    // * @throws Exception
    // */
//	public Map<String,Object> nodeStart(JsonRequest request) throws Exception {
//		JsonResponse response = new JsonResponse();
//		JSONArray nodeList = (JSONArray) request.get("list");
//		String userId = request.getAsString("userId");
//		if (nodeList == null)
//			return response;
//		// {"list":"[{"hostip":"10.10.1.3","nodeName":"BIPS_A"},{"hostip":"10.10.1.4","nodeName":"BIPS_B"}]"}
//		// 关闭节点
//		for (int i = 0, len = nodeList.size(); i < len; i = i
//				+ countNodeOfOneThread) {
//			List<Map<String, String>> tmpList = new ArrayList<Map<String, String>>();
//			for (int j = 0; j < countNodeOfOneThread; j++) {
//				if (i + j >= len)
//					break;
//				@SuppressWarnings("unchecked")
//				Map<String, String> map = (Map<String, String>) nodeList.get(i
//						+ j);
//				tmpList.add(map);
//			}
//			TaskManager.getInstance().put(
//					new GetNodesStatusTask(userId, this, tmpList,
//							NodeOperType.Start));
//			TaskManager.getInstance().execute();
//		}
//		response.put(IResponseConstant.retCode, IResponseConstant.SUCCESS);
//		response.put(IResponseConstant.retMsg, "成功");
//		return response;
//	}

    ///**
    // * 关闭节点
    // *
    // * @param request
    // * @return
    // * @throws Exception
    // */
//	public JsonResponse nodeStop(JsonRequest request) throws Exception {
//		JsonResponse response = new JsonResponse();
//		JSONArray nodeList = (JSONArray) request.get("list");
//		String userId = request.getAsString("userId");
//		//
//		if (nodeList == null)
//			return response;
//		// {"list":"[{"hostip":"10.10.1.3","nodeName":"BIPS_A"},{"hostip":"10.10.1.4","nodeName":"BIPS_B"}]"}
//		// 关闭节点
//		for (int i = 0, len = nodeList.size(); i < len; i = i
//				+ countNodeOfOneThread) {
//			List<Map<String, String>> tmpList = new ArrayList<Map<String, String>>();
//			for (int j = 0; j < countNodeOfOneThread; j++) {
//				if (i + j >= len)
//					break;
//				@SuppressWarnings("unchecked")
//				Map<String, String> map = (Map<String, String>) nodeList.get(i
//						+ j);
//				tmpList.add(map);
//			}
//			TaskManager.getInstance().put(
//					new GetNodesStatusTask(userId, this, tmpList,
//							NodeOperType.Stop));
//			TaskManager.getInstance().execute();
//		}
//		response.put(IResponseConstant.retCode, IResponseConstant.SUCCESS);
//		response.put(IResponseConstant.retMsg, "成功");
//		return response;
//	}

    /*
     *  @Description : 获取节点信息
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 17:50
     */
    public Map<String, Object> getNodeDetailInfo(String hostIP, String nodeName) {
        Map<String, Object> response = new HashMap<>();
        try {
            //从数据库获取主机信息,并赋值给服务器信息中的主机信息Bean
            BcmpSmHostinfo bcmpSmHostinfo = getBcmpSmHostinfo(hostIP);
            //从数据库获取节点信息,并赋值给服务器信息中的节点信息Bean
            BcmpSmNodeinfo bcmpSmNodeinfo = getBcmpSmNodeinfo(hostIP,nodeName);
            //从Agent注册列表获取Agent信息,并赋值给服务器信息中的Agent注册信息Bean
            AgentRegistryInfo agentRegistryInfo = bcmpSmAgentListService.getAgentHostMapInstance().get(hostIP);
            //有参构造函数初始化服务器信息
            HostAgentBean hostAgentBean = new HostAgentBean(bcmpSmHostinfo,bcmpSmNodeinfo,agentRegistryInfo);
            /**---------------------------------通过Agent代理方式获取--------------------------------**/
            //获取CPU使用率
            response.put("CPUUSAGE", String.valueOf(bcmpHostAgentService.getCpuUsage(hostAgentBean)));
            //获取磁盘分区情况
            response.put("PartitionState", bcmpHostAgentService.getPartitionState(hostAgentBean));
            /**-------------------------------------------------------------------------------------**/

            /**----------------------------------通过JVM连接方式获取----------------------------------**/
            //初始化JVM环境
            bcmpHostAgentService.prepareJvm(bcmpSmNodeinfo.getHostIp(),bcmpSmNodeinfo.getJvmPort());
            //获取总内存大小
            response.put("TOTALMEMORY",String.valueOf(bcmpHostAgentService.getTotalMemorySize(hostAgentBean)));
            //获取系统运行时间
			response.put("RUNNINGTIME", String.valueOf(bcmpHostAgentService.getRunningTime(bcmpSmNodeinfo)));
			//获取峰值线程数
			response.put("PEEKTHREADCOUNT",String.valueOf(bcmpHostAgentService.getPeakThreadCount(bcmpSmNodeinfo)));
            //获取守护线程数
			response.put("DAEMONTHREADCOUNT",String.valueOf(bcmpHostAgentService.getDaemonThreadCount(bcmpSmNodeinfo)));
            //获取当前活动线程数
			response.put("THREADCOUNT", String.valueOf(bcmpHostAgentService.getThreadCount(bcmpSmNodeinfo)));
            //获取已经启动过的线程数
			response.put("STARTEDTHREDCOUNT",String.valueOf(bcmpHostAgentService.getTotalStartedThreadCount(bcmpSmNodeinfo)));
            //获取JVM输入参数
			String[] args = bcmpHostAgentService.getJvmInputArguments(bcmpSmNodeinfo);
			StringBuilder sb = new StringBuilder();
			for (int i = 0, len = args.length; i < len; i++) {
				sb.append(args[i]);
				sb.append("|");
			}
			response.put("JvmInputArguments", sb.toString());
            //获取当前加载的类数量
			response.put("LoadedClassCount",String.valueOf(bcmpHostAgentService.getLoadedClassCount(bcmpSmNodeinfo)));
            /**-------------------------------------------------------------------------------------**/






        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new ICSPException("节点状态获取异常", e);
        }finally {
            bcmpHostAgentService.releaseJvm();
        }
        return response;
    }

    /*
     *  @Description : 通过传入主机IP和节点名称获取主机信息
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 15:27
     */
    private BcmpSmNodeinfo getBcmpSmNodeinfo(String hostIp, String name) {
        QueryModel queryModel = new QueryModel();
        queryModel.addCondition("hostIp", hostIp);
        queryModel.addCondition("nodeName", name);
        List<BcmpSmNodeinfo> nodeList = bcmpSmNodeinfoMapper.selectByModel(queryModel);
        if (nodeList == null || nodeList.isEmpty()) {
            throw new ICSPException("节点不存在" + hostIp + name);
        }
        return nodeList.get(0);
    }
    /*
     *  @Description : 通过传入主机IP获取当前主机信息
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 15:31
     */
    private BcmpSmHostinfo getBcmpSmHostinfo(String hostIp) {
        QueryModel queryModel = new QueryModel();
        queryModel.addCondition("hostIp", hostIp);
        List<BcmpSmHostinfo> hostList = bcmpSmHostinfoMapper.selectByModel(queryModel);
        if (hostList == null || hostList.isEmpty()) {
            throw new ICSPException("主机["+hostIp+"]不存在!");
        }
        return hostList.get(0);
    }

    /**
     * 获取多个节点的启动状态
     *
     * @param request
     * @return
     * @throws Exception
     */
//	@SuppressWarnings("rawtypes")
//	public JsonResponse getNodeStatus(JsonRequest request) throws Exception {
//		JsonResponse response = new JsonResponse();
//		JSONArray nodeList = (JSONArray) request.get("list");
//		String userId = request.getAsString("userId");
//		if (nodeList == null)
//			return response;
//		// {"list":"[{"hostip":"10.10.1.3","nodeName":"BIPS_A"},{"hostip":"10.10.1.4","nodeName":"BIPS_B"}]"}
//		List<JSONObject> infoList = new ArrayList<JSONObject>();
//		// 获取对应的应用节点，关闭
//		for (int i = 0, len = nodeList.size(); i < len; i = i
//				+ countNodeOfOneThread) {
//			List<Map<String, String>> tmpList = new ArrayList<Map<String, String>>();
//			for (int j = 0; j < countNodeOfOneThread; j++) {
//				if (i + j >= len)
//					break;
//				@SuppressWarnings("unchecked")
//				Map<String, String> map = (Map<String, String>) nodeList.get(i
//						+ j);
//				tmpList.add(map);
//			}
//			TaskManager.getInstance().put(
//					new GetNodesStatusTask(userId, this, tmpList,
//							NodeOperType.Status));
//			TaskManager.getInstance().execute();
//		}
//		response.put(IResponseConstant.retCode, IResponseConstant.SUCCESS);
//		response.put(IResponseConstant.retMsg, "成功");
//		return response;
//	}

//	public JsonResponse getLogFiles(JsonRequest request) throws Exception {
//		JsonResponse response = new JsonResponse();
//		//获取目录名称
//		String name  = request.getAsString("name");
//		//获取目录操作类型
//		String type  = request.getAsString("type");
//		//获取当前传入的Url
//		String getUrl = request.getAsString("currentUrl");
//		//返回的参数的文件列表
//		List<Map<String,Object>> resultMaps = new ArrayList<Map<String,Object>>();
//		File rootFile = null;
//		String currentUrl = null;
//		ResourceManager resMg=ResourceManager.getInstance();
//		String installRoot=resMg.getInstallRoot()+"/log";
//		//判断若传入的路径为空,则默认路径为log的根目录
//		if(StringUtilEx.isNullOrEmpty(getUrl)){
//			//获取项目的绝对路径
//			rootFile = new File(installRoot);
//			currentUrl=installRoot;
//		}else{
//			LoggerUtil.error("type:::"+type   +"==============name "+ name);
//			//若类型为-1 则为返回上一级   所为0则表示进入下一个目录
//			if(!StringUtilEx.isNullOrEmpty(type) && "-1".equals(type)){
//				//进入目录之后,添加返回上一级的按钮
//				currentUrl = getUrl.substring(0,getUrl.lastIndexOf("/"));
//				//若返回之后的上一级目录和默认的目录相同,则不添加返回上一级按钮
//				if(!installRoot.equals(currentUrl)){
//					Map<String,Object> returnMap = new HashMap<String, Object>();
//					returnMap.put("name", "..");
//					returnMap.put("type", "-1");
//					resultMaps.add(returnMap);
//				}
//			}else if(!StringUtilEx.isNullOrEmpty(type) && "0".equals(type)){
//				//进入目录之后,添加返回上一级的按钮
//				Map<String,Object> returnMap = new HashMap<String, Object>();
//				returnMap.put("name", "..");
//				returnMap.put("type", "-1");
//				resultMaps.add(returnMap);
//				currentUrl = getUrl+"/"+name;
//			}
//			LoggerUtil.error("=currentUrl>>>"+currentUrl);
//			rootFile = new File(currentUrl);
//		}
////		LoggerUtil.error("======================>>>>");
//		File[] files =  rootFile.listFiles();
//		for (File file : files) {
//			Map<String,Object> resultMap = new HashMap<String, Object>();
//			//判断文件类型0位目录文件   1为普通文件
//			if(file.isDirectory()){
//				resultMap.put("name", file.getName());
//				resultMap.put("type", "0");
//				Date date = new Date(file.lastModified());
//				resultMap.put("updateDate", DateUtil.dataToString(date));
//			}else {
//				resultMap.put("name", file.getName());
//				resultMap.put("type", "1");
//				Date date = new Date(file.lastModified());
//				resultMap.put("updateDate", DateUtil.dataToString(date));
//			}
//			resultMaps.add(resultMap);
//		}
//
//		response.put(IResponseConstant.retCode, IResponseConstant.SUCCESS);
//		response.put("resultMaps", resultMaps);
//		response.put("currentUrl", currentUrl);
//		return response;
//	}


}