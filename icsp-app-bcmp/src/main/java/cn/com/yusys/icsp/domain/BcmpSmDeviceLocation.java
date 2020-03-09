package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 设备定位历史
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 22:39:18
 */
//TableName("bcmp_sm_device_location")
public class BcmpSmDeviceLocation extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 定位ID
	 *	pk
	 */
	private String locationId;
   /**
	 * 设备ID
	 */
	private String deviceId;
   /**
	 * 位置代码
	 */
	private String locationCode;
   /**
	 * 位置名称
	 */
	private String localtionName;
   /**
	 * 用户
	 */
	private String userId;
   /**
	 * 定位日期
	 */
	private String locationDate;
	
	/**
	 * 定位ID
	 * @param locationId
	 */
	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}

	/**
	 * 定位ID
	 * @return locationId
	 */
	public String getLocationId() {
		return this.locationId;
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
	 * 位置代码
	 * @param locationCode
	 */
	public void setLocationCode(String locationCode) {
		this.locationCode = locationCode;
	}

	/**
	 * 位置代码
	 * @return locationCode
	 */
	public String getLocationCode() {
		return this.locationCode;
	}
	/**
	 * 位置名称
	 * @param localtionName
	 */
	public void setLocaltionName(String localtionName) {
		this.localtionName = localtionName;
	}

	/**
	 * 位置名称
	 * @return localtionName
	 */
	public String getLocaltionName() {
		return this.localtionName;
	}
	/**
	 * 用户
	 * @param userId
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * 用户
	 * @return userId
	 */
	public String getUserId() {
		return this.userId;
	}
	/**
	 * 定位日期
	 * @param locationDate
	 */
	public void setLocationDate(String locationDate) {
		this.locationDate = locationDate;
	}

	/**
	 * 定位日期
	 * @return locationDate
	 */
	public String getLocationDate() {
		return this.locationDate;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmDeviceLocation[");
		strBuf.append("locationId=").append(locationId).append(",");
		strBuf.append("deviceId=").append(deviceId).append(",");
		strBuf.append("locationCode=").append(locationCode).append(",");
		strBuf.append("localtionName=").append(localtionName).append(",");
		strBuf.append("userId=").append(userId).append(",");
		strBuf.append("locationDate=").append(locationDate);
		strBuf.append("]");
		return strBuf.toString();
	}
}
