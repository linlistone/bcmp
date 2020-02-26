package cn.com.yusys.icsp.domain;

import java.util.List;

public class UserBean extends AdminSmUser {

	private List<AdminSmRole> roles;
	private AdminSmOrgInfo org;
	private AdminsmDpt dpt;
	private AdminSmLogicSys logicSys;
	private AdminSmInstu instu;
	private String upOrg;
	private String dataContr;

	public List<AdminSmRole> getRoles() {
		return roles;
	}

	public void setRoles(List<AdminSmRole> roles) {
		this.roles = roles;
	}

	public AdminSmOrgInfo getOrg() {
		return org;
	}

	public void setOrg(AdminSmOrgInfo org) {
		this.org = org;
	}

	public AdminsmDpt getDpt() {
		return dpt;
	}

	public void setDpt(AdminsmDpt dpt) {
		this.dpt = dpt;
	}

	public AdminSmLogicSys getLogicSys() {
		return logicSys;
	}

	public void setLogicSys(AdminSmLogicSys logicSys) {
		this.logicSys = logicSys;
	}

	public AdminSmInstu getInstu() {
		return instu;
	}

	public void setInstu(AdminSmInstu instu) {
		this.instu = instu;
	}

	public String getUpOrg() {
		return upOrg;
	}

	public void setUpOrg(String upOrg) {
		this.upOrg = upOrg;
	}

	public String getDataContr() {
		return dataContr;
	}

	public void setDataContr(String dataContr) {
		this.dataContr = dataContr;
	}

}