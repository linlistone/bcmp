package cn.com.yusys.icsp.adminsm.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import java.io.Serializable;


/**
 * The persistent class for the ADMIN_SM_LOOKUP_ITEM database table.
 * 
 */
public class AdminSmLookupItem extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

	private String lookupItemId;

	private String lastChgDt;

	private String lastChgUsr;

	private String lookupCode;

	private String lookupItemCode;

	private String lookupItemComment;

	private String lookupItemName;

	private String upLookupItemId;

	private Integer lookupItemOrder;

	public AdminSmLookupItem() {
	}

	public String getLookupItemId() {
		return this.lookupItemId;
	}

	public void setLookupItemId(String lookupItemId) {
		this.lookupItemId = lookupItemId;
	}

	public String getLastChgDt() {
		return this.lastChgDt;
	}

	public void setLastChgDt(String lastChgDt) {
		this.lastChgDt = lastChgDt;
	}

	public String getLastChgUsr() {
		return this.lastChgUsr;
	}

	public void setLastChgUsr(String lastChgUsr) {
		this.lastChgUsr = lastChgUsr;
	}

	public String getLookupCode() {
		return this.lookupCode;
	}

	public void setLookupCode(String lookupCode) {
		this.lookupCode = lookupCode;
	}

	public String getLookupItemCode() {
		return this.lookupItemCode;
	}

	public void setLookupItemCode(String lookupItemCode) {
		this.lookupItemCode = lookupItemCode;
	}

	public String getLookupItemComment() {
		return this.lookupItemComment;
	}

	public void setLookupItemComment(String lookupItemComment) {
		this.lookupItemComment = lookupItemComment;
	}

	public String getLookupItemName() {
		return this.lookupItemName;
	}

	public void setLookupItemName(String lookupItemName) {
		this.lookupItemName = lookupItemName;
	}

	public String getUpLookupItemId() {
		return this.upLookupItemId;
	}

	public void setUpLookupItemId(String upLookupItemId) {
		this.upLookupItemId = upLookupItemId;
	}

	public Integer getLookupItemOrder() {
		return lookupItemOrder;
	}

	public void setLookupItemOrder(Integer lookupItemOrder) {
		this.lookupItemOrder = lookupItemOrder;
	}

}