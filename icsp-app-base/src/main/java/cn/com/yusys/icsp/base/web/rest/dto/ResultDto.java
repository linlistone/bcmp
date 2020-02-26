package cn.com.yusys.icsp.base.web.rest.dto;

import cn.com.yusys.icsp.base.enums.ResultHttpCode;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel()
public class ResultDto<T> {

    private static final Object RESULT_OBJECT = new Object();

    @ApiModelProperty(value = "返回编码", name = "code", dataType = "int", example = "0")
    private Integer code = 0;

    @ApiModelProperty(value = "返回信息", name = "msg", dataType = "string", example = "success")
    private String message = "success";

    @ApiModelProperty(value = "返回内容", name = "data", dataType = "t")
    private T data;
    /**
     * 总记录数
     */
    @ApiModelProperty(value = "记录总数", name = "total", dataType = "int", example = "0")
    private long total;

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
    public ResultDto(int code) {
        this.code = code;
    }

    public ResultDto(ResultHttpCode code, T data) {
        this.code = code.getCode();
        this.message = code.getMsg();
        this.data = data;
    }

    public ResultDto(Integer code, String msg, T data) {
        this.code = code;
        this.message = msg;
        this.data = data;
    }


    public static ResultDto<Object> success() {
        return ResultDto.success(ResultHttpCode.Success, RESULT_OBJECT);
    }

    /**
     * 分页数据返回
     *
     * @param pageInfo
     * @return
     */
    public static ResultDto success(PageInfo pageInfo) {
        ResultDto ret = ResultDto.success(ResultHttpCode.Success);
        ret.setTotal(pageInfo.getTotal());
        ret.setData(pageInfo.getList());
        return ret;
    }

    public static <T> ResultDto<T> success(T data) {
        return ResultDto.success(ResultHttpCode.Success, data);
    }

    public static <T> ResultDto<T> success(ResultHttpCode code, T data) {
        return ResultDto.success(code.getCode(), code.getMsg(), data);
    }

    public static <T> ResultDto<T> success(Integer code, String msg, T data) {
        return new ResultDto(code, msg, data);
    }

    public static ResultDto<Object> error() {
        return ResultDto.error(ResultHttpCode.Fail, new Object());
    }

    public static <T> ResultDto<T> error(T data) {
        return ResultDto.error(ResultHttpCode.Fail, data);
    }

    public static <T> ResultDto<T> error(ResultHttpCode code) {
        return ResultDto.error(code.getCode(), code.getMsg(), null);
    }

    public static <T> ResultDto<T> error(ResultHttpCode code, T data) {
        return ResultDto.error(code.getCode(), code.getMsg(), data);
    }

    public static <T> ResultDto<T> error(Integer code, String msg) {
        return ResultDto.error(code, msg, null);
    }

    public static <T> ResultDto<T> error(Integer code, String msg, T data) {
        return new ResultDto(code, msg, data);
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
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
