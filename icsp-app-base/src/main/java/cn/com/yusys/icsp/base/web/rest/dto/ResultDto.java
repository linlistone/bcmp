package cn.com.yusys.icsp.base.web.rest.dto;

import cn.com.yusys.icsp.base.enums.StatusCode;

public class ResultDto<T> {
    /**
     * 返回代码
     */
    private String code = "0";

    /**
     * 返回信息
     */
    private String message = "success";

    /**
     * 总记录数
     */
    private long total;

    /**
     * 返回数据
     */
    private T data;

    /**
     *
     */
    public ResultDto() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     *
     */
    public  ResultDto(int code) {
        this.code = String.valueOf(code);
    }

    /**
     *
     */
    public  ResultDto(StatusCode statusCode) {
        this.code = String.valueOf(statusCode.getCode());
        this.message = String.valueOf(statusCode.getMsg());
    }


    /**
     *
     */
    public  ResultDto(int code, String message) {
        this.code = String.valueOf(code);
        this.message = message;
    }
    /**
     *
     */
    public  ResultDto(long total, T t) {
        this.data = t;
        this.total = total;
    }

    /**
     *
     */
    public ResultDto(String code, String message, T t) {
        this.code = code;
        this.message = message;
        this.data = t;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String toString() {
        return "[code=" + code + ", message=" + message + ", total="
                + this.total + ", data=" + data.toString() + "]";
    }
}
