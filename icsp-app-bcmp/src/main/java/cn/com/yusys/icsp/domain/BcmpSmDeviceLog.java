package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 设备日志上传表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 23:02:18
 */
//TableName("bcmp_sm_device_log")
public class BcmpSmDeviceLog extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 设备日志ID
	 *	pk
	 */
	private String deviceLogId;
   /**
	 * 日志文件名称
	 */
	private String logName;
   /**
	 * 上传用户
	 */
	private String uploadUserId;
   /**
	 * 上传时间
	 */
	private String uploadDate;
   /**
	 * 日志文件路径
	 */
	private String logPath;
	
	/**
	 * 设备日志ID
	 * @param deviceLogId
	 */
	public void setDeviceLogId(String deviceLogId) {
		this.deviceLogId = deviceLogId;
	}

	/**
	 * 设备日志ID
	 * @return deviceLogId
	 */
	public String getDeviceLogId() {
		return this.deviceLogId;
	}
	/**
	 * 日志文件名称
	 * @param logName
	 */
	public void setLogName(String logName) {
		this.logName = logName;
	}

	/**
	 * 日志文件名称
	 * @return logName
	 */
	public String getLogName() {
		return this.logName;
	}
	/**
	 * 上传用户
	 * @param uploadUserId
	 */
	public void setUploadUserId(String uploadUserId) {
		this.uploadUserId = uploadUserId;
	}

	/**
	 * 上传用户
	 * @return uploadUserId
	 */
	public String getUploadUserId() {
		return this.uploadUserId;
	}
	/**
	 * 上传时间
	 * @param uploadDate
	 */
	public void setUploadDate(String uploadDate) {
		this.uploadDate = uploadDate;
	}

	/**
	 * 上传时间
	 * @return uploadDate
	 */
	public String getUploadDate() {
		return this.uploadDate;
	}
	/**
	 * 日志文件路径
	 * @param logPath
	 */
	public void setLogPath(String logPath) {
		this.logPath = logPath;
	}

	/**
	 * 日志文件路径
	 * @return logPath
	 */
	public String getLogPath() {
		return this.logPath;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmDeviceLog[");
		strBuf.append("deviceLogId=").append(deviceLogId).append(",");
		strBuf.append("logName=").append(logName).append(",");
		strBuf.append("uploadUserId=").append(uploadUserId).append(",");
		strBuf.append("uploadDate=").append(uploadDate).append(",");
		strBuf.append("logPath=").append(logPath);
		strBuf.append("]");
		return strBuf.toString();
	}
}
