package cn.com.yusys.icsp.bean;

import cn.com.yusys.icsp.domain.AgentRegistryInfo;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;

public class HostAgnetBean {

    private BcmpSmHostinfo hostInfo;

    private AgentRegistryInfo agentInfo;

    public BcmpSmHostinfo getHostInfo() {
        return hostInfo;
    }

    public AgentRegistryInfo getAgentInfo() {
        return agentInfo;
    }

    public void setHostInfo(BcmpSmHostinfo hostInfo) {
        this.hostInfo = hostInfo;
    }

    public void setAgentInfo(AgentRegistryInfo agentInfo) {
        this.agentInfo = agentInfo;
    }

    @Override
    public String toString() {
        return "HostAgnetBean{" +
                "hostInfo=" + hostInfo +
                ", agentInfo=" + agentInfo +
                '}';
    }
}
