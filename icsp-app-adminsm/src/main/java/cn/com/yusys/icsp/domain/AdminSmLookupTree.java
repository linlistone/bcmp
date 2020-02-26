/*
 * 代码生成器自动生成的
 * Since 2008 - 2020
 *
 */
package cn.com.yusys.icsp.domain;

import cn.com.yusys.icsp.base.base.BaseDomain;

import java.io.Serializable;

/**
 * @项目名称: linli-demo-core模块
 * @类名称: AdminSmLookupTree
 * @类描述: admin_sm_lookup_tree数据实体类
 * @功能描述:
 * @创建人: c90035
 * @创建时间: 2020-01-13 20:21:04
 * @修改备注:
 * @修改记录: 修改时间 修改人员 修改原因
 *        -------------------------------------------------------------
 * @version 1.0.0
 * @Copyright (c) 宇信科技-版权所有
 */
public class AdminSmLookupTree extends BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;

	/** 选项值 **/
	private String id;

	/** 选项名称 **/
	private String name;

	/** 上级选项值 **/
	private String pid;

	/** 节点 **/
	private String locate;

	/** 选项类别 **/
	private String opttype;

	/** 选项描述 **/
	private String memo;

	/** 标志 **/
	private String flag;

	/** 级别 **/
	private String levels;

	/** 排序字段 **/
	private java.math.BigDecimal orderid;

	/**
	 * @param id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return id
	 */
	public String getId() {
		return this.id;
	}

	/**
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return name
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * @param pid
	 */
	public void setPid(String pid) {
		this.pid = pid;
	}

	/**
	 * @return pid
	 */
	public String getPid() {
		return this.pid;
	}

	/**
	 * @param locate
	 */
	public void setLocate(String locate) {
		this.locate = locate;
	}

	/**
	 * @return locate
	 */
	public String getLocate() {
		return this.locate;
	}

	/**
	 * @param opttype
	 */
	public void setOpttype(String opttype) {
		this.opttype = opttype;
	}

	/**
	 * @return opttype
	 */
	public String getOpttype() {
		return this.opttype;
	}

	/**
	 * @param memo
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	/**
	 * @return memo
	 */
	public String getMemo() {
		return this.memo;
	}

	/**
	 * @param flag
	 */
	public void setFlag(String flag) {
		this.flag = flag;
	}

	/**
	 * @return flag
	 */
	public String getFlag() {
		return this.flag;
	}

	/**
	 * @param levels
	 */
	public void setLevels(String levels) {
		this.levels = levels;
	}

	/**
	 * @return levels
	 */
	public String getLevels() {
		return this.levels;
	}

	/**
	 * @param orderid
	 */
	public void setOrderid(java.math.BigDecimal orderid) {
		this.orderid = orderid;
	}

	/**
	 * @return orderid
	 */
	public java.math.BigDecimal getOrderid() {
		return this.orderid;
	}

}