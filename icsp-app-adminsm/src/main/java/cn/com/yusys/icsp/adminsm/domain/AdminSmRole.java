package cn.com.yusys.icsp.adminsm.domain;

public class AdminSmRole {

	/** 记录编号 **/
	private String roleId;
	/** 角色代码 **/
	private String roleCode;

	/** 角色名称 **/
	private String roleName;

	/** 角色层级 **/
	private String roleLevel;

	/** 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效 **/
	private String roleSts;

	/** 最新变更用户 **/
	private String lastChgUsr;

	/** 最新变更时间 **/
	private String lastChgDt;

	/**
	 * @param roleId
	 */
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	/**
	 * @return roleId
	 */
	public String getRoleId() {
		return this.roleId;
	}

	/**
	 * @param roleCode
	 */
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	/**
	 * @return roleCode
	 */
	public String getRoleCode() {
		return this.roleCode;
	}

	/**
	 * @param roleName
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	/**
	 * @return roleName
	 */
	public String getRoleName() {
		return this.roleName;
	}

	/**
	 * @param roleLevel
	 */
	public void setRoleLevel(String roleLevel) {
		this.roleLevel = roleLevel;
	}

	/**
	 * @return roleLevel
	 */
	public String getRoleLevel() {
		return this.roleLevel;
	}

	/**
	 * @param roleSts
	 */
	public void setRoleSts(String roleSts) {
		this.roleSts = roleSts;
	}

	/**
	 * @return roleSts
	 */
	public String getRoleSts() {
		return this.roleSts;
	}

	/**
	 * @param lastChgUsr
	 */
	public void setLastChgUsr(String lastChgUsr) {
		this.lastChgUsr = lastChgUsr;
	}

	/**
	 * @return lastChgUsr
	 */
	public String getLastChgUsr() {
		return this.lastChgUsr;
	}

	/**
	 * @param lastChgDt
	 */
	public void setLastChgDt(String lastChgDt) {
		this.lastChgDt = lastChgDt;
	}

	/**
	 * @return lastChgDt
	 */
	public String getLastChgDt() {
		return this.lastChgDt;
	}
}