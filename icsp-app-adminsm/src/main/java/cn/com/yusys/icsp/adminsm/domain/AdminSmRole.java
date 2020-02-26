package cn.com.yusys.icsp.adminsm.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 系统角色表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-26 11:59:53
 */
//TableName("admin_sm_role")
public class AdminSmRole extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 记录编号
	 *	pk
	 */
	private String roleId;
   /**
	 * 角色代码
	 */
	private String roleCode;
   /**
	 * 角色名称
	 */
	private String roleName;
   /**
	 * 角色层级
	 */
	private String roleLevel;
   /**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 */
	private String roleSts;
   /**
	 * 最新变更用户
	 */
	private String lastChgUsr;
   /**
	 * 最新变更时间
	 */
	private String lastChgDt;
   /**
	 * 机构id
	 */
	private String orgId;
	
	/**
	 * 记录编号
	 * @param roleId
	 */
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	/**
	 * 记录编号
	 * @return roleId
	 */
	public String getRoleId() {
		return this.roleId;
	}
	/**
	 * 角色代码
	 * @param roleCode
	 */
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	/**
	 * 角色代码
	 * @return roleCode
	 */
	public String getRoleCode() {
		return this.roleCode;
	}
	/**
	 * 角色名称
	 * @param roleName
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	/**
	 * 角色名称
	 * @return roleName
	 */
	public String getRoleName() {
		return this.roleName;
	}
	/**
	 * 角色层级
	 * @param roleLevel
	 */
	public void setRoleLevel(String roleLevel) {
		this.roleLevel = roleLevel;
	}

	/**
	 * 角色层级
	 * @return roleLevel
	 */
	public String getRoleLevel() {
		return this.roleLevel;
	}
	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @param roleSts
	 */
	public void setRoleSts(String roleSts) {
		this.roleSts = roleSts;
	}

	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @return roleSts
	 */
	public String getRoleSts() {
		return this.roleSts;
	}
	/**
	 * 最新变更用户
	 * @param lastChgUsr
	 */
	public void setLastChgUsr(String lastChgUsr) {
		this.lastChgUsr = lastChgUsr;
	}

	/**
	 * 最新变更用户
	 * @return lastChgUsr
	 */
	public String getLastChgUsr() {
		return this.lastChgUsr;
	}
	/**
	 * 最新变更时间
	 * @param lastChgDt
	 */
	public void setLastChgDt(String lastChgDt) {
		this.lastChgDt = lastChgDt;
	}

	/**
	 * 最新变更时间
	 * @return lastChgDt
	 */
	public String getLastChgDt() {
		return this.lastChgDt;
	}
	/**
	 * 机构id
	 * @param orgId
	 */
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	/**
	 * 机构id
	 * @return orgId
	 */
	public String getOrgId() {
		return this.orgId;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("AdminSmRole[");
		strBuf.append("roleId=").append(roleId).append(",");
		strBuf.append("roleCode=").append(roleCode).append(",");
		strBuf.append("roleName=").append(roleName).append(",");
		strBuf.append("roleLevel=").append(roleLevel).append(",");
		strBuf.append("roleSts=").append(roleSts).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt).append(",");
		strBuf.append("orgId=").append(orgId);
		strBuf.append("]");
		return strBuf.toString();
	}
}
