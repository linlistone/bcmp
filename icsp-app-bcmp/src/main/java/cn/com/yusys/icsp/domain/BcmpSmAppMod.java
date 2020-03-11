package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 应用模块定义
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-11 10:31:26
 */
//TableName("bcmp_sm_app_mod")
public class BcmpSmAppMod extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 应用模块ID
	 *	pk
	 */
	private String appModId;
   /**
	 * 应用代码
	 */
	private String appModCode;
   /**
	 * 应用模块名称
	 */
	private String appModName;
   /**
	 * 服务节点类型
	 */
	private String nodeType;
   /**
	 * 应用模块类型
	 */
	private String appModType;
   /**
	 * 应用部署路径
	 */
	private String appModDeployPath;
   /**
	 * 应用模块说明
	 */
	private String appModDesc;
   /**
	 * 最后修改人
	 */
	private String appModLastChgUser;
   /**
	 * 最后修改时间
	 */
	private String appModLastChgDt;
	
	/**
	 * 应用模块ID
	 * @param appModId
	 */
	public void setAppModId(String appModId) {
		this.appModId = appModId;
	}

	/**
	 * 应用模块ID
	 * @return appModId
	 */
	public String getAppModId() {
		return this.appModId;
	}
	/**
	 * 应用代码
	 * @param appModCode
	 */
	public void setAppModCode(String appModCode) {
		this.appModCode = appModCode;
	}

	/**
	 * 应用代码
	 * @return appModCode
	 */
	public String getAppModCode() {
		return this.appModCode;
	}
	/**
	 * 应用模块名称
	 * @param appModName
	 */
	public void setAppModName(String appModName) {
		this.appModName = appModName;
	}

	/**
	 * 应用模块名称
	 * @return appModName
	 */
	public String getAppModName() {
		return this.appModName;
	}
	/**
	 * 服务节点类型
	 * @param nodeType
	 */
	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	/**
	 * 服务节点类型
	 * @return nodeType
	 */
	public String getNodeType() {
		return this.nodeType;
	}
	/**
	 * 应用模块类型
	 * @param appModType
	 */
	public void setAppModType(String appModType) {
		this.appModType = appModType;
	}

	/**
	 * 应用模块类型
	 * @return appModType
	 */
	public String getAppModType() {
		return this.appModType;
	}
	/**
	 * 应用部署路径
	 * @param appModDeployPath
	 */
	public void setAppModDeployPath(String appModDeployPath) {
		this.appModDeployPath = appModDeployPath;
	}

	/**
	 * 应用部署路径
	 * @return appModDeployPath
	 */
	public String getAppModDeployPath() {
		return this.appModDeployPath;
	}
	/**
	 * 应用模块说明
	 * @param appModDesc
	 */
	public void setAppModDesc(String appModDesc) {
		this.appModDesc = appModDesc;
	}

	/**
	 * 应用模块说明
	 * @return appModDesc
	 */
	public String getAppModDesc() {
		return this.appModDesc;
	}
	/**
	 * 最后修改人
	 * @param appModLastChgUser
	 */
	public void setAppModLastChgUser(String appModLastChgUser) {
		this.appModLastChgUser = appModLastChgUser;
	}

	/**
	 * 最后修改人
	 * @return appModLastChgUser
	 */
	public String getAppModLastChgUser() {
		return this.appModLastChgUser;
	}
	/**
	 * 最后修改时间
	 * @param appModLastChgDt
	 */
	public void setAppModLastChgDt(String appModLastChgDt) {
		this.appModLastChgDt = appModLastChgDt;
	}

	/**
	 * 最后修改时间
	 * @return appModLastChgDt
	 */
	public String getAppModLastChgDt() {
		return this.appModLastChgDt;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmAppMod[");
		strBuf.append("appModId=").append(appModId).append(",");
		strBuf.append("appModCode=").append(appModCode).append(",");
		strBuf.append("appModName=").append(appModName).append(",");
		strBuf.append("nodeType=").append(nodeType).append(",");
		strBuf.append("appModType=").append(appModType).append(",");
		strBuf.append("appModDeployPath=").append(appModDeployPath).append(",");
		strBuf.append("appModDesc=").append(appModDesc).append(",");
		strBuf.append("appModLastChgUser=").append(appModLastChgUser).append(",");
		strBuf.append("appModLastChgDt=").append(appModLastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
