package cn.com.yusys.icsp.adminsm.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

/**
 * 部门表
 * @author linli
 *
 */
public class AdminsmDpt extends BaseDomain {

	/** 记录编号 **/
	private String dptId;
	/** 部门代码 **/
	private String dptCde;

	/** 部门名称 **/
	private String dptName;

	/** 所属机构编号 **/
	private String belongOrgId;

	/** 上级部门记录编号 **/
	private String upDptId;

	/** 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效 **/
	private String dptSts;

	/** 最新变更用户 **/
	private String lastChgUsr;

	/** 最新变更时间 **/
	private String lastChgDt;

	public String getDptId() {
		return dptId;
	}

	public void setDptId(String dptId) {
		this.dptId = dptId;
	}

	public String getDptCde() {
		return dptCde;
	}

	public void setDptCde(String dptCde) {
		this.dptCde = dptCde;
	}

	public String getDptName() {
		return dptName;
	}

	public void setDptName(String dptName) {
		this.dptName = dptName;
	}

	public String getBelongOrgId() {
		return belongOrgId;
	}

	public void setBelongOrgId(String belongOrgId) {
		this.belongOrgId = belongOrgId;
	}

	public String getUpDptId() {
		return upDptId;
	}

	public void setUpDptId(String upDptId) {
		this.upDptId = upDptId;
	}

	public String getDptSts() {
		return dptSts;
	}

	public void setDptSts(String dptSts) {
		this.dptSts = dptSts;
	}

	public String getLastChgUsr() {
		return lastChgUsr;
	}

	public void setLastChgUsr(String lastChgUsr) {
		this.lastChgUsr = lastChgUsr;
	}

	public String getLastChgDt() {
		return lastChgDt;
	}

	public void setLastChgDt(String lastChgDt) {
		this.lastChgDt = lastChgDt;
	}

}