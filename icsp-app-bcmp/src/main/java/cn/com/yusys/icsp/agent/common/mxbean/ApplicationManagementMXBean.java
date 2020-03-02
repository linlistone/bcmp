package cn.com.yusys.icsp.agent.common.mxbean;

import cn.com.yusys.icsp.agent.common.beans.ExecResult;
import cn.com.yusys.icsp.agent.common.exception.AgentException;

public interface ApplicationManagementMXBean {
	ExecResult runCmd(String p0, String[] p1) throws AgentException;

	ExecResult runShell(String p0, String[] p1) throws AgentException;
}
