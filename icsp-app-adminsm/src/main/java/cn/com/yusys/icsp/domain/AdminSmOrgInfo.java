package cn.com.yusys.icsp.domain;

public class AdminSmOrgInfo {

	/** 内部机构号 **/
	private String orgId;

	/** 金融机构编号 **/
	private String instuId;

	/** 机构号 **/
	private String orgCode;

	/** 机构中文简称 **/
	private String orgName;

	/** 机构中文全称 **/
	private String orgFullName;

	/** 核算机构 **/
	private String checkOrgId;

	/** 上级机构记录编号 **/
	private String upOrgId;

	/** HR机构主键 **/
	private String orgHrId;

	/** 内部机构号 **/
	private String orgInCode;

	/** ORG_GRADE **/
	private String orgGrade;

	/** 机构类型：0：总行 1：支行 **/
	private String orgType;

	/** 机构类别 0-核算机构 1-网点机构 2-虚拟机构 **/
	private String orgCategory;

	/** 地址 **/
	private String orgAddr;

	/** 邮编 **/
	private String zipCde;

	/** 银行机构代码 **/
	private String bankOrgId;

	/** 金融许可证号 **/
	private String financialLicense;

	/** 营业执照号 **/
	private String businessLicense;

	/** 联系人 **/
	private String contUsr;

	/** 负责人职务 **/
	private String contDuty;

	/** 联系电话 **/
	private String contTel;

	/** 区域 **/
	private String area;

	/** 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效 **/
	private String orgSts;

	/** 成立时间 **/
	private String establishTime;

	/** 机构工作开始时间 **/
	private String workStartTime;

	/** 机构工作终止时间 **/
	private String workEndTime;

	/** 所有父机构 **/
	private String orgParents;

	/** 最新变更用户 **/
	private String lastChgUsr;

	/** 最新变更时间 **/
	private String lastChgDt;

	/**
	 * 
	 */
	public AdminSmOrgInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getInstuId() {
		return instuId;
	}

	public void setInstuId(String instuId) {
		this.instuId = instuId;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getOrgFullName() {
		return orgFullName;
	}

	public void setOrgFullName(String orgFullName) {
		this.orgFullName = orgFullName;
	}

	public String getCheckOrgId() {
		return checkOrgId;
	}

	public void setCheckOrgId(String checkOrgId) {
		this.checkOrgId = checkOrgId;
	}

	public String getUpOrgId() {
		return upOrgId;
	}

	public void setUpOrgId(String upOrgId) {
		this.upOrgId = upOrgId;
	}

	public String getOrgHrId() {
		return orgHrId;
	}

	public void setOrgHrId(String orgHrId) {
		this.orgHrId = orgHrId;
	}

	public String getOrgInCode() {
		return orgInCode;
	}

	public void setOrgInCode(String orgInCode) {
		this.orgInCode = orgInCode;
	}

	public String getOrgGrade() {
		return orgGrade;
	}

	public void setOrgGrade(String orgGrade) {
		this.orgGrade = orgGrade;
	}

	public String getOrgType() {
		return orgType;
	}

	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}

	public String getOrgCategory() {
		return orgCategory;
	}

	public void setOrgCategory(String orgCategory) {
		this.orgCategory = orgCategory;
	}

	public String getOrgAddr() {
		return orgAddr;
	}

	public void setOrgAddr(String orgAddr) {
		this.orgAddr = orgAddr;
	}

	public String getZipCde() {
		return zipCde;
	}

	public void setZipCde(String zipCde) {
		this.zipCde = zipCde;
	}

	public String getBankOrgId() {
		return bankOrgId;
	}

	public void setBankOrgId(String bankOrgId) {
		this.bankOrgId = bankOrgId;
	}

	public String getFinancialLicense() {
		return financialLicense;
	}

	public void setFinancialLicense(String financialLicense) {
		this.financialLicense = financialLicense;
	}

	public String getBusinessLicense() {
		return businessLicense;
	}

	public void setBusinessLicense(String businessLicense) {
		this.businessLicense = businessLicense;
	}

	public String getContUsr() {
		return contUsr;
	}

	public void setContUsr(String contUsr) {
		this.contUsr = contUsr;
	}

	public String getContDuty() {
		return contDuty;
	}

	public void setContDuty(String contDuty) {
		this.contDuty = contDuty;
	}

	public String getContTel() {
		return contTel;
	}

	public void setContTel(String contTel) {
		this.contTel = contTel;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getOrgSts() {
		return orgSts;
	}

	public void setOrgSts(String orgSts) {
		this.orgSts = orgSts;
	}

	public String getEstablishTime() {
		return establishTime;
	}

	public void setEstablishTime(String establishTime) {
		this.establishTime = establishTime;
	}

	public String getWorkStartTime() {
		return workStartTime;
	}

	public void setWorkStartTime(String workStartTime) {
		this.workStartTime = workStartTime;
	}

	public String getWorkEndTime() {
		return workEndTime;
	}

	public void setWorkEndTime(String workEndTime) {
		this.workEndTime = workEndTime;
	}

	public String getOrgParents() {
		return orgParents;
	}

	public void setOrgParents(String orgParents) {
		this.orgParents = orgParents;
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