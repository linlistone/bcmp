package cn.com.yusys.icsp.adminsm.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import java.io.Serializable;


/**
 * 系统功能控制点表
 * 
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-10 00:05:20
 */
//TableName("admin_sm_res_contr")
public class AdminSmResContr extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

    /**
	 * 记录编号
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String contrId;
    /**
	 * 所属业务功能编号
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String funcId;
    /**
	 * 控制操作代码
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String contrCode;
    /**
	 * 控制操作名称
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String contrName;
    /**
	 * 控制操作URL(用于后台校验时使用)
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String contrUrl;
    /**
	 * 请求类型
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String methodType;
    /**
	 * 备注
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String contrRemark;
    /**
	 * 最新变更用户
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String lastChgUsr;
    /**
	 * 最新变更时间
	 *
		#if($column.columnName == CONTR_ID)
	 *	pk
		#end
	 */
	private String lastChgDt;
	
	/**
	 * @param contrId
	 */
	public void setContrId(String contrId) {
		this.contrId = contrId;
	}

	/**
	 * @return contrId
	 */
	public String getContrId() {
		return this.contrId;
	}
	/**
	 * @param funcId
	 */
	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	/**
	 * @return funcId
	 */
	public String getFuncId() {
		return this.funcId;
	}
	/**
	 * @param contrCode
	 */
	public void setContrCode(String contrCode) {
		this.contrCode = contrCode;
	}

	/**
	 * @return contrCode
	 */
	public String getContrCode() {
		return this.contrCode;
	}
	/**
	 * @param contrName
	 */
	public void setContrName(String contrName) {
		this.contrName = contrName;
	}

	/**
	 * @return contrName
	 */
	public String getContrName() {
		return this.contrName;
	}
	/**
	 * @param contrUrl
	 */
	public void setContrUrl(String contrUrl) {
		this.contrUrl = contrUrl;
	}

	/**
	 * @return contrUrl
	 */
	public String getContrUrl() {
		return this.contrUrl;
	}
	/**
	 * @param methodType
	 */
	public void setMethodType(String methodType) {
		this.methodType = methodType;
	}

	/**
	 * @return methodType
	 */
	public String getMethodType() {
		return this.methodType;
	}
	/**
	 * @param contrRemark
	 */
	public void setContrRemark(String contrRemark) {
		this.contrRemark = contrRemark;
	}

	/**
	 * @return contrRemark
	 */
	public String getContrRemark() {
		return this.contrRemark;
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
		strBuf.append("AdminSmResContr[");
		strBuf.append("contrId=").append(contrId).append(",");
		strBuf.append("funcId=").append(funcId).append(",");
		strBuf.append("contrCode=").append(contrCode).append(",");
		strBuf.append("contrName=").append(contrName).append(",");
		strBuf.append("contrUrl=").append(contrUrl).append(",");
		strBuf.append("methodType=").append(methodType).append(",");
		strBuf.append("contrRemark=").append(contrRemark).append(",");
		strBuf.append("lastChgUsr=").append(lastChgUsr).append(",");
		strBuf.append("lastChgDt=").append(lastChgDt);
		strBuf.append("]");
		return strBuf.toString();
	}
}
