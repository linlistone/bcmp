package cn.com.yusys.icsp.common.exception;/**
 * Created by Administrator on 2019/8/4.
 */

import cn.com.yusys.icsp.base.enums.StatusCode;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 通用异常处理器
 *
 * @Author:debug (SteadyJack)
 * @Date: 2019/8/4 22:07
 **/
@RestControllerAdvice
public class CommonExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(CommonExceptionHandler.class);


    //自定义异常
    @ExceptionHandler(ICSPException.class)
    public ResultDto handleRRException(ICSPException e) {
        ResultDto response = new ResultDto(e.getCode(), e.getMessage());
        return response;
    }

    //数据库出现重复数据记录的异常
    @ExceptionHandler(DuplicateKeyException.class)
    public ResultDto handleDuplicateKeyException(DuplicateKeyException e) {
        ResultDto response = new ResultDto(StatusCode.UnknownError);
        logger.error(e.getMessage(), e);
        response.setMessage("数据库中已存在该记录!");
        return response;
    }

    @ExceptionHandler(Exception.class)
    public ResultDto handleException(Exception e) {
        ResultDto response = new ResultDto(StatusCode.UnknownError);
        logger.error(e.getMessage(), e);
        return response;

    }
}










































