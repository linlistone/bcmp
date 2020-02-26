package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import java.util.Date;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 主机信息配置
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 22:59:17
 */
//TableName("bcmp_sm_hostinfo")
public class BcmpSmHostinfo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * ID
	 *	pk
	 */
	private String hostId;
   /**
	 * 主机IP
	 */
	private String hostIp;
   /**
	 * 文件传输方式
	 */
	private String fileTransportWay;
   /**
	 * 文件传输端口
	 */
	private String fileTransportPort;
   /**
	 * 用户名
	 */
	private String fileTransportUsername;
   /**
	 * 密码
	 */
	private String fileTransportPassword;
   /**
	 * 登录方式
	 */
	private String loginWay;
   /**
	 * 登录端口
	 */
	private String loginPort;
   /**
	 * 用户名
	 */
	private String loginUsername;
   /**
	 * 密码
	 */
	private String loginPassword;
   /**
	 * 最后修改用户
	 */
	private String lastChgUsr;
   /**
	 * 最后修改时间
	 */
	private String lastChgDt;
	
	/**
	 * ID
	 * @param hostId
	 */
	public void setHostId(String hostId) {
		this.hostId = hostId;
	}

	/**
	 * ID
	 * @return hostId
	 */
	public String getHostId() {
		return this.hostId;
	}
	/**
	 * 主机IP
	 * @param hostIp
	 */
	public void setHostIp(String hostIp) {
		this.hostIp = hostIp;
	}

	/**
	 * 主机IP
	 * @return hostIp
	 */
	public String getHostIp() {
		return this.hostIp;
	}
	/**
	 * 文件传输方式
	 * @param fileTransportWay
	 */
	public void setFileTransportWay(String fileTransportWay) {
		this.fileTransportWay = fileTransportWay;
	}

	/**
	 * 文件传输方式
	 * @return fileTransportWay
	 */
	public String getFileTransportWay() {
		return this.fileTransportWay;
	}
	/**
	 * 文件传输端口
	 * @param fileTransportPort
	 */
	public void setFileTransportPort(String fileTransportPort) {
		this.fileTransportPort = fileTransportPort;
	}

	/**
	 * 文件传输端口
	 * @return fileTransportPort
	 */
	public String getFileTransportPort() {
		return this.fileTransportPort;
	}
	/**
	 * 用户名
	 * @param fileTransportUsername
	 */
	public void setFileTransportUsername(String fileTransportUsername) {
		this.fileTransportUsername = fileTransportUsername;
	}

	/**
	 * 用户名
	 * @return fileTransportUsername
	 */
	public String getFileTransportUsername() {
		return this.fileTransportUsername;
	}
	/**
	 * 密码
	 * @param fileTransportPassword
	 */
	public void setFileTransportPassword(String fileTransportPassword) {
		this.fileTransportPassword = fileTransportPassword;
	}

	/**
	 * 密码
	 * @return fileTransportPassword
	 */
	public String getFileTransportPassword() {
		return this.fileTransportPassword;
	}
	/**
	 * 登录方式
	 * @param loginWay
	 */
	public void setLoginWay(String loginWay) {
		this.loginWay = loginWay;
	}

	/**
	 * 登录方式
	 * @return loginWay
	 */
	public String getLoginWay() {
		return this.loginWay;
	}
	/**
	 * 登录端口
	 * @param loginPort
	 */
	public void setLoginPort(String loginPort) {
		this.loginPort = loginPort;
	}

	/**
	 * 登录端口
	 * @return loginPort
	 */
	public String getLoginPort() {
		return this.loginPort;
	}
	/**
	 * 用户名
	 * @param loginUsername
	 */
	public void setLoginUsername(String loginUsername) {
		this.loginUsername = loginUsername;
	}

	/**
	 * 用户名
	 * @return loginUsername
	 */
	public String getLoginUsername() {
		return this.loginUsername;
	}
	/**
	 * 密码
	 * @param loginPassword
	 */
	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}

	/**
	 * 密码
	 * @return loginPassword
	 */
	public String getLoginPassword() {
		return this.loginPassword;
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
		strBuf.append("BcmpSmHostinfo[");
		strBuf.append("hostId=").append(hostId).append(",");
		strBuf.append("hostIp=").append(hostIp).append(",");
		strBuf.append("fileTransportWay=").append(fileTransportWay).append(",");
		strBuf.append("fileTransportPort=").append(fileTransportPort).append(",");
		strBuf.append("fileTransportUsername=").append(fileTransportUsername).append(",");
		strBuf.append("fileTransportPassword=").append(fileTransportPassword).append(",");
		strBuf.append("loginWay=").append(loginWay).append(",");
		strBuf.append("loginPort=").append(loginPort).append(",");
		strBuf.append("loginUsername=").append(loginUsername).append(",");
		strBuf.append("loginPassword=").append(loginPassword).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
