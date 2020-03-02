package cn.com.yusys.icsp.exception;

public class BcmpException extends Exception {
    private static final long serialVersionUID = 1L;

    private String msg;
    private int code = 500;

    public BcmpException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public BcmpException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public BcmpException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public BcmpException(String msg, int code, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }

    public String getMessage() {
        return msg;
    }
}
