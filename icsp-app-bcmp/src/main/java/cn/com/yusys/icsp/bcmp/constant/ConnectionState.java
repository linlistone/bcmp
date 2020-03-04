package cn.com.yusys.icsp.bcmp.constant;

public enum ConnectionState {
	/**
	 * close_wait状态
	 */
	CLOSE_WAIT("closewait"),
	
	/**
	 * time_wait状态
	 */
	TIME_WAIT("timewait"),
	
	/**
	 * established状态
	 */
	ESTABLISHED("established");
	
	/**
	 * 名称
	 */
	private String name;

	/**
	 * 构造函数
	 * 
	 * @param name
	 */
	private ConnectionState(String name) {
		this.name = name;
	}

	/**
	 * 获取名称
	 * 
	 * @return
	 */
	public String getName() {
		return this.name;
	}
	
}
