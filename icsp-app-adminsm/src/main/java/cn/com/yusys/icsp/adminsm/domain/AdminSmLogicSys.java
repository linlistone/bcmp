package cn.com.yusys.icsp.adminsm.domain;

public class AdminSmLogicSys {

	/** 记录编号 **/
	private String sysId;
	/** 认证类型 **/
	private String authId;

	/** 版本号 **/
	private String sysVersion;

	/** 逻辑系统名称 **/
	private String sysName;

	/** 逻辑系统描述 **/
	private String sysDesc;

	/** 逻辑系统状态 **/
	private String sysSts;

	/** 是否单点登录 **/
	private String isSso;

	/** 系统简称 **/
	private String sysCode;

	/**
	 * @param sysId
	 */
	public void setSysId(String sysId) {
		this.sysId = sysId;
	}

	/**
	 * @return sysId
	 */
	public String getSysId() {
		return this.sysId;
	}

	/**
	 * @param authId
	 */
	public void setAuthId(String authId) {
		this.authId = authId;
	}

	/**
	 * @return authId
	 */
	public String getAuthId() {
		return this.authId;
	}

	/**
	 * @param sysVersion
	 */
	public void setSysVersion(String sysVersion) {
		this.sysVersion = sysVersion;
	}

	/**
	 * @return sysVersion
	 */
	public String getSysVersion() {
		return this.sysVersion;
	}

	/**
	 * @param sysName
	 */
	public void setSysName(String sysName) {
		this.sysName = sysName;
	}

	/**
	 * @return sysName
	 */
	public String getSysName() {
		return this.sysName;
	}

	/**
	 * @param sysDesc
	 */
	public void setSysDesc(String sysDesc) {
		this.sysDesc = sysDesc;
	}

	/**
	 * @return sysDesc
	 */
	public String getSysDesc() {
		return this.sysDesc;
	}

	/**
	 * @param sysSts
	 */
	public void setSysSts(String sysSts) {
		this.sysSts = sysSts;
	}

	/**
	 * @return sysSts
	 */
	public String getSysSts() {
		return this.sysSts;
	}

	/**
	 * @param isSso
	 */
	public void setIsSso(String isSso) {
		this.isSso = isSso;
	}

	/**
	 * @return isSso
	 */
	public String getIsSso() {
		return this.isSso;
	}

	/**
	 * @param sysCode
	 */
	public void setSysCode(String sysCode) {
		this.sysCode = sysCode;
	}

	/**
	 * @return sysCode
	 */
	public String getSysCode() {
		return this.sysCode;
	}
}