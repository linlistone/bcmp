package cn.com.yusys.icsp.adminsm.domain;

import java.util.List;

public class MenuContrBean {

	/**
	 * 交易菜单
	 */
	private List<MenuBean> menus;
	/**
	 * 控制点
	 */
	private List<ContrBean> contrs;

	public MenuContrBean() {
	}

	public MenuContrBean(List<MenuBean> menus, List<ContrBean> contrs) {
		this.menus = menus;
		this.contrs = contrs;
	}

	public List<MenuBean> getMenus() {
		return this.menus;
	}

	public void setMenus(List<MenuBean> menus) {
		this.menus = menus;
	}

	public List<ContrBean> getContrs() {
		return this.contrs;
	}

	public void setContrs(List<ContrBean> contrs) {
		this.contrs = contrs;
	}
}