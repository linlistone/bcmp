package cn.com.yusys.icsp.agent.common.beans;

import java.io.Serializable;

import io.netty.util.internal.StringUtil;

public class ExecResult implements Serializable {
	private static final long serialVersionUID = 1L;
	private String exitCode;
	private String out;
	private String errOut;
	private boolean success;

	public ExecResult() {
	}

	public ExecResult(final String exitCode, final String out, final String errOut) {
		this.exitCode = exitCode;
		this.out = out;
		this.errOut = errOut;
	}

	public String getExitCode() {
		return this.exitCode;
	}

	public void setExitCode(final String exitCode) {
		this.exitCode = exitCode;
	}

	public String getOut() {
		return this.out;
	}

	public void setOut(final String out) {
		this.out = out;
	}

	public String getErrOut() {
		return this.errOut;
	}

	public void setErrOut(final String errOut) {
		this.errOut = errOut;
	}

	public boolean isSuccess() {
		return "0".equals(this.exitCode) || StringUtil.isNullOrEmpty(this.getErrOut());
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	@Override
	public String toString() {
		return "ExecResult{exitCode='" + this.exitCode + '\'' + ", out='" + this.out + '\'' + ", errOut='" + this.errOut
				+ '\'' + '}';
	}
}
