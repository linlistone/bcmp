package cn.com.yusys.icsp.bcmp.constant;

/**
 * 操作系统标识
 * 
 * @author 江成
 * 
 */
public enum OS {

	/**
	 * AIX
	 */
	AIX("aix"),

	/**
	 * LINUX
	 */
	LINUX("linux"),
	
	/**
	 * UN KNOWN
	 */
	UNKNOWN("unknown");

	/**
	 * 名称
	 */
	private String name;

	/**
	 * 构造函数
	 * 
	 * @param name
	 */
	private OS(String name) {
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
