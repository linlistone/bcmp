package cn.com.yusys.icsp.adminsm.domain;

public class ContrBean {
	/** 菜单ID **/
	private String menuId; //
	/** 菜单功能ID **/
	private String funcId; //
	/** 控制点CODE **/
	private String ctrlCode; //
	/** 控制点名称 **/
	private String ctrlName; //

	public ContrBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getFuncId() {
		return funcId;
	}

	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	public String getCtrlCode() {
		return ctrlCode;
	}

	public void setCtrlCode(String ctrlCode) {
		this.ctrlCode = ctrlCode;
	}

	public String getCtrlName() {
		return ctrlName;
	}

	public void setCtrlName(String ctrlName) {
		this.ctrlName = ctrlName;
	}

}