package cn.com.yusys.icsp.adminsm.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import java.io.Serializable;

/**
 * @项目名称: sp-app-oca-core模块
 * @类名称: AdminSmUserMod
 * @类描述: admin_sm_user_mod数据实体类
 * @功能描述:
 * @创建人: c00153
 * @创建时间: 2019-11-09 09:32:41
 * @修改备注:
 * @修改记录: 修改时间 修改人员 修改原因
 *        -------------------------------------------------------------
 * @version 1.0.0
 * @Copyright (c) 宇信科技-版权所有
 */
public class AdminSmFuncMod extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

	/** 记录编号 **/
	private String modId;
	/** 模块名称 **/
	private String modName;

	/** 模块代码 **/
	private String modCde;
	/** 模块描述 **/
	private String modDesc;

	/** 是否外部系统 **/
	private String isOuter;

	/** 是否APP功能 **/
	private String isApp;

	/** 外部系统登录名 **/
	private String userName;

	/** 外部系统登录密码 **/
	private String password;

	/** 外部系统用户变量名称 **/
	private String userKey;

	/** 外部系统密码变量名称 **/
	private String pwdKey;

	/** 最新变更用户 **/
	private String lastChgUsr;

	/** 最新变更时间 **/
	private String lastChgDt;

	/**
	 * @param modId
	 */
	public void setModId(String modId) {
		this.modId = modId;
	}

	/**
	 * @return modId
	 */
	public String getModId() {
		return this.modId;
	}

	public String getModCde() {
		return modCde;
	}

	public void setModCde(String modCde) {
		this.modCde = modCde;
	}

	/**
	 * @param modName
	 */
	public void setModName(String modName) {
		this.modName = modName;
	}

	/**
	 * @return modName
	 */
	public String getModName() {
		return this.modName;
	}

	/**
	 * @param modDesc
	 */
	public void setModDesc(String modDesc) {
		this.modDesc = modDesc;
	}

	/**
	 * @return modDesc
	 */
	public String getModDesc() {
		return this.modDesc;
	}

	/**
	 * @param isOuter
	 */
	public void setIsOuter(String isOuter) {
		this.isOuter = isOuter;
	}

	/**
	 * @return isOuter
	 */
	public String getIsOuter() {
		return this.isOuter;
	}

	/**
	 * @param isApp
	 */
	public void setIsApp(String isApp) {
		this.isApp = isApp;
	}

	/**
	 * @return isApp
	 */
	public String getIsApp() {
		return this.isApp;
	}

	/**
	 * @param userName
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return userName
	 */
	public String getUserName() {
		return this.userName;
	}

	/**
	 * @param password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return password
	 */
	public String getPassword() {
		return this.password;
	}

	/**
	 * @param userKey
	 */
	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}

	/**
	 * @return userKey
	 */
	public String getUserKey() {
		return this.userKey;
	}

	/**
	 * @param pwdKey
	 */
	public void setPwdKey(String pwdKey) {
		this.pwdKey = pwdKey;
	}

	/**
	 * @return pwdKey
	 */
	public String getPwdKey() {
		return this.pwdKey;
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