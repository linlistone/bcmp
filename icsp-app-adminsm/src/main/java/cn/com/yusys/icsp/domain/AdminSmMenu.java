package cn.com.yusys.icsp.domain;

public class AdminSmMenu {

	private String menuId;
	/** 逻辑系统记录编号 **/
	private String sysId;

	/** 业务模编码号 **/
	private String modId;

	/** 业务功能编号 **/
	private String funcId;

	/** 上级菜单编号 **/
	private String upMenuId;

	/** 菜单名称 **/
	private String menuName;

	/** 菜单代码 **/
	private String menuCde;

	/** 顺序 **/
	private Integer menuOrder;

	/** 图标 **/
	private String menuIcon;

	/** 说明(菜单描述) **/
	private String menuTip;

	/** 最新变更用户 **/
	private String lastChgUsr;

	/** 最新变更时间 **/
	private String lastChgDt;

	/**
	 * 
	 */
	public AdminSmMenu() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getSysId() {
		return sysId;
	}

	public void setSysId(String sysId) {
		this.sysId = sysId;
	}

	public String getModId() {
		return modId;
	}

	public void setModId(String modId) {
		this.modId = modId;
	}

	public String getFuncId() {
		return funcId;
	}

	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	public String getUpMenuId() {
		return upMenuId;
	}

	public void setUpMenuId(String upMenuId) {
		this.upMenuId = upMenuId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public String getMenuCde() {
		return menuCde;
	}

	public void setMenuCde(String menuCde) {
		this.menuCde = menuCde;
	}

	public Integer getMenuOrder() {
		return menuOrder;
	}

	public void setMenuOrder(Integer menuOrder) {
		this.menuOrder = menuOrder;
	}

	public String getMenuIcon() {
		return menuIcon;
	}

	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}

	public String getMenuTip() {
		return menuTip;
	}

	public void setMenuTip(String menuTip) {
		this.menuTip = menuTip;
	}

	public String getLastChgUsr() {
		return lastChgUsr;
	}

	public void setLastChgUsr(String lastChgUsr) {
		this.lastChgUsr = lastChgUsr;
	}

	public String getLastChgDt() {
		return lastChgDt;
	}

	public void setLastChgDt(String lastChgDt) {
		this.lastChgDt = lastChgDt;
	}

}