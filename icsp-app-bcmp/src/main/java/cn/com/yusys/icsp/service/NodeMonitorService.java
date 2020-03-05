package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.bcmp.node.Node;
import cn.com.yusys.icsp.bcmp.node.NodeInfo;
import cn.com.yusys.icsp.bcmp.node.PartitionState;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
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
    /**
     * 启动节点
     *
     * @param request
     * @return
     * @throws Exception
     */
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

    /**
     * 关闭节点
     *
     * @param request
     * @return
     * @throws Exception
     */
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

    /**
     * 获取单个节点详细信息
     *
     * @return
     */
    public Map<String, Object> getNodeDetailInfo(String hostip, String name) {
        Map<String, Object> response = new HashMap<>();
        try {
            BcmpSmNodeinfo bcmpSmNodeinfo = getNodeInfo(hostip, name);

            NodeInfo nodeInfo = new NodeInfo();
            nodeInfo.setHost(bcmpSmNodeinfo.getHostIp());
            nodeInfo.setPort(Integer.parseInt(bcmpSmNodeinfo.getApplyPort()));
            nodeInfo.setJvmPort(Integer.parseInt(bcmpSmNodeinfo.getJvmPort()));
            nodeInfo.setAppHttpPort(Integer.parseInt(bcmpSmNodeinfo.getHttpPort()));
            nodeInfo.setAppDir(bcmpSmNodeinfo.getApplyPath());

            Node node = new Node(nodeInfo);
            response.put("CPUUSAGE", String.valueOf(node.getCpuUsage()));
            response.put("TOTALMEMORY",
                    String.valueOf(node.getTotalMemorySize()));
//			response.put("RUNNINGTIME", String.valueOf(node.getRunningTime()));
//			response.put("PEEKTHREADCOUNT",
//					String.valueOf(node.getPeakThreadCount()));
//			response.put("DAEMONTHREADCOUNT",
//					String.valueOf(node.getDaemonThreadCount()));
//			response.put("THREADCOUNT", String.valueOf(node.getThreadCount()));
//			response.put("STARTEDTHREDCOUNT",
//					String.valueOf(node.getTotalStartedThreadCount()));
//			String[] args = node.getJvmInputArguments();
//			StringBuilder sb = new StringBuilder();
//			for (int i = 0, len = args.length; i < len; i++) {
//				sb.append(args[i]);
//				sb.append("|");
//			}
//			response.put("JvmInputArguments", sb.toString());
//			response.put("LoadedClassCount",
//					String.valueOf(node.getLoadedClassCount()));
//			PartitionState[] partitionState = node.getPartitionState();
//			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
//			for (int i = 0, len = partitionState.length; i < len; i++) {
//				list.add(partitionState[i].toMap());
//			}
//			response.put("PartitionState", list);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new ICSPException("节点状态获取异常", e);
        }
        return response;
    }


    public BcmpSmNodeinfo getNodeInfo(String hostIp, String name) {
        QueryModel queryModel = new QueryModel();
        queryModel.addCondition("hostIp", hostIp);
        queryModel.addCondition("nodeName", name);
        List<BcmpSmNodeinfo> nodeList = bcmpSmNodeinfoMapper.selectByModel(queryModel);
        if (nodeList == null || nodeList.isEmpty()) {
            throw new ICSPException("节点不存在" + hostIp + name);
        }
        return nodeList.get(0);
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