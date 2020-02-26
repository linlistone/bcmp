package cn.com.yusys.icsp.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import java.io.Serializable;


/**
 * 数据字典表
 * 
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:47:03
 */
//TableName("admin_sm_lookup")
public class AdminSmLookup extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

    /**
	 * 字典分类代码ID
	 *
	 *	pk
	 */
	private String lookupId;
    /**
	 * 法人机构ID
	 *
	 */
	private String instuId;
    /**
	 * 字典类别ID
	 *
	 */
	private String lookupTypeId;
    /**
	 * 字典类别英文代码
	 *
	 */
	private String lookupCode;
    /**
	 * 字典类别中文名称
	 *
	 */
	private String lookupName;
    /**
	 * 最后更新用户
	 *
	 */
	private String lastChgUsr;
    /**
	 * 最后更新时间
	 *
	 */
	private String lastChgDt;
	
	/**
	 * @param lookupId
	 */
	public void setLookupId(String lookupId) {
		this.lookupId = lookupId;
	}

	/**
	 * @return lookupId
	 */
	public String getLookupId() {
		return this.lookupId;
	}
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
	 * @param lookupTypeId
	 */
	public void setLookupTypeId(String lookupTypeId) {
		this.lookupTypeId = lookupTypeId;
	}

	/**
	 * @return lookupTypeId
	 */
	public String getLookupTypeId() {
		return this.lookupTypeId;
	}
	/**
	 * @param lookupCode
	 */
	public void setLookupCode(String lookupCode) {
		this.lookupCode = lookupCode;
	}

	/**
	 * @return lookupCode
	 */
	public String getLookupCode() {
		return this.lookupCode;
	}
	/**
	 * @param lookupName
	 */
	public void setLookupName(String lookupName) {
		this.lookupName = lookupName;
	}

	/**
	 * @return lookupName
	 */
	public String getLookupName() {
		return this.lookupName;
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
		strBuf.append("AdminSmLookup[");
		strBuf.append("lookupId=").append(lookupId).append(",");
		strBuf.append("instuId=").append(instuId).append(",");
		strBuf.append("lookupTypeId=").append(lookupTypeId).append(",");
		strBuf.append("lookupCode=").append(lookupCode).append(",");
		strBuf.append("lookupName=").append(lookupName).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
