package cn.com.yusys.icsp.agent.common.exception;

import cn.com.yusys.icsp.exception.BcmpException;

public class AgentException extends BcmpException {
    private static final long serialVersionUID = 1L;
    private String code;

    public AgentException(String message, Exception e) {
        super(message, e);
        this.code = "AGENT_EX";
    }

    public AgentException(final String message) {
        super(message);
        this.code = "AGENT_EX";
    }

    public AgentException(final String code, final String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
