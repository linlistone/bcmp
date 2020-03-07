package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.shell.ShellScriptManager;
import cn.com.yusys.icsp.bean.HostAgentBean;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.AgentRegistryInfo;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
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

@Service
@Transactional
public class BcmpSmAgentListService {

    private Logger logger = LoggerFactory.getLogger(BcmpSmAgentListService.class);
    //注入服务器集群信息Service
    @Autowired
    private BcmpSmServerClusterService bcmpSmServerClusterService;
    @Autowired
    private BcmpSmHostinfoMapper bcmpSmHostinfoMapper;
    /**
     * @方法名称: index
     * @方法描述: 查询所有
     * @参数与返回说明:
     * @算法描述: 无
     */
    public PageInfo<HostAgentBean> index(QueryModel model) throws Exception {
        PageHelper.startPage(model.getPage(), model.getSize());
        List<BcmpSmHostinfo> list = bcmpSmHostinfoMapper.selectByModel(model);
        List retList = new ArrayList();
        for (BcmpSmHostinfo host : list) {
            HostAgentBean hostAgentBean = new HostAgentBean();
            hostAgentBean.setBcmpSmHostinfo(host);
            AgentRegistryInfo agentRegistryInfo = bcmpSmServerClusterService.getAgentHostMapInstance().get(host.getHostIp());
            if (agentRegistryInfo == null) {
                agentRegistryInfo = new AgentRegistryInfo();
                agentRegistryInfo.setHostAddress(host.getHostIp());
                agentRegistryInfo.setOsName("UNKNOW");
                agentRegistryInfo.setRmiPort("-1");
                agentRegistryInfo.setRmiStatus("未知");
                agentRegistryInfo.setSocketPort("-1");
                agentRegistryInfo.setSocketStatus("未知");
            }
            hostAgentBean.setAgentRegistryInfo(agentRegistryInfo);
            retList.add(hostAgentBean);
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
    public int retbootAgent(String hostIp) throws Exception {
        AgentRegistryInfo agentRegistryInfo = bcmpSmServerClusterService.getAgentHostMapInstance().get(hostIp);
        if (agentRegistryInfo == null) {
            throw new ICSPException("代理服务器不存在" + hostIp, 900);
        }
        HostDescriptor hostDescriptor = new HostDescriptor(agentRegistryInfo);
        String cmd = ShellScriptManager.getScript(hostDescriptor.getOsName(), "rebootAgent.sh");
        String ret = BcmpTools.goCmd(hostDescriptor, cmd);
        logger.debug(ret);
        return 0;
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
}
