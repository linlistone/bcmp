package cn.com.yusys.icsp.common.exception;

import cn.com.yusys.icsp.base.enums.ResultHttpCode;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@ResponseBody
public class ICSPExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(ICSPExceptionHandler.class);

    @ExceptionHandler(value = Exception.class)
    public ResultDto<String> exceptionHandler(HttpServletRequest request, Exception e) {
        //全局异常处理逻辑
        if (e instanceof ICSPException) {
            logger.error(e.getMessage(), e);
            return ResultDto.error(e.getMessage());
        } else {
            logger.error(e.getMessage(), e);
        }
        return ResultDto.error(ResultHttpCode.UnknownError);
    }
}