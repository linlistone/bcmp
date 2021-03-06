package cn.com.yusys.icsp.common.exception;

//自定义异常
public class ICSPException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private String msg;
    private int code = 500;

    public ICSPException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public ICSPException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public ICSPException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public ICSPException(String msg, int code, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }

    public String getMessage() {
        return msg;
    }

}
