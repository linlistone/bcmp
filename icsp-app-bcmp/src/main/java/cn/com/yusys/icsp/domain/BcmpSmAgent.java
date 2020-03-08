package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 代理服务表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 21:18:06
 */
//TableName("bcmp_sm_agent")
public class BcmpSmAgent extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 代理ID
	 *	pk
	 */
	private String agentId;
   /**
	 * 主机名称
	 */
	private String hostName;
   /**
	 * 主机ID
	 */
	private String hostAddress;
   /**
	 * 系统类型
	 */
	private String osName;
   /**
	 * RMI端口
	 */
	private String rmiPort;
   /**
	 * HTTP端口
	 */
	private String socketPort;
   /**
	 * 注册时间
	 */
	private String registryTime;
   /**
	 * 当前版本
	 */
	private String version;
   /**
	 * RMI状态
	 */
	private String status;
   /**
	 * HTTP状态
	 */
	private String socketStatus;
   /**
	 * 应用位置
	 */
	private String appWorkspace;
	
	/**
	 * 代理ID
	 * @param agentId
	 */
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	/**
	 * 代理ID
	 * @return agentId
	 */
	public String getAgentId() {
		return this.agentId;
	}
	/**
	 * 主机名称
	 * @param hostName
	 */
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	/**
	 * 主机名称
	 * @return hostName
	 */
	public String getHostName() {
		return this.hostName;
	}
	/**
	 * 主机ID
	 * @param hostAddress
	 */
	public void setHostAddress(String hostAddress) {
		this.hostAddress = hostAddress;
	}

	/**
	 * 主机ID
	 * @return hostAddress
	 */
	public String getHostAddress() {
		return this.hostAddress;
	}
	/**
	 * 系统类型
	 * @param osName
	 */
	public void setOsName(String osName) {
		this.osName = osName;
	}

	/**
	 * 系统类型
	 * @return osName
	 */
	public String getOsName() {
		return this.osName;
	}
	/**
	 * RMI端口
	 * @param rmiPort
	 */
	public void setRmiPort(String rmiPort) {
		this.rmiPort = rmiPort;
	}

	/**
	 * RMI端口
	 * @return rmiPort
	 */
	public String getRmiPort() {
		return this.rmiPort;
	}
	/**
	 * HTTP端口
	 * @param socketPort
	 */
	public void setSocketPort(String socketPort) {
		this.socketPort = socketPort;
	}

	/**
	 * HTTP端口
	 * @return socketPort
	 */
	public String getSocketPort() {
		return this.socketPort;
	}
	/**
	 * 注册时间
	 * @param registryTime
	 */
	public void setRegistryTime(String registryTime) {
		this.registryTime = registryTime;
	}

	/**
	 * 注册时间
	 * @return registryTime
	 */
	public String getRegistryTime() {
		return this.registryTime;
	}
	/**
	 * 当前版本
	 * @param version
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * 当前版本
	 * @return version
	 */
	public String getVersion() {
		return this.version;
	}
	/**
	 * RMI状态
	 * @param status
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * RMI状态
	 * @return status
	 */
	public String getStatus() {
		return this.status;
	}
	/**
	 * HTTP状态
	 * @param socketStatus
	 */
	public void setSocketStatus(String socketStatus) {
		this.socketStatus = socketStatus;
	}

	/**
	 * HTTP状态
	 * @return socketStatus
	 */
	public String getSocketStatus() {
		return this.socketStatus;
	}
	/**
	 * 应用位置
	 * @param appWorkspace
	 */
	public void setAppWorkspace(String appWorkspace) {
		this.appWorkspace = appWorkspace;
	}

	/**
	 * 应用位置
	 * @return appWorkspace
	 */
	public String getAppWorkspace() {
		return this.appWorkspace;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmAgent[");
		strBuf.append("agentId=").append(agentId).append(",");
		strBuf.append("hostName=").append(hostName).append(",");
		strBuf.append("hostAddress=").append(hostAddress).append(",");
		strBuf.append("osName=").append(osName).append(",");
		strBuf.append("rmiPort=").append(rmiPort).append(",");
		strBuf.append("socketPort=").append(socketPort).append(",");
		strBuf.append("registryTime=").append(registryTime).append(",");
		strBuf.append("version=").append(version).append(",");
		strBuf.append("status=").append(status).append(",");
		strBuf.append("socketStatus=").append(socketStatus).append(",");
		strBuf.append("appWorkspace=").append(appWorkspace);
		strBuf.append("]");
		return strBuf.toString();
	}
}
