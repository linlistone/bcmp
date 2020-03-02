package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.ShellScriptManager;
import cn.com.yusys.icsp.bean.HostAgnetBean;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AgentRegistryInfo;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.repository.mapper.BcmpSmHostinfoMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Transactional
public class BcmpSmAgentListService {

    private Logger logger = LoggerFactory.getLogger(BcmpSmAgentListService.class);

    /**
     * 代理服务器节点注册列表
     */
    private static ConcurrentHashMap<String, AgentRegistryInfo> agentHostMap = new ConcurrentHashMap<>();

    @Autowired
    private BcmpSmHostinfoMapper bcmpSmHostinfoMapper;


    public int registry(AgentRegistryInfo agentRegistryInfo) throws Exception {
        logger.info("registry:" + agentRegistryInfo.toString());
        agentHostMap.put(agentRegistryInfo.getHostAddress(), agentRegistryInfo);
        return 0;
    }

    /**
     * @方法名称: index
     * @方法描述: 查询所有
     * @参数与返回说明:
     * @算法描述: 无
     */
    public PageInfo<HostAgnetBean> index(QueryModel model) throws Exception {
        PageHelper.startPage(model.getPage(), model.getSize());
        List<BcmpSmHostinfo> list = bcmpSmHostinfoMapper.selectByModel(model);
        List retList = new ArrayList();
        for (BcmpSmHostinfo host : list) {
            HostAgnetBean hostAgnetBean = new HostAgnetBean();
            hostAgnetBean.setHostInfo(host);
            AgentRegistryInfo agentRegistryInfo = agentHostMap.get(host.getHostIp());
            if(agentRegistryInfo==null) {
                agentRegistryInfo = new AgentRegistryInfo();
                agentRegistryInfo.setHostAddress(host.getHostIp());
                agentRegistryInfo.setOsName("UNKNOW");
                agentRegistryInfo.setRmiPort(-1);
                agentRegistryInfo.setRmiStatus("未知");
                agentRegistryInfo.setSocketPort(-1);
                agentRegistryInfo.setSocketStatus("未知");
            }
            hostAgnetBean.setAgentInfo(agentRegistryInfo);
            retList.add(hostAgnetBean);
        }
        PageHelper.clearPage();
        return new PageInfo<>(retList);
    }

    /**
     * @方法名称: retbootAgent
     * @方法描述: 重启代理服务
     * @参数与返回说明:
     * @算法描述: 无
     */
    public int retbootAgent(String ip) throws Exception {
        HostDescriptor hostDescriptor=getHostDescriptor(ip);
        String cmd = ShellScriptManager.getScript(hostDescriptor.getOsName(),"rebootAgent.sh");
        String ret=BcmpTools.goCmd(hostDescriptor,cmd);
        logger.debug(ret);
        return 0;
    }

    private HostDescriptor getHostDescriptor(String ip){
        AgentRegistryInfo agentRegistryInfo= agentHostMap.get(ip);
        if(agentRegistryInfo==null){
            throw new ICSPException("代理服务器不存在"+ip,900);
        }
        HostDescriptor hostDescriptor=new HostDescriptor();
//        hostDescriptor.setIp(agentRegistryInfo.getHostAddress());
        hostDescriptor.setIp("127.0.0.1");
        hostDescriptor.setOsName(agentRegistryInfo.getOsName());
        hostDescriptor.setRmiPort(String.valueOf(agentRegistryInfo.getRmiPort()));
        hostDescriptor.setSocketPort(agentRegistryInfo.getSocketStatus());
        return  hostDescriptor;
    }

    /**
     * @方法名称: shutdownAgent
     * @方法描述: 关闭代理服务
     * @参数与返回说明:
     * @算法描述: 无
     */
    public int shutdownAgent(String ip) throws Exception {

        return 0;
    }

    /**
     * @方法名称: startUpApp
     * @方法描述: 启服应用节点
     * @参数与返回说明:
     * @算法描述: 无
     */
    public int startUpApp(String ip, BcmpSmNodeinfo nodeInfo) {

        return 0;
    }

    /**
     * @方法名称: shutdownApp
     * @方法描述: 停止应用节点
     * @参数与返回说明:
     * @算法描述: 无
     */
    public int shutdownApp(String ip, BcmpSmNodeinfo nodeInfo) {

        return 0;
    }


}
