package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 设备登记表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:29
 */
//TableName("bcmp_sm_device")
public class BcmpSmDevice extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 设备ID
	 *	pk
	 */
	private String deviceId;
   /**
	 * 设备序列号
	 */
	private String deviceNumber;
   /**
	 * 购买日期
	 */
	private String buyDate;
   /**
	 * 购买机构
	 */
	private String deviceOrg;
   /**
	 * 设备类型
	 */
	private String deviceType;
   /**
	 * 设备状态
	 */
	private String deviceStatus;
   /**
	 * 设备备注
	 */
	private String deviceComment;
   /**
	 * 创建人
	 */
	private String creatorUser;
   /**
	 * 创建人日期
	 */
	private String creatorDate;
   /**
	 * 修改人
	 */
	private String lastChgUser;
   /**
	 * 修改人日期
	 */
	private String lashChgDate;
   /**
	 * 最后领用人
	 */
	private String lastRecUser;
   /**
	 * 最后领用日期
	 */
	private String lastRecDate;
	
	/**
	 * 设备ID
	 * @param deviceId
	 */
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	/**
	 * 设备ID
	 * @return deviceId
	 */
	public String getDeviceId() {
		return this.deviceId;
	}
	/**
	 * 设备序列号
	 * @param deviceNumber
	 */
	public void setDeviceNumber(String deviceNumber) {
		this.deviceNumber = deviceNumber;
	}

	/**
	 * 设备序列号
	 * @return deviceNumber
	 */
	public String getDeviceNumber() {
		return this.deviceNumber;
	}
	/**
	 * 购买日期
	 * @param buyDate
	 */
	public void setBuyDate(String buyDate) {
		this.buyDate = buyDate;
	}

	/**
	 * 购买日期
	 * @return buyDate
	 */
	public String getBuyDate() {
		return this.buyDate;
	}
	/**
	 * 购买机构
	 * @param deviceOrg
	 */
	public void setDeviceOrg(String deviceOrg) {
		this.deviceOrg = deviceOrg;
	}

	/**
	 * 购买机构
	 * @return deviceOrg
	 */
	public String getDeviceOrg() {
		return this.deviceOrg;
	}
	/**
	 * 设备类型
	 * @param deviceType
	 */
	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	/**
	 * 设备类型
	 * @return deviceType
	 */
	public String getDeviceType() {
		return this.deviceType;
	}
	/**
	 * 设备状态
	 * @param deviceStatus
	 */
	public void setDeviceStatus(String deviceStatus) {
		this.deviceStatus = deviceStatus;
	}

	/**
	 * 设备状态
	 * @return deviceStatus
	 */
	public String getDeviceStatus() {
		return this.deviceStatus;
	}
	/**
	 * 设备备注
	 * @param deviceComment
	 */
	public void setDeviceComment(String deviceComment) {
		this.deviceComment = deviceComment;
	}

	/**
	 * 设备备注
	 * @return deviceComment
	 */
	public String getDeviceComment() {
		return this.deviceComment;
	}
	/**
	 * 创建人
	 * @param creatorUser
	 */
	public void setCreatorUser(String creatorUser) {
		this.creatorUser = creatorUser;
	}

	/**
	 * 创建人
	 * @return creatorUser
	 */
	public String getCreatorUser() {
		return this.creatorUser;
	}
	/**
	 * 创建人日期
	 * @param creatorDate
	 */
	public void setCreatorDate(String creatorDate) {
		this.creatorDate = creatorDate;
	}

	/**
	 * 创建人日期
	 * @return creatorDate
	 */
	public String getCreatorDate() {
		return this.creatorDate;
	}
	/**
	 * 修改人
	 * @param lastChgUser
	 */
	public void setLastChgUser(String lastChgUser) {
		this.lastChgUser = lastChgUser;
	}

	/**
	 * 修改人
	 * @return lastChgUser
	 */
	public String getLastChgUser() {
		return this.lastChgUser;
	}
	/**
	 * 修改人日期
	 * @param lashChgDate
	 */
	public void setLashChgDate(String lashChgDate) {
		this.lashChgDate = lashChgDate;
	}

	/**
	 * 修改人日期
	 * @return lashChgDate
	 */
	public String getLashChgDate() {
		return this.lashChgDate;
	}
	/**
	 * 最后领用人
	 * @param lastRecUser
	 */
	public void setLastRecUser(String lastRecUser) {
		this.lastRecUser = lastRecUser;
	}

	/**
	 * 最后领用人
	 * @return lastRecUser
	 */
	public String getLastRecUser() {
		return this.lastRecUser;
	}
	/**
	 * 最后领用日期
	 * @param lastRecDate
	 */
	public void setLastRecDate(String lastRecDate) {
		this.lastRecDate = lastRecDate;
	}

	/**
	 * 最后领用日期
	 * @return lastRecDate
	 */
	public String getLastRecDate() {
		return this.lastRecDate;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmDevice[");
		strBuf.append("deviceId=").append(deviceId).append(",");
		strBuf.append("deviceNumber=").append(deviceNumber).append(",");
		strBuf.append("buyDate=").append(buyDate).append(",");
		strBuf.append("deviceOrg=").append(deviceOrg).append(",");
		strBuf.append("deviceType=").append(deviceType).append(",");
		strBuf.append("deviceStatus=").append(deviceStatus).append(",");
		strBuf.append("deviceComment=").append(deviceComment).append(",");
		strBuf.append("creatorUser=").append(creatorUser).append(",");
		strBuf.append("creatorDate=").append(creatorDate).append(",");
		strBuf.append("lastChgUser=").append(lastChgUser).append(",");
		strBuf.append("lashChgDate=").append(lashChgDate).append(",");
		strBuf.append("lastRecUser=").append(lastRecUser).append(",");
		strBuf.append("lastRecDate=").append(lastRecDate);
		strBuf.append("]");
		return strBuf.toString();
	}
}
