package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 版本清单表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:21
 */
//TableName("bcmp_sm_version")
public class BcmpSmVersion extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 版本Id
	 *	pk
	 */
	private String versionId;
   /**
	 * 版本号
	 */
	private String versionNum;
   /**
	 * 版本类型
	 */
	private String versionType;
   /**
	 * 版本文件路径
	 */
	private String versionPath;
   /**
	 * 版本上传时间
	 */
	private String versionUploadDate;
   /**
	 * 版本上传人
	 */
	private String versionUploadUse;
	
	/**
	 * 版本Id
	 * @param versionId
	 */
	public void setVersionId(String versionId) {
		this.versionId = versionId;
	}

	/**
	 * 版本Id
	 * @return versionId
	 */
	public String getVersionId() {
		return this.versionId;
	}
	/**
	 * 版本号
	 * @param versionNum
	 */
	public void setVersionNum(String versionNum) {
		this.versionNum = versionNum;
	}

	/**
	 * 版本号
	 * @return versionNum
	 */
	public String getVersionNum() {
		return this.versionNum;
	}
	/**
	 * 版本类型
	 * @param versionType
	 */
	public void setVersionType(String versionType) {
		this.versionType = versionType;
	}

	/**
	 * 版本类型
	 * @return versionType
	 */
	public String getVersionType() {
		return this.versionType;
	}
	/**
	 * 版本文件路径
	 * @param versionPath
	 */
	public void setVersionPath(String versionPath) {
		this.versionPath = versionPath;
	}

	/**
	 * 版本文件路径
	 * @return versionPath
	 */
	public String getVersionPath() {
		return this.versionPath;
	}
	/**
	 * 版本上传时间
	 * @param versionUploadDate
	 */
	public void setVersionUploadDate(String versionUploadDate) {
		this.versionUploadDate = versionUploadDate;
	}

	/**
	 * 版本上传时间
	 * @return versionUploadDate
	 */
	public String getVersionUploadDate() {
		return this.versionUploadDate;
	}
	/**
	 * 版本上传人
	 * @param versionUploadUse
	 */
	public void setVersionUploadUse(String versionUploadUse) {
		this.versionUploadUse = versionUploadUse;
	}

	/**
	 * 版本上传人
	 * @return versionUploadUse
	 */
	public String getVersionUploadUse() {
		return this.versionUploadUse;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmVersion[");
		strBuf.append("versionId=").append(versionId).append(",");
		strBuf.append("versionNum=").append(versionNum).append(",");
		strBuf.append("versionType=").append(versionType).append(",");
		strBuf.append("versionPath=").append(versionPath).append(",");
		strBuf.append("versionUploadDate=").append(versionUploadDate).append(",");
		strBuf.append("versionUploadUse=").append(versionUploadUse);
		strBuf.append("]");
		return strBuf.toString();
	}
}
