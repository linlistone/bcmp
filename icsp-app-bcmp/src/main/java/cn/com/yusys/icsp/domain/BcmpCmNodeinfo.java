package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 节点信息表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:08
 */
//TableName("bcmp_cm_nodeinfo")
public class BcmpCmNodeinfo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 节点ID
	 *	pk
	 */
	private String nodeId;
   /**
	 * 节点主机IP
	 */
	private String hostIp;
   /**
	 * 节点类型
	 */
	private String nodeType;
   /**
	 * 应用路径
	 */
	private String applyPath;
   /**
	 * 节点名称
	 */
	private String nodeName;
   /**
	 * 节点描述
	 */
	private String description;
   /**
	 * 是否软连接
	 */
	private String islink;
   /**
	 * 连接目录
	 */
	private String linkDirectory;
   /**
	 * 更新目录
	 */
	private String updateDirectory;
   /**
	 * 应用端口
	 */
	private String applyPort;
   /**
	 * HTTP端口
	 */
	private String httpPort;
   /**
	 * JVM端口
	 */
	private String jvmPort;
   /**
	 * 最后修改用户
	 */
	private String lastChgUsr;
   /**
	 * 最后修改时间
	 */
	private String lastChgDt;
	
	/**
	 * 节点ID
	 * @param nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 节点ID
	 * @return nodeId
	 */
	public String getNodeId() {
		return this.nodeId;
	}
	/**
	 * 节点主机IP
	 * @param hostIp
	 */
	public void setHostIp(String hostIp) {
		this.hostIp = hostIp;
	}

	/**
	 * 节点主机IP
	 * @return hostIp
	 */
	public String getHostIp() {
		return this.hostIp;
	}
	/**
	 * 节点类型
	 * @param nodeType
	 */
	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	/**
	 * 节点类型
	 * @return nodeType
	 */
	public String getNodeType() {
		return this.nodeType;
	}
	/**
	 * 应用路径
	 * @param applyPath
	 */
	public void setApplyPath(String applyPath) {
		this.applyPath = applyPath;
	}

	/**
	 * 应用路径
	 * @return applyPath
	 */
	public String getApplyPath() {
		return this.applyPath;
	}
	/**
	 * 节点名称
	 * @param nodeName
	 */
	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	/**
	 * 节点名称
	 * @return nodeName
	 */
	public String getNodeName() {
		return this.nodeName;
	}
	/**
	 * 节点描述
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 节点描述
	 * @return description
	 */
	public String getDescription() {
		return this.description;
	}
	/**
	 * 是否软连接
	 * @param islink
	 */
	public void setIslink(String islink) {
		this.islink = islink;
	}

	/**
	 * 是否软连接
	 * @return islink
	 */
	public String getIslink() {
		return this.islink;
	}
	/**
	 * 连接目录
	 * @param linkDirectory
	 */
	public void setLinkDirectory(String linkDirectory) {
		this.linkDirectory = linkDirectory;
	}

	/**
	 * 连接目录
	 * @return linkDirectory
	 */
	public String getLinkDirectory() {
		return this.linkDirectory;
	}
	/**
	 * 更新目录
	 * @param updateDirectory
	 */
	public void setUpdateDirectory(String updateDirectory) {
		this.updateDirectory = updateDirectory;
	}

	/**
	 * 更新目录
	 * @return updateDirectory
	 */
	public String getUpdateDirectory() {
		return this.updateDirectory;
	}
	/**
	 * 应用端口
	 * @param applyPort
	 */
	public void setApplyPort(String applyPort) {
		this.applyPort = applyPort;
	}

	/**
	 * 应用端口
	 * @return applyPort
	 */
	public String getApplyPort() {
		return this.applyPort;
	}
	/**
	 * HTTP端口
	 * @param httpPort
	 */
	public void setHttpPort(String httpPort) {
		this.httpPort = httpPort;
	}

	/**
	 * HTTP端口
	 * @return httpPort
	 */
	public String getHttpPort() {
		return this.httpPort;
	}
	/**
	 * JVM端口
	 * @param jvmPort
	 */
	public void setJvmPort(String jvmPort) {
		this.jvmPort = jvmPort;
	}

	/**
	 * JVM端口
	 * @return jvmPort
	 */
	public String getJvmPort() {
		return this.jvmPort;
	}
	/**
	 * 最后修改用户
	 * @param lastChgUsr
	 */
	public void setLastChgUsr(String lastChgUsr) {
		this.lastChgUsr = lastChgUsr;
	}

	/**
	 * 最后修改用户
	 * @return lastChgUsr
	 */
	public String getLastChgUsr() {
		return this.lastChgUsr;
	}
	/**
	 * 最后修改时间
	 * @param lastChgDt
	 */
	public void setLastChgDt(String lastChgDt) {
		this.lastChgDt = lastChgDt;
	}

	/**
	 * 最后修改时间
	 * @return lastChgDt
	 */
	public String getLastChgDt() {
		return this.lastChgDt;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpCmNodeinfo[");
		strBuf.append("nodeId=").append(nodeId).append(",");
		strBuf.append("hostIp=").append(hostIp).append(",");
		strBuf.append("nodeType=").append(nodeType).append(",");
		strBuf.append("applyPath=").append(applyPath).append(",");
		strBuf.append("nodeName=").append(nodeName).append(",");
		strBuf.append("description=").append(description).append(",");
		strBuf.append("islink=").append(islink).append(",");
		strBuf.append("linkDirectory=").append(linkDirectory).append(",");
		strBuf.append("updateDirectory=").append(updateDirectory).append(",");
		strBuf.append("applyPort=").append(applyPort).append(",");
		strBuf.append("httpPort=").append(httpPort).append(",");
		strBuf.append("jvmPort=").append(jvmPort).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
