package cn.com.yusys.icsp.bean;

import cn.com.yusys.icsp.domain.BcmpSmAgent;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;

/*
 *  @Description : 服务器集群主机详细信息Bean
 *  @Author : Mr_Jiang
 *  @Date : 2020/3/5 14:21
 */
public class HostAgentBean {
    //主机信息
    private BcmpSmHostinfo bcmpSmHostinfo;
    //节点信息
    private BcmpSmNodeinfo bcmpSmNodeinfo;
    //Agent代理信息
    private BcmpSmAgent agentRegistryInfo;

    public HostAgentBean() {
    }

    public HostAgentBean(BcmpSmHostinfo bcmpSmHostinfo, BcmpSmNodeinfo bcmpSmNodeinfo, BcmpSmAgent agentRegistryInfo) {
        this.bcmpSmHostinfo = bcmpSmHostinfo;
        this.bcmpSmNodeinfo = bcmpSmNodeinfo;
        this.agentRegistryInfo = agentRegistryInfo;
    }

    public BcmpSmNodeinfo getBcmpSmNodeinfo() {
        return bcmpSmNodeinfo;
    }

    public void setBcmpSmNodeinfo(BcmpSmNodeinfo bcmpSmNodeinfo) {
        this.bcmpSmNodeinfo = bcmpSmNodeinfo;
    }

    public BcmpSmHostinfo getBcmpSmHostinfo() {
        return bcmpSmHostinfo;
    }

    public void setBcmpSmHostinfo(BcmpSmHostinfo bcmpSmHostinfo) {
        this.bcmpSmHostinfo = bcmpSmHostinfo;
    }

    public BcmpSmAgent getAgentRegistryInfo() {
        return agentRegistryInfo;
    }

    public void setAgentRegistryInfo(BcmpSmAgent agentRegistryInfo) {
        this.agentRegistryInfo = agentRegistryInfo;
    }

    @Override
    public String toString() {
        return "HostAgentBean{" +
                "bcmpSmNodeinfo=" + bcmpSmNodeinfo.toString() +
                ", bcmpSmHostinfo=" + bcmpSmHostinfo.toString() +
                ", agentRegistryInfo=" + agentRegistryInfo.toString() +
                '}';
    }


}
