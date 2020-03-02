package cn.com.yusys.icsp.bcmp;

public class HostDescriptor {
	private String ip;
	private int port;
	private String userName;
	private String password;
	private String hostName;
	private String rmiPort;
	private String socketPort;
	private String osName;

	public HostDescriptor() {
		this.port = 22;
	}

	public HostDescriptor(final String ip, final String userName, final String password, final String rmiPort) {
		this.port = 22;
		this.ip = ip;
		this.userName = userName;
		this.password = password;
		this.rmiPort = rmiPort;
	}

	public String getOsName() {
		return osName;
	}

	public void setOsName(String osName) {
		this.osName = osName;
	}

	public String getIp() {
		return this.ip;
	}

	public void setIp(final String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return this.port;
	}

	public void setPort(final int port) {
		this.port = port;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(final String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(final String password) {
		this.password = password;
	}

	public String getHostName() {
		return this.hostName;
	}

	public void setHostName(final String hostName) {
		this.hostName = hostName;
	}

	public String getRmiPort() {
		return this.rmiPort;
	}

	public void setRmiPort(final String rmiPort) {
		this.rmiPort = rmiPort;
	}

	public String getSocketPort() {
		return this.socketPort;
	}

	public void setSocketPort(final String socketPort) {
		this.socketPort = socketPort;
	}
}
