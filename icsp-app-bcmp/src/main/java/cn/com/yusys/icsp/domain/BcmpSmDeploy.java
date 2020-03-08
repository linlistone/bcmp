package cn.com.yusys.icsp.domain;

import java.io.Serializable;
import cn.com.yusys.icsp.base.base.BaseDomain;


/**
 * 应用部署表
 * 
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:34
 */
//TableName("bcmp_sm_deploy")
public class BcmpSmDeploy extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

   /**
	 * 部署ID
	 *	pk
	 */
	private String deployId;
   /**
	 * 对应版本号
	 */
	private String versionId;
   /**
	 * 对应节点编号
	 */
	private String nodeId;
   /**
	 * 部署用户
	 */
	private String deployUser;
   /**
	 * 部署时间
	 */
	private String deployDate;
   /**
	 * 当前步骤节点
	 */
	private String deployStep;
   /**
	 * 当前步骤节点状态
	 */
	private String deployStepStatus;
   /**
	 * 部署结果备注
	 */
	private String deployRemark;
	
	/**
	 * 部署ID
	 * @param deployId
	 */
	public void setDeployId(String deployId) {
		this.deployId = deployId;
	}

	/**
	 * 部署ID
	 * @return deployId
	 */
	public String getDeployId() {
		return this.deployId;
	}
	/**
	 * 对应版本号
	 * @param versionId
	 */
	public void setVersionId(String versionId) {
		this.versionId = versionId;
	}

	/**
	 * 对应版本号
	 * @return versionId
	 */
	public String getVersionId() {
		return this.versionId;
	}
	/**
	 * 对应节点编号
	 * @param nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 对应节点编号
	 * @return nodeId
	 */
	public String getNodeId() {
		return this.nodeId;
	}
	/**
	 * 部署用户
	 * @param deployUser
	 */
	public void setDeployUser(String deployUser) {
		this.deployUser = deployUser;
	}

	/**
	 * 部署用户
	 * @return deployUser
	 */
	public String getDeployUser() {
		return this.deployUser;
	}
	/**
	 * 部署时间
	 * @param deployDate
	 */
	public void setDeployDate(String deployDate) {
		this.deployDate = deployDate;
	}

	/**
	 * 部署时间
	 * @return deployDate
	 */
	public String getDeployDate() {
		return this.deployDate;
	}
	/**
	 * 当前步骤节点
	 * @param deployStep
	 */
	public void setDeployStep(String deployStep) {
		this.deployStep = deployStep;
	}

	/**
	 * 当前步骤节点
	 * @return deployStep
	 */
	public String getDeployStep() {
		return this.deployStep;
	}
	/**
	 * 当前步骤节点状态
	 * @param deployStepStatus
	 */
	public void setDeployStepStatus(String deployStepStatus) {
		this.deployStepStatus = deployStepStatus;
	}

	/**
	 * 当前步骤节点状态
	 * @return deployStepStatus
	 */
	public String getDeployStepStatus() {
		return this.deployStepStatus;
	}
	/**
	 * 部署结果备注
	 * @param deployRemark
	 */
	public void setDeployRemark(String deployRemark) {
		this.deployRemark = deployRemark;
	}

	/**
	 * 部署结果备注
	 * @return deployRemark
	 */
	public String getDeployRemark() {
		return this.deployRemark;
	}
	public String toString(){
		StringBuffer strBuf=new StringBuffer();
		strBuf.append("BcmpSmDeploy[");
		strBuf.append("deployId=").append(deployId).append(",");
		strBuf.append("versionId=").append(versionId).append(",");
		strBuf.append("nodeId=").append(nodeId).append(",");
		strBuf.append("deployUser=").append(deployUser).append(",");
		strBuf.append("deployDate=").append(deployDate).append(",");
		strBuf.append("deployStep=").append(deployStep).append(",");
		strBuf.append("deployStepStatus=").append(deployStepStatus).append(",");
		strBuf.append("deployRemark=").append(deployRemark);
		strBuf.append("]");
		return strBuf.toString();
	}
}
