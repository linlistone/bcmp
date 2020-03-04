package cn.com.yusys.icsp.bcmp.node;


import cn.com.yusys.icsp.bcmp.constant.Protocol;

/**
 * 节点信息
 * 
 * @author 江成
 * 
 */
public class NodeInfo {

	/**
	 * name
	 */
	private String name;

	/**
	 * 描述
	 */
	private String description;

	/**
	 * host
	 */
	private String host;

	/**
	 * port
	 */
	private int port;

	/**
	 * JVM port
	 */
	private int jvmPort;

	/**
	 * 用户名
	 */
	private String userName;

	/**
	 * 密码
	 */
	private String password;

	/**
	 * 工作目录
	 */
	private String workDir;

	/**
	 * 更新目录
	 */
	private String upateDir;

	/**
	 * 应用目录
	 */
	private String appDir;
	
	/**
	 * 应用 port
	 */
	private int appPort;
	
	/**
	 * 应用 HTTP port
	 */
	private int appHttpPort;

	/**
	 * 协议
	 */
	private Protocol protocol;

	/**
	 * transmit 协议
	 */
	private Protocol transmitProtocol;

	/**
	 * transmit port
	 */
	private int transmitPort;

	/**
	 * transmit user name
	 */
	private String transmitUserName;

	/**
	 * transmit password
	 */
	private String transmitPassword;

	/**
	 * 获取节点名称
	 * 
	 * @return
	 */
	public String getName() {
		if(name == null) {
			return "";
		}
		return this.name;
	}

	/**
	 * 设置节点名称
	 * 
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 获取描述
	 * 
	 * @return
	 */
	public String getDescription() {
		if(description == null) {
			return "";
		}
		return this.description;
	}

	/**
	 * 设置描述
	 * 
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 设置传送端口
	 * 
	 * @param transmitPort
	 */
	public void setTransmitPort(int transmitPort) {
		this.transmitPort = transmitPort;
	}

	/**
	 * 获取传送端口
	 * 
	 * @return
	 */
	public int getTransmitPort() {
		return this.transmitPort;
	}

	/**
	 * 获取传送协议
	 * 
	 * @return
	 */
	public Protocol getTransmitProtocol() {
		return transmitProtocol;
	}

	/**
	 * 设置传送协议
	 * 
	 * @param transmitProtocol
	 */
	public void setTransmitProtocol(Protocol transmitProtocol) {
		this.transmitProtocol = transmitProtocol;
	}

	/**
	 * 获取传送用户名
	 * 
	 * @return
	 */
	public String getTransmitUserName() {
		if(transmitUserName == null) {
			return "";
		}
		return transmitUserName;
	}

	/**
	 * 设置传送用户名
	 * 
	 * @param transmitUserName
	 */
	public void setTransmitUserName(String transmitUserName) {
		this.transmitUserName = transmitUserName;
	}

	/**
	 * 获取传送密码
	 * 
	 * @return
	 */
	public String getTransmitPassword() {
		if(transmitPassword == null) {
			return "";
		}
		return transmitPassword;
	}

	/**
	 * 设置传送密码
	 * 
	 * @param transmitPassword
	 */
	public void setTransmitPassword(String transmitPassword) {
		this.transmitPassword = transmitPassword;
	}

	/**
	 * 获取主机地址
	 * 
	 * @return
	 */
	public String getHost() {
		if(host == null) {
			return "";
		}
		return host;
	}

	/**
	 * 设置主机地址
	 * 
	 * @param host
	 */
	public void setHost(String host) {
		this.host = host;
	}

	/**
	 * 获取端口
	 * 
	 * @return
	 */
	public int getPort() {
		return port;
	}
	
	/**
	 * 设置端口
	 * 
	 * @param port
	 */
	public void setPort(int port) {
		this.port = port;
	}


	/**
	 * 获取端口
	 * 
	 * @return
	 */
	public int getAppPort() {
		return appPort;
	}
	
	/**
	 * 设置端口
	 * 
	 * @param appPort
	 */
	public void setAppPort(int appPort) {
		this.appPort = appPort;
	}

	/**
	 * 设置HTTP端口
	 * 
	 * @param port
	 */
	public void setAppHttpPort(int appHttpPort) {
		this.appHttpPort = appHttpPort;
	}
	
	/**
	 * 获取HTTP端口
	 * 
	 * @return
	 */
	public int getAppHttpPort() {
		return appHttpPort;
	}


