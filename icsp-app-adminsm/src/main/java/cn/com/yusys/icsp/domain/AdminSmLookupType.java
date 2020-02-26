package cn.com.yusys.icsp.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import java.io.Serializable;

/**
 * 字典分类别
 * 
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:30:35
 */
//TableName("admin_sm_lookup_type")
public class AdminSmLookupType extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 字典分类ID
	 */
	private String lookupTypeId;
	/**
	 * 字典分类名称
	 */
	private String lookupTypeName;
	/**
	 * 上级分类ID
	 */
	private String upLookupTypeId;
	/**
	 * 法人ID
	 */
	private String instuId;
	/**
	 * 最新变更用户
	 */
	private String lastChgUsr;
	/**
	 * 最新变更时间
	 *
	 */
	private String lastChgDt;

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
	 * @param lookupTypeName
	 */
	public void setLookupTypeName(String lookupTypeName) {
		this.lookupTypeName = lookupTypeName;
	}

	/**
	 * @return lookupTypeName
	 */
	public String getLookupTypeName() {
		return this.lookupTypeName;
	}

	/**
	 * @param upLookupTypeId
	 */
	public void setUpLookupTypeId(String upLookupTypeId) {
		this.upLookupTypeId = upLookupTypeId;
	}

	/**
	 * @return upLookupTypeId
	 */
	public String getUpLookupTypeId() {
		return this.upLookupTypeId;
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

	public String toString() {
		StringBuffer strBuf = new StringBuffer();
		strBuf.append("AdminSmLookupType[");
		strBuf.append("lookupTypeId=").append(lookupTypeId).append(",");
		strBuf.append("lookupTypeName=").append(lookupTypeName).append(",");
		strBuf.append("upLookupTypeId=").append(upLookupTypeId).append(",");
		strBuf.append("instuId=").append(instuId).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
