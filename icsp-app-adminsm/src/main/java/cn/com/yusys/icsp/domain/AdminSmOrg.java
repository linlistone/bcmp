package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 系统机构表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-26 20:10:01
 */
//TableName("admin_sm_org")
public class AdminSmOrg extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 唯一机构id
	 *	pk
	 */
	private String orgId;
   /**
	 * 金融机构编号
	 */
	private String instuId;
   /**
	 * 机构号
	 */
	private String orgCode;
   /**
	 * 机构中文简称
	 */
	private String orgName;
   /**
	 * 机构中文全称
	 */
	private String orgFullName;
   /**
	 * 核算机构
	 */
	private String checkOrgId;
   /**
	 * 上级机构id
	 */
	private String upOrgId;
   /**
	 * HR机构主键
	 */
	private String orgHrId;
   /**
	 * 内部机构号
	 */
	private String orgInCode;
   /**
	 * 机构层级
	 */
	private String orgLevel;
   /**
	 * 机构层级
	 */
	private String orgGrade;
   /**
	 * 机构类型：0：总行 1：支行
	 */
	private String orgType;
   /**
	 * 机构类别 0-核算机构 1-网点机构 2-虚拟机构
	 */
	private String orgCategory;
   /**
	 * 省
	 */
	private String province;
   /**
	 * 市
	 */
	private String city;
   /**
	 * 区
	 */
	private String district;
   /**
	 * 街道
	 */
	private String street;
   /**
	 * 门牌地址
	 */
	private String addresses;
   /**
	 * 地址
	 */
	private String orgAddr;
   /**
	 * 邮编
	 */
	private String zipCde;
   /**
	 * 银行机构代码
	 */
	private String bankOrgId;
   /**
	 * 金融许可证号
	 */
	private String financialLicense;
   /**
	 * 营业执照号
	 */
	private String businessLicense;
   /**
	 * 负责人
	 */
	private String contUsr;
   /**
	 * 负责人职务
	 */
	private String contDuty;
   /**
	 * 负责人电话
	 */
	private String contTel;
   /**
	 * 其他联系方式
	 */
	private String contOther;
   /**
	 * 区域
	 */
	private String area;
   /**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 */
	private String orgSts;
   /**
	 * 成立时间
	 */
	private String establishTime;
   /**
	 * 机构工作开始时间
	 */
	private String workStartTime;
   /**
	 * 机构工作终止时间
	 */
	private String workEndTime;
   /**
	 * 所有父机构的orgCode
	 */
	private String orgParents;
   /**
	 * 最新变更用户
	 */
	private String lastChgUsr;
   /**
	 * 最新变更时间
	 */
	private String lastChgDt;
	
	/**
	 * 唯一机构id
	 * @param orgId
	 */
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	/**
	 * 唯一机构id
	 * @return orgId
	 */
	public String getOrgId() {
		return this.orgId;
	}
	/**
	 * 金融机构编号
	 * @param instuId
	 */
	public void setInstuId(String instuId) {
		this.instuId = instuId;
	}

	/**
	 * 金融机构编号
	 * @return instuId
	 */
	public String getInstuId() {
		return this.instuId;
	}
	/**
	 * 机构号
	 * @param orgCode
	 */
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	/**
	 * 机构号
	 * @return orgCode
	 */
	public String getOrgCode() {
		return this.orgCode;
	}
	/**
	 * 机构中文简称
	 * @param orgName
	 */
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	/**
	 * 机构中文简称
	 * @return orgName
	 */
	public String getOrgName() {
		return this.orgName;
	}
	/**
	 * 机构中文全称
	 * @param orgFullName
	 */
	public void setOrgFullName(String orgFullName) {
		this.orgFullName = orgFullName;
	}

	/**
	 * 机构中文全称
	 * @return orgFullName
	 */
	public String getOrgFullName() {
		return this.orgFullName;
	}
	/**
	 * 核算机构
	 * @param checkOrgId
	 */
	public void setCheckOrgId(String checkOrgId) {
		this.checkOrgId = checkOrgId;
	}

	/**
	 * 核算机构
	 * @return checkOrgId
	 */
	public String getCheckOrgId() {
		return this.checkOrgId;
	}
	/**
	 * 上级机构id
	 * @param upOrgId
	 */
	public void setUpOrgId(String upOrgId) {
		this.upOrgId = upOrgId;
	}

	/**
	 * 上级机构id
	 * @return upOrgId
	 */
	public String getUpOrgId() {
		return this.upOrgId;
	}
	/**
	 * HR机构主键
	 * @param orgHrId
	 */
	public void setOrgHrId(String orgHrId) {
		this.orgHrId = orgHrId;
	}

	/**
	 * HR机构主键
	 * @return orgHrId
	 */
	public String getOrgHrId() {
		return this.orgHrId;
	}
	/**
	 * 内部机构号
	 * @param orgInCode
	 */
	public void setOrgInCode(String orgInCode) {
		this.orgInCode = orgInCode;
	}

	/**
	 * 内部机构号
	 * @return orgInCode
	 */
	public String getOrgInCode() {
		return this.orgInCode;
	}
	/**
	 * 机构层级
	 * @param orgLevel
	 */
	public void setOrgLevel(String orgLevel) {
		this.orgLevel = orgLevel;
	}

	/**
	 * 机构层级
	 * @return orgLevel
	 */
	public String getOrgLevel() {
		return this.orgLevel;
	}
	/**
	 * 机构层级
	 * @param orgGrade
	 */
	public void setOrgGrade(String orgGrade) {
		this.orgGrade = orgGrade;
	}

	/**
	 * 机构层级
	 * @return orgGrade
	 */
	public String getOrgGrade() {
		return this.orgGrade;
	}
	/**
	 * 机构类型：0：总行 1：支行
	 * @param orgType
	 */
	public void setOrgType(String orgType) {
		this.orgType = orgType;
	}

	/**
	 * 机构类型：0：总行 1：支行
	 * @return orgType
	 */
	public String getOrgType() {
		return this.orgType;
	}
	/**
	 * 机构类别 0-核算机构 1-网点机构 2-虚拟机构
	 * @param orgCategory
	 */
	public void setOrgCategory(String orgCategory) {
		this.orgCategory = orgCategory;
	}

	/**
	 * 机构类别 0-核算机构 1-网点机构 2-虚拟机构
	 * @return orgCategory
	 */
	public String getOrgCategory() {
		return this.orgCategory;
	}
	/**
	 * 省
	 * @param province
	 */
	public void setProvince(String province) {
		this.province = province;
	}

	/**
	 * 省
	 * @return province
	 */
	public String getProvince() {
		return this.province;
	}
	/**
	 * 市
	 * @param city
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * 市
	 * @return city
	 */
	public String getCity() {
		return this.city;
	}
	/**
	 * 区
	 * @param district
	 */
	public void setDistrict(String district) {
		this.district = district;
	}

	/**
	 * 区
	 * @return district
	 */
	public String getDistrict() {
		return this.district;
	}
	/**
	 * 街道
	 * @param street
	 */
	public void setStreet(String street) {
		this.street = street;
	}

	/**
	 * 街道
	 * @return street
	 */
	public String getStreet() {
		return this.street;
	}
	/**
	 * 门牌地址
	 * @param addresses
	 */
	public void setAddresses(String addresses) {
		this.addresses = addresses;
	}

	/**
	 * 门牌地址
	 * @return addresses
	 */
	public String getAddresses() {
		return this.addresses;
	}
	/**
	 * 地址
	 * @param orgAddr
	 */
	public void setOrgAddr(String orgAddr) {
		this.orgAddr = orgAddr;
	}

	/**
	 * 地址
	 * @return orgAddr
	 */
	public String getOrgAddr() {
		return this.orgAddr;
	}
	/**
	 * 邮编
	 * @param zipCde
	 */
	public void setZipCde(String zipCde) {
		this.zipCde = zipCde;
	}

	/**
	 * 邮编
	 * @return zipCde
	 */
	public String getZipCde() {
		return this.zipCde;
	}
	/**
	 * 银行机构代码
	 * @param bankOrgId
	 */
	public void setBankOrgId(String bankOrgId) {
		this.bankOrgId = bankOrgId;
	}

	/**
	 * 银行机构代码
	 * @return bankOrgId
	 */
	public String getBankOrgId() {
		return this.bankOrgId;
	}
	/**
	 * 金融许可证号
	 * @param financialLicense
	 */
	public void setFinancialLicense(String financialLicense) {
		this.financialLicense = financialLicense;
	}

	/**
	 * 金融许可证号
	 * @return financialLicense
	 */
	public String getFinancialLicense() {
		return this.financialLicense;
	}
	/**
	 * 营业执照号
	 * @param businessLicense
	 */
	public void setBusinessLicense(String businessLicense) {
		this.businessLicense = businessLicense;
	}

	/**
	 * 营业执照号
	 * @return businessLicense
	 */
	public String getBusinessLicense() {
		return this.businessLicense;
	}
	/**
	 * 负责人
	 * @param contUsr
	 */
	public void setContUsr(String contUsr) {
		this.contUsr = contUsr;
	}

	/**
	 * 负责人
	 * @return contUsr
	 */
	public String getContUsr() {
		return this.contUsr;
	}
	/**
	 * 负责人职务
	 * @param contDuty
	 */
	public void setContDuty(String contDuty) {
		this.contDuty = contDuty;
	}

	/**
	 * 负责人职务
	 * @return contDuty
	 */
	public String getContDuty() {
		return this.contDuty;
	}
	/**
	 * 负责人电话
	 * @param contTel
	 */
	public void setContTel(String contTel) {
		this.contTel = contTel;
	}

	/**
	 * 负责人电话
	 * @return contTel
	 */
	public String getContTel() {
		return this.contTel;
	}
	/**
	 * 其他联系方式
	 * @param contOther
	 */
	public void setContOther(String contOther) {
		this.contOther = contOther;
	}

	/**
	 * 其他联系方式
	 * @return contOther
	 */
	public String getContOther() {
		return this.contOther;
	}
	/**
	 * 区域
	 * @param area
	 */
	public void setArea(String area) {
		this.area = area;
	}

	/**
	 * 区域
	 * @return area
	 */
	public String getArea() {
		return this.area;
	}
	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @param orgSts
	 */
	public void setOrgSts(String orgSts) {
		this.orgSts = orgSts;
	}

	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @return orgSts
	 */
	public String getOrgSts() {
		return this.orgSts;
	}
	/**
	 * 成立时间
	 * @param establishTime
	 */
	public void setEstablishTime(String establishTime) {
		this.establishTime = establishTime;
	}

	/**
	 * 成立时间
	 * @return establishTime
	 */
	public String getEstablishTime() {
		return this.establishTime;
	}
	/**
	 * 机构工作开始时间
	 * @param workStartTime
	 */
	public void setWorkStartTime(String workStartTime) {
		this.workStartTime = workStartTime;
	}

	/**
	 * 机构工作开始时间
	 * @return workStartTime
	 */
	public String getWorkStartTime() {
		return this.workStartTime;
	}
	/**
	 * 机构工作终止时间
	 * @param workEndTime
	 */
	public void setWorkEndTime(String workEndTime) {
		this.workEndTime = workEndTime;
	}

	/**
	 * 机构工作终止时间
	 * @return workEndTime
	 */
	public String getWorkEndTime() {
		return this.workEndTime;
	}
	/**
	 * 所有父机构的orgCode
	 * @param orgParents
	 */
	public void setOrgParents(String orgParents) {
		this.orgParents = orgParents;
	}

	/**
	 * 所有父机构的orgCode
	 * @return orgParents
	 */
	public String getOrgParents() {
		return this.orgParents;
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
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("AdminSmOrg[");
		strBuf.append("orgId=").append(orgId).append(",");
		strBuf.append("instuId=").append(instuId).append(",");
		strBuf.append("orgCode=").append(orgCode).append(",");
		strBuf.append("orgName=").append(orgName).append(",");
		strBuf.append("orgFullName=").append(orgFullName).append(",");
		strBuf.append("checkOrgId=").append(checkOrgId).append(",");
		strBuf.append("upOrgId=").append(upOrgId).append(",");
		strBuf.append("orgHrId=").append(orgHrId).append(",");
		strBuf.append("orgInCode=").append(orgInCode).append(",");
		strBuf.append("orgLevel=").append(orgLevel).append(",");
		strBuf.append("orgGrade=").append(orgGrade).append(",");
		strBuf.append("orgType=").append(orgType).append(",");
		strBuf.append("orgCategory=").append(orgCategory).append(",");
		strBuf.append("province=").append(province).append(",");
		strBuf.append("city=").append(city).append(",");
		strBuf.append("district=").append(district).append(",");
		strBuf.append("street=").append(street).append(",");
		strBuf.append("addresses=").append(addresses).append(",");
		strBuf.append("orgAddr=").append(orgAddr).append(",");
		strBuf.append("zipCde=").append(zipCde).append(",");
		strBuf.append("bankOrgId=").append(bankOrgId).append(",");
		strBuf.append("financialLicense=").append(financialLicense).append(",");
		strBuf.append("businessLicense=").append(businessLicense).append(",");
		strBuf.append("contUsr=").append(contUsr).append(",");
		strBuf.append("contDuty=").append(contDuty).append(",");
		strBuf.append("contTel=").append(contTel).append(",");
		strBuf.append("contOther=").append(contOther).append(",");
		strBuf.append("area=").append(area).append(",");
		strBuf.append("orgSts=").append(orgSts).append(",");
		strBuf.append("establishTime=").append(establishTime).append(",");
		strBuf.append("workStartTime=").append(workStartTime).append(",");
		strBuf.append("workEndTime=").append(workEndTime).append(",");
		strBuf.append("orgParents=").append(orgParents).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
