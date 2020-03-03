package cn.com.yusys.icsp.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @项目名称: sp-platform-oca-core模块
 * @类名称: AdminSmAuthReco
 * @类描述: admin_sm_auth_reco数据实体类
 * @功能描述:
 * @创建人: c00178
 * @创建时间: 2019-06-25 16:00:50
 * @修改备注:
 * @修改记录: 修改时间 修改人员 修改原因
 *        -------------------------------------------------------------
 * @version 1.0.0
 * @Copyright (c) 2017宇信科技-版权所有
 */
@Table(name = "admin_sm_auth_reco")
public class AdminSmAuthReco extends BaseDomain implements Serializable {

	private static final long serialVersionUID = 1L;

	/** 记录编号 **/
	/** 记录编号 **/
	@Id
	@Column(name = "AUTH_RECO_ID")
	private String authRecoId;
	/** 逻辑系统记录编号 **/
	@Column(name = "SYS_ID", unique = false, nullable = false, length = 32)
	private String sysId;

	/** 授权对象类型（R-角色，U-用户，D-部门，G-机构，OU-对象组） **/
	@Column(name = "AUTHOBJ_TYPE", unique = false, nullable = false, length = 10)
	private String authobjType;

	/** 授权对象记录编号 **/
	@Column(name = "AUTHOBJ_ID", unique = false, nullable = false, length = 32)
	private String authobjId;

	/** 授权资源类型（M-菜单，C-控制点，D-数据权限） **/
	@Column(name = "AUTHRES_TYPE", unique = false, nullable = false, length = 10)
	private String authresType;

	/** 授权资源记录编号 **/
	@Column(name = "AUTHRES_ID", unique = false, nullable = false, length = 32)
	private String authresId;

	/** 最新变更用户 **/
	@Column(name = "LAST_CHG_USR", unique = false, nullable = false, length = 32)
	private String lastChgUsr;

	/** 最新变更时间 **/
	@Column(name = "LAST_CHG_DT", unique = false, nullable = false, length = 20)
	private String lastChgDt;

	/** 菜单ID **/
	@Column(name = "MENU_ID", unique = false, nullable = true, length = 32)
	private String menuId;

	/**
	 * @param authRecoId
	 */
	public void setAuthRecoId(String authRecoId) {
		this.authRecoId = authRecoId;
	}

	/**
	 * @return authRecoId
	 */
	public String getAuthRecoId() {
		return this.authRecoId;
	}

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
	 * @param authobjType
	 */
	public void setAuthobjType(String authobjType) {
		this.authobjType = authobjType;
	}

	/**
	 * @return authobjType
	 */
	public String getAuthobjType() {
		return this.authobjType;
	}

	/**
	 * @param authobjId
	 */
	public void setAuthobjId(String authobjId) {
		this.authobjId = authobjId;
	}

	/**
	 * @return authobjId
	 */
	public String getAuthobjId() {
		return this.authobjId;
	}

	/**
	 * @param authresType
	 */
	public void setAuthresType(String authresType) {
		this.authresType = authresType;
	}

	/**
	 * @return authresType
	 */
	public String getAuthresType() {
		return this.authresType;
	}

	/**
	 * @param authresId
	 */
	public void setAuthresId(String authresId) {
		this.authresId = authresId;
	}

	/**
	 * @return authresId
	 */
	public String getAuthresId() {
		return this.authresId;
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

	/**
	 * @param menuId
	 */
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	/**
	 * @return menuId
	 */
	public String getMenuId() {
		return this.menuId;
	}

}