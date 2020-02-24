package cn.com.yusys.icsp.adminsm.domain;

public class MenuBean extends AdminSmMenu {
	/** 模块代码 **/
	private String modCde;

	private String modName;

	private String funcUrl;

	private String funcUrlJs;

	private String funcUrlCss;

	private String funcName;

	private String upMenuName;

	/**
	 * 
	 */
	public MenuBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getModCde() {
		return modCde;
	}

	public void setModCde(String modCde) {
		this.modCde = modCde;
	}

	public String getModName() {
		return modName;
	}

	public void setModName(String modName) {
		this.modName = modName;
	}

	public String getFuncUrl() {
		return funcUrl;
	}

	public void setFuncUrl(String funcUrl) {
		this.funcUrl = funcUrl;
	}

	public String getFuncUrlJs() {
		return funcUrlJs;
	}

	public void setFuncUrlJs(String funcUrlJs) {
		this.funcUrlJs = funcUrlJs;
	}

	public String getFuncUrlCss() {
		return funcUrlCss;
	}

	public void setFuncUrlCss(String funcUrlCss) {
		this.funcUrlCss = funcUrlCss;
	}

	public String getFuncName() {
		return funcName;
	}

	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}

	public String getUpMenuName() {
		return upMenuName;
	}

	public void setUpMenuName(String upMenuName) {
		this.upMenuName = upMenuName;
	}

}