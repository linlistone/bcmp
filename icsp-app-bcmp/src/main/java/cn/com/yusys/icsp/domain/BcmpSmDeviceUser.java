package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 设备领用记录
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 21:40:08
 */
//TableName("bcmp_sm_device_user")
public class BcmpSmDeviceUser extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 领用ID
	 *	pk
	 */
	private String linkId;
   /**
	 * 设备ID
	 */
	private String deviceId;
   /**
	 * 领用人
	 */
	private String userId;
   /**
	 * 领用日期
	 */
	private String linkDate;
   /**
	 * 操作人
	 */
	private String opuserId;
	
	/**
	 * 领用ID
	 * @param linkId
	 */
	public void setLinkId(String linkId) {
		this.linkId = linkId;
	}

	/**
	 * 领用ID
	 * @return linkId
	 */
	public String getLinkId() {
		return this.linkId;
	}
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
	 * 领用人
	 * @param userId
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * 领用人
	 * @return userId
	 */
	public String getUserId() {
		return this.userId;
	}
	/**
	 * 领用日期
	 * @param linkDate
	 */
	public void setLinkDate(String linkDate) {
		this.linkDate = linkDate;
	}

	/**
	 * 领用日期
	 * @return linkDate
	 */
	public String getLinkDate() {
		return this.linkDate;
	}
	/**
	 * 操作人
	 * @param opuserId
	 */
	public void setOpuserId(String opuserId) {
		this.opuserId = opuserId;
	}

	/**
	 * 操作人
	 * @return opuserId
	 */
	public String getOpuserId() {
		return this.opuserId;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmDeviceUser[");
		strBuf.append("linkId=").append(linkId).append(",");
		strBuf.append("deviceId=").append(deviceId).append(",");
		strBuf.append("userId=").append(userId).append(",");
		strBuf.append("linkDate=").append(linkDate).append(",");
		strBuf.append("opuserId=").append(opuserId);
		strBuf.append("]");
		return strBuf.toString();
	}
}
