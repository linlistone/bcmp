package cn.com.yusys.icsp.agent.mxbean;

import cn.com.yusys.icsp.agent.AgentMXBeanFactory;
import cn.com.yusys.icsp.agent.common.beans.ExecResult;
import cn.com.yusys.icsp.agent.common.exception.AgentException;
import cn.com.yusys.icsp.agent.common.mxbean.AgentManagementMXBean;
import cn.com.yusys.icsp.agent.common.mxbean.ApplicationManagementMXBean;

public class MxBeanClientImpl implements MxBeanClient {
    private ApplicationManagementMXBean appMxBean;

    private AgentManagementMXBean agentMxBean;

    public MxBeanClientImpl(ApplicationManagementMXBean appMxBean) {
        this.appMxBean = appMxBean;
    }

    public MxBeanClientImpl(ApplicationManagementMXBean appMxBean, AgentManagementMXBean agentMxBean) {
        this.appMxBean = appMxBean;
        this.agentMxBean = agentMxBean;
    }

    @Override
    public ExecResult runCmd(String dir, String... cmd) throws AgentException {
        return this.appMxBean.runCmd(dir, cmd);
    }

    @Override
    public ExecResult runShell(String dir, String... cmd) throws AgentException {
        return this.appMxBean.runShell(dir, cmd);
    }

    @Override
    public String getAgentStatus() throws AgentException {
        return this.agentMxBean.getAgentStatus();
    }

    @Override
    public String agentShutdown() throws AgentException {
        return this.agentMxBean.shutdown();
    }

    @Override
    public void close() {
        AgentMXBeanFactory.instance().closeJMXConnector(this.appMxBean);
    }

}
