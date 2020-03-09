package cn.com.yusys.icsp.agent.mxbean;


import cn.com.yusys.icsp.agent.common.beans.ExecResult;
import cn.com.yusys.icsp.agent.common.exception.AgentException;

public interface MxBeanClient extends AutoCloseable {
    ExecResult runCmd(String p0, String... p1) throws AgentException;

    ExecResult runShell(String p0, String... p1) throws AgentException;

    String getAgentStatus() throws AgentException;

    String agentShutdown() throws AgentException;

    void close();
}
