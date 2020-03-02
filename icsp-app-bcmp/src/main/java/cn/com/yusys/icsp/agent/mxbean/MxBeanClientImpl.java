package cn.com.yusys.icsp.agent.mxbean;

import cn.com.yusys.icsp.agent.AgentMXBeanFactory;
import cn.com.yusys.icsp.agent.common.beans.ExecResult;
import cn.com.yusys.icsp.agent.common.exception.AgentException;
import cn.com.yusys.icsp.agent.common.mxbean.ApplicationManagementMXBean;

public class MxBeanClientImpl implements MxBeanClient
{
    private ApplicationManagementMXBean mxBean;
    
    public MxBeanClientImpl(final ApplicationManagementMXBean mxBean) {
        this.mxBean = mxBean;
    }
    
    @Override
    public ExecResult runCmd(final String dir, final String... cmd) throws AgentException {
        return this.mxBean.runCmd(dir, cmd);
    }
    
    @Override
    public ExecResult runShell(final String dir, final String... cmd) throws AgentException {
        return this.mxBean.runShell(dir, cmd);
    }
    
    @Override
    public void close() {
        AgentMXBeanFactory.instance().closeJMXConnector(this.mxBean);
    }
}
