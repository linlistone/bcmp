package cn.com.yusys.icsp.adminsm.domain;

public class AdminSmUser {

	private String userId;

	private String certNo;

	private String certType;

	private String deadline;

	private String dptId;

	private String entrantsDate;

	private String financialJobTime;

	private String lastChgDt;

	private String lastChgUsr;

	private String lastEditPassTime;

	private String lastLoginTime;

	private String loginCode;

	private String offenIp;

	private String orgId;

	private String positionDegree;

	private String positionTime;

	private String userAvatar;

	private String userBirthday;

	private String userCertificate;

	private String userCode;

	private String userEducation;

	private String userEmail;

	private String userMobilephone;

	private String userName;

	private String userOfficetel;

	private String userPassword;

	private String userPasswordMd5;

	private String userSex;

	private String userSts;

	private String isBusiness;

	/**
	 * 
	 */
	public AdminSmUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCertNo() {
		return certNo;
	}

	public void setCertNo(String certNo) {
		this.certNo = certNo;
	}

	public String getCertType() {
		return certType;
	}

	public void setCertType(String certType) {
		this.certType = certType;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getDptId() {
		return dptId;
	}

	public void setDptId(String dptId) {
		this.dptId = dptId;
	}

	public String getEntrantsDate() {
		return entrantsDate;
	}

	public void setEntrantsDate(String entrantsDate) {
		this.entrantsDate = entrantsDate;
	}

	public String getFinancialJobTime() {
		return financialJobTime;
	}

	public void setFinancialJobTime(String financialJobTime) {
		this.financialJobTime = financialJobTime;
	}

	public String getLastChgDt() {
		return lastChgDt;
	}

	public void setLastChgDt(String lastChgDt) {
		this.lastChgDt = lastChgDt;
	}

	public String getLastChgUsr() {
		return lastChgUsr;
	}

	public void setLastChgUsr(String lastChgUsr) {
		this.lastChgUsr = lastChgUsr;
	}

	public String getLastEditPassTime() {
		return lastEditPassTime;
	}

	public void setLastEditPassTime(String lastEditPassTime) {
		this.lastEditPassTime = lastEditPassTime;
	}

	public String getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(String lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public String getLoginCode() {
		return loginCode;
	}

	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}

	public String getOffenIp() {
		return offenIp;
	}

	public void setOffenIp(String offenIp) {
		this.offenIp = offenIp;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getPositionDegree() {
		return positionDegree;
	}

	public void setPositionDegree(String positionDegree) {
		this.positionDegree = positionDegree;
	}

	public String getPositionTime() {
		return positionTime;
	}

	public void setPositionTime(String positionTime) {
		this.positionTime = positionTime;
	}

	public String getUserAvatar() {
		return userAvatar;
	}

	public void setUserAvatar(String userAvatar) {
		this.userAvatar = userAvatar;
	}

	public String getUserBirthday() {
		return userBirthday;
	}

	public void setUserBirthday(String userBirthday) {
		this.userBirthday = userBirthday;
	}

	public String getUserCertificate() {
		return userCertificate;
	}

	public void setUserCertificate(String userCertificate) {
		this.userCertificate = userCertificate;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getUserEducation() {
		return userEducation;
	}

	public void setUserEducation(String userEducation) {
		this.userEducation = userEducation;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserMobilephone() {
		return userMobilephone;
	}

	public void setUserMobilephone(String userMobilephone) {
		this.userMobilephone = userMobilephone;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserOfficetel() {
		return userOfficetel;
	}

	public void setUserOfficetel(String userOfficetel) {
		this.userOfficetel = userOfficetel;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserPasswordMd5() {
		return userPasswordMd5;
	}

	public void setUserPasswordMd5(String userPasswordMd5) {
		this.userPasswordMd5 = userPasswordMd5;
	}

	public String getUserSex() {
		return userSex;
	}

	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}

	public String getUserSts() {
		return userSts;
	}

	public void setUserSts(String userSts) {
		this.userSts = userSts;
	}

	public String getIsBusiness() {
		return isBusiness;
	}

	public void setIsBusiness(String isBusiness) {
		this.isBusiness = isBusiness;
	}
	
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("[");
		strBuf.append("isBusiness=").append(isBusiness).append(",");
		strBuf.append("]");
		return strBuf.toString();
	}

}