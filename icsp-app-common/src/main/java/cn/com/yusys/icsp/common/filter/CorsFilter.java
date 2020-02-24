package cn.com.yusys.icsp.common.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 允许跨域访问过滤器
 */
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        //指定允许其他域名访问
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "*");

        //响应头设置
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        //响应类型
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");

        httpServletResponse.addHeader("Access-Control-Allow-Credentials","true");

        httpServletResponse.addHeader("Access-Control-Expose-Headers","Fox-Session");

        httpServletResponse.addHeader(
                "Access-Control-Allow-Headers","Origin, No-Cache, X-Requested-With, " +
                        "If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, " +
                        "Content-Type, X-E4M-With, Cookie, Fox-Id, Fox-Trace, Fox-Token, Fox-Passport," +
                        " Fox-Passport-Reset, Fox-Encrypt, Fox-Session,Authorization");

        httpServletResponse.addHeader("Access-Control-Max-Age", "3600");


        if ("OPTIONS".equals(httpServletRequest.getMethod())) {
            httpServletResponse.setStatus(200);
        }else{
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }


}
