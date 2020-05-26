package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * MEM_ TRADE_ IDEHTITY_INFO
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-05-23 16:50:09
 */
//TableName("mem_trade_identity_info")
public class MemTradeIdentityInfo extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 参与者交易ID
	 *	pk
	 */
	private String memTradeIdentityId;
   /**
	 * 参与者账号
	 */
	private String memAcctNum;
   /**
	 * 参与者全称
	 */
	private String memFname;
   /**
	 * 参与者简称
	 */
	private String memSname;
   /**
	 * 参与者英文全称
	 */
	private String memFnameEn;
   /**
	 * 参与者项文简称
	 */
	private String memSnameEn;
   /**
	 * 交易身份类型
	 */
	private String tradeIdentityType;
   /**
	 * 清算品种
	 */
	private String clearKind;
   /**
	 * 货币对
	 */
	private String ccyPair;
   /**
	 * 交易身份
	 */
	private String tradeIdentity;
   /**
	 * 备注

	 */
	private String remark;
   /**
	 * 生效日期
	 */
	private String effectDt;
   /**
	 * 注销日期 
	 */
	private String writeOffDt;
   /**
	 * 录入操作员编号
	 */
	private String inputOpepNum;
   /**
	 * 录入操作员姓名
	 */
	private String inputOperName;
   /**
	 * 录入时间
	 */
	private String inputTm;
   /**
	 * 更新操作编号
	 */
	private String updateOperNum;
   /**
	 * 更新操作员姓名
	 */
	private String updateOperName;
   /**
	 * 更并提时间
	 */
	private String updateTm;
	
	/**
	 * 参与者交易ID
	 * @param memTradeIdentityId
	 */
	public void setMemTradeIdentityId(String memTradeIdentityId) {
		this.memTradeIdentityId = memTradeIdentityId;
	}

	/**
	 * 参与者交易ID
	 * @return memTradeIdentityId
	 */
	public String getMemTradeIdentityId() {
		return this.memTradeIdentityId;
	}
	/**
	 * 参与者账号
	 * @param memAcctNum
	 */
	public void setMemAcctNum(String memAcctNum) {
		this.memAcctNum = memAcctNum;
	}

	/**
	 * 参与者账号
	 * @return memAcctNum
	 */
	public String getMemAcctNum() {
		return this.memAcctNum;
	}
	/**
	 * 参与者全称
	 * @param memFname
	 */
	public void setMemFname(String memFname) {
		this.memFname = memFname;
	}

	/**
	 * 参与者全称
	 * @return memFname
	 */
	public String getMemFname() {
		return this.memFname;
	}
	/**
	 * 参与者简称
	 * @param memSname
	 */
	public void setMemSname(String memSname) {
		this.memSname = memSname;
	}

	/**
	 * 参与者简称
	 * @return memSname
	 */
	public String getMemSname() {
		return this.memSname;
	}
	/**
	 * 参与者英文全称
	 * @param memFnameEn
	 */
	public void setMemFnameEn(String memFnameEn) {
		this.memFnameEn = memFnameEn;
	}

	/**
	 * 参与者英文全称
	 * @return memFnameEn
	 */
	public String getMemFnameEn() {
		return this.memFnameEn;
	}
	/**
	 * 参与者项文简称
	 * @param memSnameEn
	 */
	public void setMemSnameEn(String memSnameEn) {
		this.memSnameEn = memSnameEn;
	}

	/**
	 * 参与者项文简称
	 * @return memSnameEn
	 */
	public String getMemSnameEn() {
		return this.memSnameEn;
	}
	/**
	 * 交易身份类型
	 * @param tradeIdentityType
	 */
	public void setTradeIdentityType(String tradeIdentityType) {
		this.tradeIdentityType = tradeIdentityType;
	}

	/**
	 * 交易身份类型
	 * @return tradeIdentityType
	 */
	public String getTradeIdentityType() {
		return this.tradeIdentityType;
	}
	/**
	 * 清算品种
	 * @param clearKind
	 */
	public void setClearKind(String clearKind) {
		this.clearKind = clearKind;
	}

	/**
	 * 清算品种
	 * @return clearKind
	 */
	public String getClearKind() {
		return this.clearKind;
	}
	/**
	 * 货币对
	 * @param ccyPair
	 */
	public void setCcyPair(String ccyPair) {
		this.ccyPair = ccyPair;
	}

	/**
	 * 货币对
	 * @return ccyPair
	 */
	public String getCcyPair() {
		return this.ccyPair;
	}
	/**
	 * 交易身份
	 * @param tradeIdentity
	 */
	public void setTradeIdentity(String tradeIdentity) {
		this.tradeIdentity = tradeIdentity;
	}

	/**
	 * 交易身份
	 * @return tradeIdentity
	 */
	public String getTradeIdentity() {
		return this.tradeIdentity;
	}
	/**
	 * 备注

	 * @param remark
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}

	/**
	 * 备注

	 * @return remark
	 */
	public String getRemark() {
		return this.remark;
	}
	/**
	 * 生效日期
	 * @param effectDt
	 */
	public void setEffectDt(String effectDt) {
		this.effectDt = effectDt;
	}

	/**
	 * 生效日期
	 * @return effectDt
	 */
	public String getEffectDt() {
		return this.effectDt;
	}
	/**
	 * 注销日期 
	 * @param writeOffDt
	 */
	public void setWriteOffDt(String writeOffDt) {
		this.writeOffDt = writeOffDt;
	}

	/**
	 * 注销日期 
	 * @return writeOffDt
	 */
	public String getWriteOffDt() {
		return this.writeOffDt;
	}
	/**
	 * 录入操作员编号
	 * @param inputOpepNum
	 */
	public void setInputOpepNum(String inputOpepNum) {
		this.inputOpepNum = inputOpepNum;
	}

	/**
	 * 录入操作员编号
	 * @return inputOpepNum
	 */
	public String getInputOpepNum() {
		return this.inputOpepNum;
	}
	/**
	 * 录入操作员姓名
	 * @param inputOperName
	 */
	public void setInputOperName(String inputOperName) {
		this.inputOperName = inputOperName;
	}

	/**
	 * 录入操作员姓名
	 * @return inputOperName
	 */
	public String getInputOperName() {
		return this.inputOperName;
	}
	/**
	 * 录入时间
	 * @param inputTm
	 */
	public void setInputTm(String inputTm) {
		this.inputTm = inputTm;
	}

	/**
	 * 录入时间
	 * @return inputTm
	 */
	public String getInputTm() {
		return this.inputTm;
	}
	/**
	 * 更新操作编号
	 * @param updateOperNum
	 */
	public void setUpdateOperNum(String updateOperNum) {
		this.updateOperNum = updateOperNum;
	}

	/**
	 * 更新操作编号
	 * @return updateOperNum
	 */
	public String getUpdateOperNum() {
		return this.updateOperNum;
	}
	/**
	 * 更新操作员姓名
	 * @param updateOperName
	 */
	public void setUpdateOperName(String updateOperName) {
		this.updateOperName = updateOperName;
	}

	/**
	 * 更新操作员姓名
	 * @return updateOperName
	 */
	public String getUpdateOperName() {
		return this.updateOperName;
	}
	/**
	 * 更并提时间
	 * @param updateTm
	 */
	public void setUpdateTm(String updateTm) {
		this.updateTm = updateTm;
	}

	/**
	 * 更并提时间
	 * @return updateTm
	 */
	public String getUpdateTm() {
		return this.updateTm;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("MemTradeIdentityInfo[");
		strBuf.append("memTradeIdentityId=").append(memTradeIdentityId).append(",");
		strBuf.append("memAcctNum=").append(memAcctNum).append(",");
		strBuf.append("memFname=").append(memFname).append(",");
		strBuf.append("memSname=").append(memSname).append(",");
		strBuf.append("memFnameEn=").append(memFnameEn).append(",");
		strBuf.append("memSnameEn=").append(memSnameEn).append(",");
		strBuf.append("tradeIdentityType=").append(tradeIdentityType).append(",");
		strBuf.append("clearKind=").append(clearKind).append(",");
		strBuf.append("ccyPair=").append(ccyPair).append(",");
		strBuf.append("tradeIdentity=").append(tradeIdentity).append(",");
		strBuf.append("remark=").append(remark).append(",");
		strBuf.append("effectDt=").append(effectDt).append(",");
		strBuf.append("writeOffDt=").append(writeOffDt).append(",");
		strBuf.append("inputOpepNum=").append(inputOpepNum).append(",");
		strBuf.append("inputOperName=").append(inputOperName).append(",");
		strBuf.append("inputTm=").append(inputTm).append(",");
		strBuf.append("updateOperNum=").append(updateOperNum).append(",");
		strBuf.append("updateOperName=").append(updateOperName).append(",");
		strBuf.append("updateTm=").append(updateTm);
		strBuf.append("]");
		return strBuf.toString();
	}
}
