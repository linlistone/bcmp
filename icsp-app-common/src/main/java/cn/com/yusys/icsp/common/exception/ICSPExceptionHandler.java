package cn.com.yusys.icsp.common.exception;

import cn.com.yusys.icsp.base.enums.ResultHttpCode;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@ResponseBody
public class ICSPExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public ResultDto<String> exceptionHandler(HttpServletRequest request, Exception e) {
        //全局异常处理逻辑
        if (e instanceof ICSPException) {
            return ResultDto.error(((ICSPException) e).getMsg());
        }
        return ResultDto.error(ResultHttpCode.UnknownError);
    }
}