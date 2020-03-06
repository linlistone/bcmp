package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.agent.AgentClient;
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

    @Autowired
    private BcmpSmAgentListService bcmpSmAgentListService;
    @Autowired
    private BcmpSmNodeinfoService bcmpSmNodeinfoService;
    @Autowired
    private NodeMonitorService nodeMonitorService;


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

    @GetMapping(value = "/getNodeDetailInfo")
    public ResultDto<Map<String,Object>> getNodeDetailInfo(String hostip,String name ) {
        Map<String,Object> data=  nodeMonitorService.getNodeDetailInfo(hostip,name);
        return ResultDto.success(data);
    }

    @PostMapping({"/uploadfile"})
    public ResultDto<Integer> uploadFile(final MultipartFile file, final VersionInfo versionInfo) {
        logger.info("服务[{}],上传文件[{}]->版本号{}", new Object[]{versionInfo.getName(), file.getOriginalFilename(), versionInfo.getVersion()});
        return ResultDto.success(this.bcmpSmAgentListService.uploadFile(file, versionInfo));
    }

    @GetMapping({"/listVersion"})
    public ResultDto<List<String>> listVersion(String type, String nodeType) {
        File outFile = new File(type.toLowerCase() + File.separator + nodeType.toLowerCase());
        logger.info("listVersion:{}", outFile.getAbsolutePath());
        File files[] = outFile.listFiles();
        List<String> list = new ArrayList<>();
        if (files == null) {
            return ResultDto.success(list);
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
        return ResultDto.success(list);
    }

    @PostMapping({"/startDeploy"})
    public ResultDto<Integer> startDeploy(@RequestBody DeployBean deployBean) {
        logger.info("startDeploy:{}", deployBean.toString());
        String[] hostip = null;
        String[] nodeName = null;
        String[] arrId = deployBean.getIds().split(",");
        hostip = new String[arrId.length];
        nodeName = new String[arrId.length];
        for (int i = 0; i < nodeName.length; i++) {
            String id = arrId[i].replaceFirst("_", ",");
            hostip[i] = id.split(",")[0];
            nodeName[i] = id.split(",")[1];
        }
        boolean needre = "true".equals(deployBean.getNeedRestart()) ? true : false;
        try {

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
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
