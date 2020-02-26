package cn.com.yusys.icsp.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import java.io.Serializable;

/**
 * @项目名称: sp-app-oca-core模块
 * @类名称: AdminSmBusiFunc
 * @类描述: admin_sm_busi_func数据实体类
 * @功能描述:
 * @创建人: c00177
 * @创建时间: 2019-07-10 16:42:02
 * @修改备注:
 * @修改记录: 修改时间 修改人员 修改原因
 *        -------------------------------------------------------------
 * @version 1.0.0
 * @Copyright (c) 2017宇信科技-版权所有
 */
public class AdminSmBusiFunc extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

	/** 记录编号 **/
	private String funcId;
	/** 所属功能模块编号 **/
	private String modId;

	/** 功能点名称 **/
	private String funcName;

	/** 功能点描述 **/
	private String funcDesc;

	/** URL链接 **/
	private String funcUrl;

	/** JS链接 **/
	private String funcUrlJs;

	/** CSS链接 **/
	private String funcUrlCss;

	/** 顺序 **/
	private Integer funcOrder;

	/** 图标 **/
	private String funcIcon;

	/** 最新变更用户 **/
	private String lastChgUsr;

	/** 最新变更时间 **/
	private String lastChgDt;

	/**
	 * @param funcId
	 */
	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	/**
	 * @return funcId
	 */
	public String getFuncId() {
		return this.funcId;
	}

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

	/**
	 * @param funcName
	 */
	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}

	/**
	 * @return funcName
	 */
	public String getFuncName() {
		return this.funcName;
	}

	/**
	 * @param funcDesc
	 */
	public void setFuncDesc(String funcDesc) {
		this.funcDesc = funcDesc;
	}

	/**
	 * @return funcDesc
	 */
	public String getFuncDesc() {
		return this.funcDesc;
	}

	/**
	 * @param funcUrl
	 */
	public void setFuncUrl(String funcUrl) {
		this.funcUrl = funcUrl;
	}

	/**
	 * @return funcUrl
	 */
	public String getFuncUrl() {
		return this.funcUrl;
	}

	/**
	 * @param funcUrlJs
	 */
	public void setFuncUrlJs(String funcUrlJs) {
		this.funcUrlJs = funcUrlJs;
	}

	/**
	 * @return funcUrlJs
	 */
	public String getFuncUrlJs() {
		return this.funcUrlJs;
	}

	/**
	 * @param funcUrlCss
	 */
	public void setFuncUrlCss(String funcUrlCss) {
		this.funcUrlCss = funcUrlCss;
	}

	/**
	 * @return funcUrlCss
	 */
	public String getFuncUrlCss() {
		return this.funcUrlCss;
	}

	/**
	 * @param funcOrder
	 */
	public void setFuncOrder(Integer funcOrder) {
		this.funcOrder = funcOrder;
	}

	/**
	 * @return funcOrder
	 */
	public Integer getFuncOrder() {
		return this.funcOrder;
	}

	/**
	 * @param funcIcon
	 */
	public void setFuncIcon(String funcIcon) {
		this.funcIcon = funcIcon;
	}

	/**
	 * @return funcIcon
	 */
	public String getFuncIcon() {
		return this.funcIcon;
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