package cn.com.yusys.icsp.adminsm.domain;

import java.io.Serializable;
import java.util.Date;

import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 金融机构表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-02-25 02:38:28
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
	 * @param instuId
	 */
	public void setInstuId(String instuId) {
		this.instuId = instuId;
	}

	/**
	 * @return instuId
	 */
	public String getInstuId() {
		return this.instuId;
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
	 * @param instuCde
	 */
	public void setInstuCde(String instuCde) {
		this.instuCde = instuCde;
	}

	/**
	 * @return instuCde
	 */
	public String getInstuCde() {
		return this.instuCde;
	}
	/**
	 * @param instuName
	 */
	public void setInstuName(String instuName) {
		this.instuName = instuName;
	}

	/**
	 * @return instuName
	 */
	public String getInstuName() {
		return this.instuName;
	}
	/**
	 * @param joinDt
	 */
	public void setJoinDt(String joinDt) {
		this.joinDt = joinDt;
	}

	/**
	 * @return joinDt
	 */
	public String getJoinDt() {
		return this.joinDt;
	}
	/**
	 * @param instuAddr
	 */
	public void setInstuAddr(String instuAddr) {
		this.instuAddr = instuAddr;
	}

	/**
	 * @return instuAddr
	 */
	public String getInstuAddr() {
		return this.instuAddr;
	}
	/**
	 * @param zipCde
	 */
	public void setZipCde(String zipCde) {
		this.zipCde = zipCde;
	}

	/**
	 * @return zipCde
	 */
	public String getZipCde() {
		return this.zipCde;
	}
	/**
	 * @param contTel
	 */
	public void setContTel(String contTel) {
		this.contTel = contTel;
	}

	/**
	 * @return contTel
	 */
	public String getContTel() {
		return this.contTel;
	}
	/**
	 * @param contUsr
	 */
	public void setContUsr(String contUsr) {
		this.contUsr = contUsr;
	}

	/**
	 * @return contUsr
	 */
	public String getContUsr() {
		return this.contUsr;
	}
	/**
	 * @param instuSts
	 */
	public void setInstuSts(String instuSts) {
		this.instuSts = instuSts;
	}

	/**
	 * @return instuSts
	 */
	public String getInstuSts() {
		return this.instuSts;
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