	/**
	 * 获取JVM端口
	 * 
	 * @return
	 */
	public int getJvmPort() {
		return jvmPort;
	}

	/**
	 * 设置JVM端口
	 * 
	 * @param jmxPorx
	 */
	public void setJvmPort(int jvmPort) {
		this.jvmPort = jvmPort;
	}

	/**
	 * 获取用户名
	 * 
	 * @return
	 */
	public String getUserName() {
		if(userName == null) {
			return "";
		}
		return userName;
	}

	/**
	 * 设置用户名
	 * 
	 * @param userName
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * 获取密码
	 * 
	 * @return
	 */
	public String getPassword() {
		if(password == null) {
			return "";
		}
		return password;
	}

	/**
	 * 设置密码
	 * 
	 * @param password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * 获取协议
	 * 
	 * @return
	 */
	public Protocol getProtocol() {
		return protocol;
	}

	/**
	 * 设置协议
	 * 
	 * @param protocol
	 */
	public void setProtocol(Protocol protocol) {
		this.protocol = protocol;
	}

	/**
	 * 获取工作目录
	 * 
	 * @return
	 */
	public String getWorkDir() {
		if(workDir == null) {
			return "";
		}
		return workDir;
	}

	/**
	 * 设置工作目录
	 * 
	 * @param workDir
	 */
	public void setWorkDir(String workDir) {
		this.workDir = workDir;
	}

	/**
	 * 获取更新目录
	 * 
	 * @return
	 */
	public String getUpateDir() {
		if(upateDir == null) {
			return "";
		}
		return upateDir;
	}

	/**
	 * 设置更新目录
	 * 
	 * @param upateDir
	 */
	public void setUpateDir(String upateDir) {
		this.upateDir = upateDir;
	}

	/**
	 * 获取应用目录
	 * 
	 * @return
	 */
	public String getAppDir() {
		if(appDir == null) {
			return "";
		}
		return appDir;
	}

	/**
	 * 设置服务目录
	 * 
	 * @param appDir
	 */
	public void setAppDir(String appDir) {
		this.appDir = appDir;
	}

	/**
	 * equals
	 */
	public boolean equals(Object object) {
		if(object instanceof NodeInfo) {
			NodeInfo nodeInfo = (NodeInfo)object;
			//1name
			if(!this.getName().equals(nodeInfo.getName())) {
				return false;
			}
			//2描述
			if(!this.getDescription().equals(nodeInfo.getDescription())) {
				return false;
			}
			//3主机地址
			if(!this.getHost().equals(nodeInfo.getHost())) {
				return false;
			}
			//4端口
			if(this.getPort() != nodeInfo.getPort()) {
				return false;
			}
			//5端口
			if(this.getAppPort() != nodeInfo.getAppPort()) {
				return false;
			}
			//6jvm端口
			if(this.getJvmPort() != nodeInfo.getJvmPort()) {
				return false;
			}
			//7bips 端口
			if(this.getAppHttpPort() != nodeInfo.getAppHttpPort()) {
				return false;
			}
			//8用户名
			if(!this.getUserName().equals(nodeInfo.getUserName())) {
				return false;
			}
			//9密码
			if(!this.getPassword().equals(nodeInfo.getPassword())) {
				return false;
			}
			//10工作目录
			if(!this.getWorkDir().equals(nodeInfo.getWorkDir())) {
				return false;
			}
			//11更新目录
			if(!this.getUpateDir().equals(nodeInfo.getUpateDir())) {
				return false;
			}
			//12app安装目录
			if(!this.getAppDir().equals(nodeInfo.getAppDir())) {
				return false;
			}
			//13协议
			if(!this.getProtocol().equals(nodeInfo.getProtocol())) {
				return false;
			}
			//14transmit协议
			if(!this.getTransmitProtocol().equals(nodeInfo.getTransmitProtocol())) {
				return false;
			}
			//15transmit端口
			if(this.getTransmitPort() != nodeInfo.getTransmitPort()) {
				return false;
			}
			//16transmit用户
			if(!this.getTransmitUserName().equals(nodeInfo.getTransmitUserName())) {
				return false;
			}
			//17transmit密码
			if(!this.getTransmitPassword().equals(nodeInfo.getTransmitPassword())) {
				return false;
			}
			return true;
		} else {
			return super.equals(object);
		}
	}
}
