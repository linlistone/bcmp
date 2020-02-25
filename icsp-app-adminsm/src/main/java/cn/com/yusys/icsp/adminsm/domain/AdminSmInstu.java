package cn.com.yusys.icsp.adminsm.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 金融机构表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 16:47:36
 */
//TableName("admin_sm_instu")
public class AdminSmInstu extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 记录编号
	 *	pk
	 */
	private String instuId;
   /**
	 * 逻辑系统记录编号
	 */
	private String sysId;
   /**
	 * 金融机构代码
	 */
	private String instuCde;
   /**
	 * 金融机构名称
	 */
	private String instuName;
   /**
	 * 进入日期
	 */
	private String joinDt;
   /**
	 * 地址
	 */
	private String instuAddr;
   /**
	 * 邮编
	 */
	private String zipCde;
   /**
	 * 联系电话
	 */
	private String contTel;
   /**
	 * 联系人
	 */
	private String contUsr;
   /**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 */
	private String instuSts;
   /**
	 * 最新变更用户
	 */
	private String lastChgUsr;
   /**
	 * 最新变更时间
	 */
	private String lastChgDt;
	
	/**
	 * 记录编号
	 * @param instuId
	 */
	public void setInstuId(String instuId) {
		this.instuId = instuId;
	}

	/**
	 * 记录编号
	 * @return instuId
	 */
	public String getInstuId() {
		return this.instuId;
	}
	/**
	 * 逻辑系统记录编号
	 * @param sysId
	 */
	public void setSysId(String sysId) {
		this.sysId = sysId;
	}

	/**
	 * 逻辑系统记录编号
	 * @return sysId
	 */
	public String getSysId() {
		return this.sysId;
	}
	/**
	 * 金融机构代码
	 * @param instuCde
	 */
	public void setInstuCde(String instuCde) {
		this.instuCde = instuCde;
	}

	/**
	 * 金融机构代码
	 * @return instuCde
	 */
	public String getInstuCde() {
		return this.instuCde;
	}
	/**
	 * 金融机构名称
	 * @param instuName
	 */
	public void setInstuName(String instuName) {
		this.instuName = instuName;
	}

	/**
	 * 金融机构名称
	 * @return instuName
	 */
	public String getInstuName() {
		return this.instuName;
	}
	/**
	 * 进入日期
	 * @param joinDt
	 */
	public void setJoinDt(String joinDt) {
		this.joinDt = joinDt;
	}

	/**
	 * 进入日期
	 * @return joinDt
	 */
	public String getJoinDt() {
		return this.joinDt;
	}
	/**
	 * 地址
	 * @param instuAddr
	 */
	public void setInstuAddr(String instuAddr) {
		this.instuAddr = instuAddr;
	}

	/**
	 * 地址
	 * @return instuAddr
	 */
	public String getInstuAddr() {
		return this.instuAddr;
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
	 * 联系电话
	 * @param contTel
	 */
	public void setContTel(String contTel) {
		this.contTel = contTel;
	}

	/**
	 * 联系电话
	 * @return contTel
	 */
	public String getContTel() {
		return this.contTel;
	}
	/**
	 * 联系人
	 * @param contUsr
	 */
	public void setContUsr(String contUsr) {
		this.contUsr = contUsr;
	}

	/**
	 * 联系人
	 * @return contUsr
	 */
	public String getContUsr() {
		return this.contUsr;
	}
	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @param instuSts
	 */
	public void setInstuSts(String instuSts) {
		this.instuSts = instuSts;
	}

	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @return instuSts
	 */
	public String getInstuSts() {
		return this.instuSts;
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
		strBuf.append("AdminSmInstu[");
		strBuf.append("instuId=").append(instuId).append(",");
		strBuf.append("sysId=").append(sysId).append(",");
		strBuf.append("instuCde=").append(instuCde).append(",");
		strBuf.append("instuName=").append(instuName).append(",");
		strBuf.append("joinDt=").append(joinDt).append(",");
		strBuf.append("instuAddr=").append(instuAddr).append(",");
		strBuf.append("zipCde=").append(zipCde).append(",");
		strBuf.append("contTel=").append(contTel).append(",");
		strBuf.append("contUsr=").append(contUsr).append(",");
		strBuf.append("instuSts=").append(instuSts).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
