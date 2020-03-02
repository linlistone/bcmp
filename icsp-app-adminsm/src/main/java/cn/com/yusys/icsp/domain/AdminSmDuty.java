package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 系统岗位表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-02 09:16:03
 */
//TableName("admin_sm_duty")
public class AdminSmDuty extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 记录编号
	 *	pk
	 */
	private String dutyId;
   /**
	 * 岗位代码
	 */
	private String dutyCde;
   /**
	 * 岗位名称
	 */
	private String dutyName;
   /**
	 * 所属机构编号
	 */
	private String belongOrgId;
   /**
	 * 备注
	 */
	private String dutyRemark;
   /**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 */
	private String dutySts;
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
	 * @param dutyId
	 */
	public void setDutyId(String dutyId) {
		this.dutyId = dutyId;
	}

	/**
	 * 记录编号
	 * @return dutyId
	 */
	public String getDutyId() {
		return this.dutyId;
	}
	/**
	 * 岗位代码
	 * @param dutyCde
	 */
	public void setDutyCde(String dutyCde) {
		this.dutyCde = dutyCde;
	}

	/**
	 * 岗位代码
	 * @return dutyCde
	 */
	public String getDutyCde() {
		return this.dutyCde;
	}
	/**
	 * 岗位名称
	 * @param dutyName
	 */
	public void setDutyName(String dutyName) {
		this.dutyName = dutyName;
	}

	/**
	 * 岗位名称
	 * @return dutyName
	 */
	public String getDutyName() {
		return this.dutyName;
	}
	/**
	 * 所属机构编号
	 * @param belongOrgId
	 */
	public void setBelongOrgId(String belongOrgId) {
		this.belongOrgId = belongOrgId;
	}

	/**
	 * 所属机构编号
	 * @return belongOrgId
	 */
	public String getBelongOrgId() {
		return this.belongOrgId;
	}
	/**
	 * 备注
	 * @param dutyRemark
	 */
	public void setDutyRemark(String dutyRemark) {
		this.dutyRemark = dutyRemark;
	}

	/**
	 * 备注
	 * @return dutyRemark
	 */
	public String getDutyRemark() {
		return this.dutyRemark;
	}
	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @param dutySts
	 */
	public void setDutySts(String dutySts) {
		this.dutySts = dutySts;
	}

	/**
	 * 状态：对应字典项=NORM_STS A：生效 I：失效 W：待生效
	 * @return dutySts
	 */
	public String getDutySts() {
		return this.dutySts;
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
		strBuf.append("AdminSmDuty[");
		strBuf.append("dutyId=").append(dutyId).append(",");
		strBuf.append("dutyCde=").append(dutyCde).append(",");
		strBuf.append("dutyName=").append(dutyName).append(",");
		strBuf.append("belongOrgId=").append(belongOrgId).append(",");
		strBuf.append("dutyRemark=").append(dutyRemark).append(",");
		strBuf.append("dutySts=").append(dutySts).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
