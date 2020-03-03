package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 系统用户表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-02 17:23:53
 */
public class AdminSmUser extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 记录编号
	 *	pk
	 */
	private String userId;
   /**
	 * 登录代码
	 */
	private String loginCode;
   /**
	 * 姓名
	 */
	private String userName;
   /**
	 * 验证方式 0密码1本地指纹2远程指纹
	 */
	private String loginType;
   /**
	 * 证件类型
	 */
	private String certType;
   /**
	 * 证件号码
	 */
	private String certNo;
   /**
	 * 员工号
	 */
	private String userCode;
   /**
	 * 有效期到
	 */
	private String deadline;
   /**
	 * 所属机构编号
	 */
	private String orgId;
   /**
	 * 所属部门编号
	 */
	private String dptId;
   /**
	 * 密码
	 */
	private String userPassword;
   /**
	 * MD5密码
	 */
	private String userPasswordMd5;
   /**
	 * 是否业务相关 0-相关 1-不相关
	 */
	private String isBusiness;
   /**
	 * 性别
	 */
	private String userSex;
   /**
	 * 生日
	 */
	private String userBirthday;
   /**
	 * 邮箱
	 */
	private String userEmail;
   /**
	 * 移动电话
	 */
	private String userMobilephone;
   /**
	 * 办公电话
	 */
	private String userOfficetel;
   /**
	 * 学历
	 */
	private String userEducation;
   /**
	 * 资格证书
	 */
	private String userCertificate;
   /**
	 * 入职日期
	 */
	private String entrantsDate;
   /**
	 * 任职时间
	 */
	private String positionTime;
   /**
	 * 从业时间
	 */
	private String financialJobTime;
   /**
	 * 职级
	 */
	private String positionDegree;
   /**
	 * 用户头像
	 */
	private String userAvatar;
   /**
	 * 常用IP，逗号分隔
	 */
	private String offenIp;
   /**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 */
	private String userSts;
   /**
	 * 最近登录时间
	 */
	private String lastLoginTime;
   /**
	 * 最近一次修改密码时间
	 */
	private String lastEditPassTime;
   /**
	 * 最新变更用户
	 */
	private String lastChgUsr;
   /**
	 * 最新变更时间
	 */
	private String lastChgDt;
   /**
	 * 头像地址
	 */
	private String headPort;
   /**
	 * 指纹信息
	 */
	private String fingerPrint;
   /**
	 * 声纹信息
	 */
	private String voicePrint;
   /**
	 * 面部信息
	 */
	private String facePrint;
   /**
	 * 手势密码
	 */
	private String gesturePassword;
	
	/**
	 * 记录编号
	 * @param userId
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * 记录编号
	 * @return userId
	 */
	public String getUserId() {
		return this.userId;
	}
	/**
	 * 登录代码
	 * @param loginCode
	 */
	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}

	/**
	 * 登录代码
	 * @return loginCode
	 */
	public String getLoginCode() {
		return this.loginCode;
	}
	/**
	 * 姓名
	 * @param userName
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * 姓名
	 * @return userName
	 */
	public String getUserName() {
		return this.userName;
	}
	/**
	 * 验证方式 0密码1本地指纹2远程指纹
	 * @param loginType
	 */
	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	/**
	 * 验证方式 0密码1本地指纹2远程指纹
	 * @return loginType
	 */
	public String getLoginType() {
		return this.loginType;
	}
	/**
	 * 证件类型
	 * @param certType
	 */
	public void setCertType(String certType) {
		this.certType = certType;
	}

	/**
	 * 证件类型
	 * @return certType
	 */
	public String getCertType() {
		return this.certType;
	}
	/**
	 * 证件号码
	 * @param certNo
	 */
	public void setCertNo(String certNo) {
		this.certNo = certNo;
	}

	/**
	 * 证件号码
	 * @return certNo
	 */
	public String getCertNo() {
		return this.certNo;
	}
	/**
	 * 员工号
	 * @param userCode
	 */
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	/**
	 * 员工号
	 * @return userCode
	 */
	public String getUserCode() {
		return this.userCode;
	}
	/**
	 * 有效期到
	 * @param deadline
	 */
	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	/**
	 * 有效期到
	 * @return deadline
	 */
	public String getDeadline() {
		return this.deadline;
	}
	/**
	 * 所属机构编号
	 * @param orgId
	 */
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	/**
	 * 所属机构编号
	 * @return orgId
	 */
	public String getOrgId() {
		return this.orgId;
	}
	/**
	 * 所属部门编号
	 * @param dptId
	 */
	public void setDptId(String dptId) {
		this.dptId = dptId;
	}

	/**
	 * 所属部门编号
	 * @return dptId
	 */
	public String getDptId() {
		return this.dptId;
	}
	/**
	 * 密码
	 * @param userPassword
	 */
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	/**
	 * 密码
	 * @return userPassword
	 */
	public String getUserPassword() {
		return this.userPassword;
	}
	/**
	 * MD5密码
	 * @param userPasswordMd5
	 */
	public void setUserPasswordMd5(String userPasswordMd5) {
		this.userPasswordMd5 = userPasswordMd5;
	}

	/**
	 * MD5密码
	 * @return userPasswordMd5
	 */
	public String getUserPasswordMd5() {
		return this.userPasswordMd5;
	}
	/**
	 * 是否业务相关 0-相关 1-不相关
	 * @param isBusiness
	 */
	public void setIsBusiness(String isBusiness) {
		this.isBusiness = isBusiness;
	}

	/**
	 * 是否业务相关 0-相关 1-不相关
	 * @return isBusiness
	 */
	public String getIsBusiness() {
		return this.isBusiness;
	}
	/**
	 * 性别
	 * @param userSex
	 */
	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}

	/**
	 * 性别
	 * @return userSex
	 */
	public String getUserSex() {
		return this.userSex;
	}
	/**
	 * 生日
	 * @param userBirthday
	 */
	public void setUserBirthday(String userBirthday) {
		this.userBirthday = userBirthday;
	}

	/**
	 * 生日
	 * @return userBirthday
	 */
	public String getUserBirthday() {
		return this.userBirthday;
	}
	/**
	 * 邮箱
	 * @param userEmail
	 */
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	/**
	 * 邮箱
	 * @return userEmail
	 */
	public String getUserEmail() {
		return this.userEmail;
	}
	/**
	 * 移动电话
	 * @param userMobilephone
	 */
	public void setUserMobilephone(String userMobilephone) {
		this.userMobilephone = userMobilephone;
	}

	/**
	 * 移动电话
	 * @return userMobilephone
	 */
	public String getUserMobilephone() {
		return this.userMobilephone;
	}
	/**
	 * 办公电话
	 * @param userOfficetel
	 */
	public void setUserOfficetel(String userOfficetel) {
		this.userOfficetel = userOfficetel;
	}

	/**
	 * 办公电话
	 * @return userOfficetel
	 */
	public String getUserOfficetel() {
		return this.userOfficetel;
	}
	/**
	 * 学历
	 * @param userEducation
	 */
	public void setUserEducation(String userEducation) {
		this.userEducation = userEducation;
	}

	/**
	 * 学历
	 * @return userEducation
	 */
	public String getUserEducation() {
		return this.userEducation;
	}
	/**
	 * 资格证书
	 * @param userCertificate
	 */
	public void setUserCertificate(String userCertificate) {
		this.userCertificate = userCertificate;
	}

	/**
	 * 资格证书
	 * @return userCertificate
	 */
	public String getUserCertificate() {
		return this.userCertificate;
	}
	/**
	 * 入职日期
	 * @param entrantsDate
	 */
	public void setEntrantsDate(String entrantsDate) {
		this.entrantsDate = entrantsDate;
	}

	/**
	 * 入职日期
	 * @return entrantsDate
	 */
	public String getEntrantsDate() {
		return this.entrantsDate;
	}
	/**
	 * 任职时间
	 * @param positionTime
	 */
	public void setPositionTime(String positionTime) {
		this.positionTime = positionTime;
	}

	/**
	 * 任职时间
	 * @return positionTime
	 */
	public String getPositionTime() {
		return this.positionTime;
	}
	/**
	 * 从业时间
	 * @param financialJobTime
	 */
	public void setFinancialJobTime(String financialJobTime) {
		this.financialJobTime = financialJobTime;
	}

	/**
	 * 从业时间
	 * @return financialJobTime
	 */
	public String getFinancialJobTime() {
		return this.financialJobTime;
	}
	/**
	 * 职级
	 * @param positionDegree
	 */
	public void setPositionDegree(String positionDegree) {
		this.positionDegree = positionDegree;
	}

	/**
	 * 职级
	 * @return positionDegree
	 */
	public String getPositionDegree() {
		return this.positionDegree;
	}
	/**
	 * 用户头像
	 * @param userAvatar
	 */
	public void setUserAvatar(String userAvatar) {
		this.userAvatar = userAvatar;
	}

	/**
	 * 用户头像
	 * @return userAvatar
	 */
	public String getUserAvatar() {
		return this.userAvatar;
	}
	/**
	 * 常用IP，逗号分隔
	 * @param offenIp
	 */
	public void setOffenIp(String offenIp) {
		this.offenIp = offenIp;
	}

	/**
	 * 常用IP，逗号分隔
	 * @return offenIp
	 */
	public String getOffenIp() {
		return this.offenIp;
	}
	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @param userSts
	 */
	public void setUserSts(String userSts) {
		this.userSts = userSts;
	}

	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @return userSts
	 */
	public String getUserSts() {
		return this.userSts;
	}
	/**
	 * 最近登录时间
	 * @param lastLoginTime
	 */
	public void setLastLoginTime(String lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	/**
	 * 最近登录时间
	 * @return lastLoginTime
	 */
	public String getLastLoginTime() {
		return this.lastLoginTime;
	}
	/**
	 * 最近一次修改密码时间
	 * @param lastEditPassTime
	 */
	public void setLastEditPassTime(String lastEditPassTime) {
		this.lastEditPassTime = lastEditPassTime;
	}

	/**
	 * 最近一次修改密码时间
	 * @return lastEditPassTime
	 */
	public String getLastEditPassTime() {
		return this.lastEditPassTime;
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
	 * 头像地址
	 * @param headPort
	 */
	public void setHeadPort(String headPort) {
		this.headPort = headPort;
	}

	/**
	 * 头像地址
	 * @return headPort
	 */
	public String getHeadPort() {
		return this.headPort;
	}
	/**
	 * 指纹信息
	 * @param fingerPrint
	 */
	public void setFingerPrint(String fingerPrint) {
		this.fingerPrint = fingerPrint;
	}

	/**
	 * 指纹信息
	 * @return fingerPrint
	 */
	public String getFingerPrint() {
		return this.fingerPrint;
	}
	/**
	 * 声纹信息
	 * @param voicePrint
	 */
	public void setVoicePrint(String voicePrint) {
		this.voicePrint = voicePrint;
	}

	/**
	 * 声纹信息
	 * @return voicePrint
	 */
	public String getVoicePrint() {
		return this.voicePrint;
	}
	/**
	 * 面部信息
	 * @param facePrint
	 */
	public void setFacePrint(String facePrint) {
		this.facePrint = facePrint;
	}

	/**
	 * 面部信息
	 * @return facePrint
	 */
	public String getFacePrint() {
		return this.facePrint;
	}
	/**
	 * 手势密码
	 * @param gesturePassword
	 */
	public void setGesturePassword(String gesturePassword) {
		this.gesturePassword = gesturePassword;
	}

	/**
	 * 手势密码
	 * @return gesturePassword
	 */
	public String getGesturePassword() {
		return this.gesturePassword;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("AdminSmUser[");
		strBuf.append("userId=").append(userId).append(",");
		strBuf.append("loginCode=").append(loginCode).append(",");
		strBuf.append("userName=").append(userName).append(",");
		strBuf.append("loginType=").append(loginType).append(",");
		strBuf.append("certType=").append(certType).append(",");
		strBuf.append("certNo=").append(certNo).append(",");
		strBuf.append("userCode=").append(userCode).append(",");
		strBuf.append("deadline=").append(deadline).append(",");
		strBuf.append("orgId=").append(orgId).append(",");
		strBuf.append("dptId=").append(dptId).append(",");
		strBuf.append("userPassword=").append(userPassword).append(",");
		strBuf.append("userPasswordMd5=").append(userPasswordMd5).append(",");
		strBuf.append("isBusiness=").append(isBusiness).append(",");
		strBuf.append("userSex=").append(userSex).append(",");
		strBuf.append("userBirthday=").append(userBirthday).append(",");
		strBuf.append("userEmail=").append(userEmail).append(",");
		strBuf.append("userMobilephone=").append(userMobilephone).append(",");
		strBuf.append("userOfficetel=").append(userOfficetel).append(",");
		strBuf.append("userEducation=").append(userEducation).append(",");
		strBuf.append("userCertificate=").append(userCertificate).append(",");
		strBuf.append("entrantsDate=").append(entrantsDate).append(",");
		strBuf.append("positionTime=").append(positionTime).append(",");
		strBuf.append("financialJobTime=").append(financialJobTime).append(",");
		strBuf.append("positionDegree=").append(positionDegree).append(",");
		strBuf.append("userAvatar=").append(userAvatar).append(",");
		strBuf.append("offenIp=").append(offenIp).append(",");
		strBuf.append("userSts=").append(userSts).append(",");
		strBuf.append("lastLoginTime=").append(lastLoginTime).append(",");
		strBuf.append("lastEditPassTime=").append(lastEditPassTime).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt).append(",");
		strBuf.append("headPort=").append(headPort).append(",");
		strBuf.append("fingerPrint=").append(fingerPrint).append(",");
		strBuf.append("voicePrint=").append(voicePrint).append(",");
		strBuf.append("facePrint=").append(facePrint).append(",");
		strBuf.append("gesturePassword=").append(gesturePassword);
		strBuf.append("]");
		return strBuf.toString();
	}
}
